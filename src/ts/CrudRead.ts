import type XgReadForm from "../lib/XgReadForm.svelte";
import type XgDatatable from "../lib/XgDatatable.svelte";
import type CrudEdit from "./CrudEdit";
import _Fun from "./_Fun";
import _Str from "./_Str";
import _Locale from "./_Locale";
import _Tool from "./_Tool";
import _Ajax from "./_Ajax";
import _VM from "./_VM";

/**
 * - CRUD Read 功能(控制查詢畫面)
 * - Class Property default Public !!
 * - master table VM(view model), 配合呼叫 _VM
 */ 
export default class CrudRead {

    //constant 
    readonly kid = 'Id';

    //property
    ctrl:string;
    form:XgReadForm;
    dt:XgDatatable;
    crudE:CrudEdit;

    /**
     * 預設null表示不處理 validation
     */
    vm:any;
    hasVm:boolean;

    /**
     * constructor
     * @param ctrl 後端controller name，不含路徑
     * @param vm (by ref) null表示沒有輸入欄位
     */
    constructor(ctrl:string, vm:any /*, hasValid=false*/){
        this.ctrl = ctrl;
        this.hasVm = (vm != null);
        if (this.hasVm)
            this.vm = _VM.init(vm);
        /*
        {
            this.vm = vm;
            _VM.resetExt(this.vm, 'C');   //initial vm
        }
        */
    }

    async initA(form:XgReadForm, dt:XgDatatable, findJson:any={}):Promise<void> {
        //if (_Fun.fnCrudRPreInitA != null)
        //    await _Fun.fnCrudRPreInitA();

        this.form = form;
        this.dt = dt;

        //read rows if need
        if (findJson != null)
            await this.dt.findByJsonA(findJson);
    }

    setCrudE(crudE:CrudEdit){
        this.crudE = crudE;
    }

    /*
    getCtrl():string{
        return this.ctrl;
    }
    */

    getKid():string{
        return this.kid;
    }

    onCreate(){
        this.crudE.onCreate();
    }

    //=== datatable column ===
    //show status name, 使用簡短函數名稱
    dtStatus(row:any) {
        return (row.Status == 1)
            ? '<span>' + _Locale.br.StatusYes + '</span>'
            : '<span class="text-danger">' + _Locale.br.StatusNo + '</span>';
    }

    //=== toolbar function ===
    async onFindA():Promise<void> {
        //debugger;
        await this.dt.findByJsonA(_VM.getRow(this.vm));
    }

    /**
     * reset & return new vm
     * @returns 
     */
    getReset():any {
        if (this.hasVm){
            _VM.resetExt(this.vm, 'C');
            return this.vm;
        } else {
            return null;
        }
    }

    //todo
    onFind2() {
    }

    //=== datatable event ===
    async onUpdateA(key:string):Promise<void> {
        await this.crudE.onUpdateA(key)
    }

    async onDeleteA(key:string):Promise<void> {
        _Tool.ans(_Locale.br.SureDeleteRow, async()=> {
            let json = await _Ajax.getJsonA(`/${this.ctrl}/Delete`, false, { key: key });
            if (json == null) return;            
            _Tool.alert(_Locale.br.DeleteOk);
            await this.dt.reloadA(true);
        });
    }

    async onViewA(key:string):Promise<void> {
        await this.crudE.onViewA(key)
    }

    //=== datatable function ===
    async reloadA(setPage:boolean):Promise<void> {
        await this.dt.reloadA(setPage);
    }

} //class