import EditMany from "./EditMany";
import _Fun from "./_Fun";
import _Str from "./_Str";

/**
 * MRU(mode role-user)
 * 多筆users的部分透過modal來選取user
 */ 
export default class ModeRU {

    private dataFid:string;

    /**
     * 以傳址方式處理
     */
    private vmRows:any[];

    /**
     * 會用到EditMany函數, 所以建立instance, 屬於非標準多筆維護
     */
    private editMany:EditMany;

    /**
     * constructor
     */
    constructor(dataFid:string, vmRows:any[]){
        this.dataFid = dataFid;
        this.vmRows = vmRows;
        this.editMany = new EditMany(null, vmRows);
    }

    getNewNo(){
        return this.editMany.getNewNo();
    }

    loadRows(rows:any[], mode:string):any[] {
        return this.editMany.loadRows(mode, rows);
    }

    deleteRow(key:string){
        return this.editMany.deleteRow(key);
    }

    getUpdJson():any {
        //add new
        let newRows:any[] = [];
        for (let row of this.vmRows){
            if (_Str.isEmpty(row[this.editMany.kid])){
                let newRow:any = {};
                newRow[this.dataFid] = row[this.dataFid];
                newRows.push(newRow);
            } 
        }

        let json:any = {};
        if (newRows.length > 0)
            json[_Fun.FidRows] = newRows;
        if (this.editMany.deletes.length > 0)
            json[_Fun.FidDeletes] = this.editMany.deletes.join();
        return json;
    }

} //class