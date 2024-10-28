import type CrudEdit from "./CrudEdit";
import type XiFile from "../lib/XiFile.svelte";
import _Fun from "./_Fun";
import _Str from "./_Str";
import _VM from "./_VM";
import _Array from "./_Array";
import _Json from "./_Json";
import _AjaxBase from "./_AjaxBase";

/**
 * - 標準/非標準多筆維護
 * - master table VM(view model), 配合呼叫 _VM
 */ 
export default class EditMany {

    //constant 
    readonly kid = 'Id';
    
    //非標準多筆維護此值為null
    crudE!:CrudEdit;
    
    //(public) delete key array
    deletes:string[] = [];

    //vm rows, 如果有值則會以傳址方式處理 !!
    vmRows:any[];

    /**
     * 對應vm[_valid], 與CrudEdit使用vm的方式不同
     */
    //vmValid:any;

    /**
     * vm row 初始值內容, 包含要寫入DB的欄位
     */
    vmInit:any = {};

    /**
     * fid array to save db
     */
    fidSaves:string[] = [];

    /**
     * new row no
     */
    newNo = 0;

    /**
     * 預設不處理 validation
     */
    //hasValid:boolean;   

    files?:XiFile[];

    //ctrl for viewFile
    //private ctrl = '';

    //子table順序, 上傳檔案時用於產生 server field id(sid)
    //private sort = 0;

    /**
     * constructor
     * @param vm null 表示不處理資料異動
     * @param vmRows null 表示不以傳址方式處理
     */
    constructor(vm:any, vmRows:any[]){
        if (vm != null)
            this.vmInit = _VM.initEdit(vm, this.fidSaves);
        this.vmRows = vmRows;
    }

    /**
     * initial, called by CrudEdit
     * @param sort 
     * @param ctrl 
     */
    init(crudE:CrudEdit){
        this.crudE = crudE;
    }

    /*
    setSort(sort:number) {
        this.sort = sort;
    }
    */

    getNewNo():string {
        this.newNo++;
        return this.newNo.toString();
    }

    private setVm(){
        if (this.crudE)
            this.crudE.setVm();
    }

    /**
     * initial, reset ext, (_valid不必處理)
     * @param rows 
     * @param mode 
     * @returns [] for empty !!
     */
    loadRows(mode:string, rows?:any[]):any[] {
        if (this.vmRows)
            _Array.reset(this.vmRows);  //保持this.rows位址不變
        else
            this.vmRows = [];     //此時EditMany不是標準的多筆維護

        if (mode != 'C' && rows != null){
            for (let row of rows){
                _VM.resetExt(row, mode);
                this.vmRows.push(row);
            }
        }
        //傳回rows for 非標準多筆維護
        return this.vmRows;
    }

    /*
    //get mapping row for save db
    getMapRow(row:any):any {
        let data = {};
        if (row[this.kid] != null) data[this.kid] = row[this.kid];
        for (var key in this.vmInit){
            data[key] = row[key];
        }
        return data;
    }    
    */

    /**
     * add row 
     * @param json ex:earth_adm_sve VolE2.svelte會傳入json值
     * @returns 
     */
    addRow(json:any = null):any[] {
        json ||= this.vmInit;
        let row:any = {};
        _VM.copyRow(json, row);
        _VM.resetExt(row, 'C');
        row[this.kid] = this.getNewNo();    //for delete row
        row[_Fun.FidIsNew] = true;
        this.vmRows.push(row);
        this.setVm();
        return this.vmRows; //傳回資料 for 非標準多筆維護
    }

    deleteRow(key:string):any[] {
        let find = _Array.findIndex(this.vmRows, this.kid, key);
        if (find < 0) return this.vmRows;

        //delete row
        let isNew = this.vmRows[find][_Fun.FidIsNew];
        this.vmRows.splice(find, 1);

        //set deletes if not existed
        if (!isNew){
            let find2 = this.deletes.indexOf(key);
            if (find2 < 0) this.deletes.push(key);
        }
        this.setVm();
        return this.vmRows; //傳回資料 for 非標準多筆維護
    }    

    getUpdJson():any {
        let rows:any[] = [];
        for (let row of this.vmRows){
            let row2:any;
            if (row[_Fun.FidIsNew]){
                row2 = _VM.getCreateRow(row, this.fidSaves);
                if (row2 == null) continue;
            } else {
                row2 = _VM.getUpdRow(row, this.fidSaves) || {};
                row2[this.kid] = row[this.kid];     //write pkey
            }
            rows.push(row2);
        }

        let result:any = {};
        if (rows.length > 0) result[_Fun.FidRows] = rows;
        if (this.deletes.length > 0) result[_Fun.FidDeletes] = this.deletes.join();
        return _Json.isEmpty(result) ? null : result;
    }

    validRows():boolean {
        if (this.vmRows.length == 0) return true;

        let valid = _VM.getValid(this.vmRows[0]);    //(json)fid-[required,check,fnValid]
        for (let row of this.vmRows)
            if (!_VM.validRow(row, valid)) return false;

        //case of ok
        return true;
    }

    //TODO: see CrudEdit.ts
    dataAddFiles(data:FormData, key:string, files:XiFile[], fileJson:any) {
    }

    /**
     * get file path, called by XiFile for both CrudEdit && EditMany
     * @param sid server side field id
     * @param ext 
     * @returns file path
     */
    getFileUrl(sid:string, ext:string):string{
        return `${_AjaxBase.apiUrl}/${this.crudE.ctrl}/ViewFile?sid=${sid}&key=??&ext=${ext}`;
    }


} //class