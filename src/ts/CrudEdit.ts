import type XiFile from "../lib/XiFile.svelte";
import type ResultDto from "../dto/ResultDto";
import type CrudRead from "./CrudRead";
import type EditMany from "./EditMany";
import XgEditForm from "../lib/XgEditForm.svelte";
import XgEditModal from "../lib/XgEditModal.svelte";
//import fnSetVm from '../lib/XgEditForm.svelte';
import _Fun from "./_Fun";
import _Locale from "./_Locale";
import _Str from "./_Str";
import _VM from "./_VM";
import _Json from "./_Json";
import _Ajax from "./_Ajax";
import _Tool from "./_Tool";
import _File from "./_File";
import _AjaxBase from "./_AjaxBase";

/**
 * - CRUD Edit, 包含主編輯畫面、控制功能
 * - master table VM(view model), 配合呼叫 _VM
 */ 
export default class CrudEdit {

    //variables
    crudR!: CrudRead | null;

    /**
     * backend controller name
     */    
    ctrl:string = '';

    /**
     * edit form(非空值), 可為 form 或是 modal
     */
    form: XgEditForm | XgEditModal;

    /**
     * true(form), false(modal)
     */
    isForm:boolean = false;

    /**
     * view model
     */
    vm:any;

    /**
     * save for initial value when create new   
     */
    vmInit:any = {};   //must valued
    
    /**
     * fid array to save db
     */
    private fidSaves:string[] = [];

    /**
     * master row key, empty for create new
     */
    key: string = '';

    /**
     * C(create), U(update), V(view)
     */
    mode: string = '';

    /**
     * is new row or not
     */
    isNew:boolean = false;

    /**
     * called when save row, 傳入(json):boolean
     */
    fnWhenSave?: Function;    //param:updJson

    /**
     * called after save row, 傳入(json):void
     */
    fnAfterSave?: Function;    //param:updJson

    /**
     * 是否使用FormData儲存資料, 呼叫 dataAddFiles時會自動設為true
     * 如果只有child table有上傳檔案, 則必須手動設為true
     */
    //useFormData = false;

    private files?: XiFile[];

    /**
     * for whenSave 填入多筆資料 && 上傳檔案的 EditMany
     */
    private childs!: EditMany[];

    //private childLen:number = 0;

    /**
     * constructor
     * @param vm (by ref)
     */
    constructor(vm:any){
        this.vm = vm;
        this.vmInit = _VM.initEdit(vm, this.fidSaves);
    }

    /**
     * initial
     * @param crudR (nullable) CrudRead
     * @param form XgEditForm or XgEditModal
     * @param isForm form or modal
     * @param files files for master table
     * @param childs EditMany child tables
     */
    init(crudR:CrudRead | null, form:XgEditForm | XgEditModal, 
        files:XiFile[]=[], childs:EditMany[]=[]){

        this.crudR = crudR;
        if (crudR){
            this.ctrl = crudR.ctrl;
            this.crudR!.setCrudE(this);
        }
        this.form = form;
        this.isForm = (form instanceof XgEditForm);
        this.files = files;
        this.childs = childs || []; //方便coding
        for(let i=0; i<this.childs.length; i++){
            if (this.childs[i]) this.childs[i].init(this);
        }
    }

    /**
     * (crudR)back to read form
     */
    toRead(){
        if (!this.crudR) return;

        this.crudR.form.open();
        this.closeForm();
    }

    //(crudR)open eform/modal
    private openForm(json:any){
        //_VM.initExt(json);
        this.form.open(this.mode, json);
        if (this.isForm && this.crudR)
            this.crudR.form.close();
    }

    //(crudR)
    private closeForm(){
        this.form.close();
        if (this.isForm && this.crudR)
            this.crudR.form.open();
    }

    onCreate(){ 
        this.key = '';
        this.mode = 'C'
        this.isNew = true;
        _VM.copyRow(this.vmInit, this.vm);
        _VM.resetExt(this.vm, this.mode);

        //load childs rows
        for (let i=0; i<this.childs.length; i++){
            let child = this.childs[i]
            if (child != null) 
                child.loadRows('C');
        }

        this.openForm(null);
        this.setVm();
    }
    
    async onUpdateA(key:string):Promise<void> { 
        //await this.onUpdateViewA(key, 'U');
        let json = await _Ajax.getJsonA(`/${this.ctrl}/GetUpdJson`, false, {key:key});
        if (json != null)
            this.openByModeUV('U', key, json);
    }
    async onViewA(key:string):Promise<void> { 
        //await this.onUpdateViewA(key, 'V');
        let json = await _Ajax.getJsonA(`/${this.ctrl}/GetViewJson`, false, {key:key});
        if (json != null)
            this.openByModeUV('V', key, json);
    }

    //open form by mode(any key)
    openByModeUV(mode:string, key:string, json:any) { 
        //let act = (mode == 'U') ? 'GetUpdJson' : 'GetViewJson';
        //let json = await _Ajax.getJsonA(`/${this.ctrl}/${act}`, false, {key:key});

        //load master vm
        //如果json.data有值,則視為回傳內容,後端配合處理if need
        let json2 = json.data || json;
        _VM.copyRow(json2, this.vm);   //寫入vm
        _VM.resetExt(this.vm, mode);
        this.key = key;
        this.mode = mode;
        this.isNew = false;

        //load childs rows
        for (let i=0; i<this.childs.length; i++){
            let child = this.childs[i]
            if (child != null) 
                child.loadRows(mode, _Json.getChildRows(json2, i));
        }

        //open form/modal
        this.openForm(json);    //傳入json(包含vm), 不是vm
        this.setVm();
    }

    /**
     * get file path, called by XiFile for both CrudEdit && EditMany
     * @param sid server side field id
     * @param ext 
     * @returns file path
     */
    getFileUrl(sid:string, ext:string):string{
        return `${_AjaxBase.apiUrl}/${this.ctrl}/ViewFile?sid=${sid}&key=${this.key}&ext=${ext}`;
    }

    //get mode name, 使用binding, 參數必須傳入 !!
    modeName(mode:string):string{
        switch(mode){
            case 'C': return _Locale.br.Create;
            case 'U': return _Locale.br.Update;
            case 'V': return _Locale.br.View;
            default: return '??';
        }
    }
    
    //row set foreign key
    rowSetFkey(row:any, fkey:string) {
        row[_Fun.FidFkey] = fkey;
    }

    setVm(){
        this.form.callFnSetVm();
    }

    /*
    onAddRow(editMany:EditMany){
        editMany.addRow();
        this.setVm();
    }

    onDeleteRow(editMany:EditMany, key:string){
        if (editMany.deleteRow(key))
            this.setVm();
    }
    */

    /**
     * onclick save button
     * - validate
     * - backend save
     * - reload datatable rows
     * - alert show result rows
     * @returns boolean 傳回true時, editModal/editForm會切換畫面 if need
     */
    async onSaveA():Promise<boolean> {
        if (!_VM.validRow(this.vm)){
            this.setVm();
            //this.form.callFnSetVm();
            return false;
        } 
    
        //call fnWhenSave if need
        let updJson:any = {};
        updJson[_Fun.FidChilds] = [];
        if (this.fnWhenSave && !this.fnWhenSave(updJson))
            return false;

        //get new/updated row
        let row:any;
        let act:string;
        let data:any = {};  //sent data to server
        let formData = new FormData();  //sent data to server
        if (this.key == ''){
            act = 'Create';
            row = _VM.getCreateRow(this.vm, this.fidSaves);
        } else {
            act = 'Update';
            row = _VM.getUpdRow(this.vm, this.fidSaves);
            //row.Id = key;   //add key field
            data.key = this.key;
            //formData.append('key', this.key);
        }
        updJson[_Fun.FidRows] = [row];
        
        //get single row files[]
        let hasFile = false;
        let fileJson = {};
        if (this.files && this.files.length > 0){
            hasFile = true;
            this.dataAddFiles(formData, this.key, this.files, fileJson);
        }

        // TODO: how get row key
        //get childs update rows && files
        for (let i=0; i<this.childs.length; i++){
            let child = this.childs[i];
            if (child == null) continue;

            //update json
            //updJson[_Fun.FidChilds][i] = child.getUpdJson();
            _Json.setChildJson(updJson, i, child.getUpdJson());

            /*TODO: how get row key for files
            if (child.files && child.files.length > 0){
                if (this.dataAddFiles(data, this.key, '0' + i, child.files, fileJson))
                    hasFile = true;    
            }
            */
        }

        //add fileJson, 最後執行
        if (_Json.notEmpty(fileJson))
            updJson[_Fun.FidFileJson] = fileJson;

        data.json = _Json.toStr(updJson);
        //formData.append('json', data.json);

        let url = `/${this.ctrl}/${act}`;
        let result:ResultDto = hasFile
            ? await _Ajax.getJsonByFormDataA(url, data, formData)
            : await _Ajax.getJsonA(url, false, data);
        if (result == null) return false;
        /*
        if (_Str.notEmpty(result.ErrorMsg)){
            _Tool.msg(result.ErrorMsg);
            return false;
        }
        */

        let count = Number(result.Value); 
        if (count == 0) {
            _Tool.msg(_Locale.br.SaveNone);
            return false;
        }

        let msg = _Locale.br.SaveOk + '(' + count + ')';
        if (this.crudR){
            this.toRead();
            this.crudR.reloadA(true);  //reload
            _Tool.alert(msg);
        } else {
            //this.mode = 'V';    //改成view mode
            this.form.setMode('V');
            //this.form.callFnSetVm();
            _Tool.msg(msg);
        }

        //call afterSave if need
        if (this.fnAfterSave)
            this.fnAfterSave(updJson);

        return true;
    }

    /**
     * formData add files(multiple fields)
     * param data {FormData} by ref 
     * param fils {FileDto} 
     * param fileJson {object} by ref, file json to server 
     * return {json} file json
     */
    dataAddFiles(data:FormData, key:string, files:XiFile[], fileJson:any):boolean {
        //let row = this.getJsonRows(json)[0];
        let result = false;
        for (let xiFile of files){
            let file = xiFile.getFile();
            if (file != null){
                //let sid = `t${level}_${xiFile.getFid()}`;
                let sid = xiFile.getSid();
                data.append(sid, file);
                fileJson[sid] = key;
                result = true;
            }
        }
        return result;
    }

    /*
    //set field of fileJson for upload files
    jsonAddFileJson(json:any, fileJson:any) {
        if (_Json.notEmpty(fileJson))
            json[_Fun.FidFileJson] = fileJson;
    }
    */

    /*
    setChilds(childs:EditMany[]){
        this.childs = childs;
        if (this.childs){
            for(let i=0; i<this.childs.length; i++){
                if (childs[i]) childs[i].setSort(i);
            }
        }
    }
    */

    /*
    private setMode(mode:string){
        this.mode = mode;
        _VM.setMode(this.vm, mode); //also set vm mode
    }
    */

    /*
    //get child rows
    private getChildRows(upJson:any, childIdx:number) {
        var child = this.getChildJson(upJson, childIdx);
        return this.getJsonRows(child);
    }

    //get child json
    private getChildJson(upJson:any, childIdx:number) {
        var childs = _Fun.FidChilds;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    }

    //get json rows
    private getJsonRows(json:any) {
        return (json == null || json[_Fun.FidRows] == null)
            ? null
            : json[_Fun.FidRows];
    }

    hasFile():boolean {
        return (this.files && this.files.length > 0);
    }
    */

    /*
    //4.onUpdate or View
    private async onUpdateViewA(key:string, mode:string):Promise<void> { 
        let act = (mode == 'U') ? 'GetUpdJson' : 'GetViewJson';
        let json = await _Ajax.getJsonA(`/${this.ctrl}/${act}`, false, {key:key});

        //如果json.data有值,則視為回傳內容,後端配合處理if need
        let json2 = json.data || json;
        _VM.copyRow(json2, this.vm);   //寫入vm
        _VM.resetExt(this.vm, mode);
        this.key = key;
        this.mode = mode;
        this.isNew = false;
        //this.setMode(mode);
        this.openForm(json);    //傳入json(包含vm), 不是vm
    }
    */

    /*
    private getUpdJson(row:any):any {
        let result = {};
        let hasData = false;
        if (row != null) {
            let row2 = {};
            for (var key in row){
                if (row[key] != null && this.fidSaves.indexOf(key) >= 0){
                    hasData = true;
                    row2[key] = row[key];
                }
            }
            result[_Fun.FidRows] = [row2];
        }
        
        return hasData ? result : null;
    }
    */


} //class