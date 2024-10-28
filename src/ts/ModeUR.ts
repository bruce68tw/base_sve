import type CheckDto from "../dto/CheckDto";
import type IdStrDto from "../dto/IdStrDto";
import _Array from "./_Array";
//import _Check from "./_Check";
import _Fun from "./_Fun";
//import _List from "./_List";
import _Str from "./_Str";

//MUR(mode user-role)
export default class ModeUR {

    private dataFid:string;

    /**
     * 以傳址方式處理
     */
    private vmRows:CheckDto[];

    /**
     * constructor
     */
    constructor(dataFid:string, vmRows:CheckDto[]){
        this.dataFid = dataFid;
        this.vmRows = vmRows;
    }

    /**
     * -> init
     * IdStrDto[] to vm, 在編輯畫面onMount時執行
     * @param list 
     * @returns 
     */
    codesToVm(list:IdStrDto[]):CheckDto[] {      
        this.vmRows.splice(0, this.vmRows.length);  //保持位址不變  
        //let result:CheckDto[] = [];
        for (let row of list || [])
            this.vmRows.push({ id: row.Id, label: row.Str });
        return this.vmRows;
    }

    loadRows(mode:string, codes:IdStrDto[]):CheckDto[] {
        if (mode == 'C'){
            for (let row of this.vmRows){
                row.value = "";
                row.checked = false;    
            }
        } else {
            for (let row of this.vmRows){
                let find = _Array.findIndex(codes, "Str", row.id);
                if (find >= 0){
                    row.value = codes[find].Id;
                    row.checked = true;    
                } else {
                    row.value = '';
                    row.checked = false;    
                }
            }
        }
        return this.vmRows;    
    }
    /**
     * initial vm, 新增時執行
     * @param rows 
     * @returns 
     */
    /*
    initVm(rows:CheckDto[]):CheckDto[] {        
        for (let row of rows){
            row.Value = "";
            row.Checked = false;    
        }
        return rows;
    }
    */

    /**
     * vm加上資料內容, 修改資料時執行
     * @param rows 
     * @param codes 
     * @returns 
     */
    /*
    vmAddValue(rows:CheckDto[], codes:IdStrDto[]):CheckDto[] {        
        for (let row of rows){
            let find = _Array.findIndex(codes, "Str", row.Id);
            if (find >= 0){
                row.Value = codes[find].Id;
                row.Checked = true;    
            } else {
                row.Value = '';
                row.Checked = false;    
            }
        }
        return rows;
    }
    */

    /**
     * get update json, 刪除時子table傳入rowId, 新增時傳入relatId
     * @param upKey empty for new
     * @returns json with rows & deletes property
     */
    getUpdJson(upKey:string):any {
        //Ext欄位內容:0/(1+UserRole.Id)
        let news:any[] = [];
        let deletes:string[] = [];
        if (_Str.isEmpty(upKey)){
            for (let row of this.vmRows){
                //case add new
                if (row.checked){
                    let item:any = {};
                    item[this.dataFid] = row.id;
                    news.push(item);  //add new
                } 
            }
        } else {
            for (let row of this.vmRows){
                if (_Str.isEmpty(row.value!)){
                    //case add new
                    if (row.checked){
                        let item:any = {};
                        item[this.dataFid] = row.id;
                        item[_Fun.FidFkey] = upKey;   //set foreign key
                        news.push(item);
                    }
                } else if (!row.checked){
                    //case delete, dataId -> rowId
                    deletes.push(row.value!);   //傳入rowId !!
                }
            }
        }
        let json:any = {};
        if (news.length > 0)
            json[_Fun.FidRows] = news;
        if (deletes.length > 0)
            json[_Fun.FidDeletes] = deletes.join();
        return json;
    }

} //class