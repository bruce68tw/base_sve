import type IdStrDto from "../dto/IdStrDto";
import type IdStrExtDto from "../dto/IdStrExtDto";

//處理model陣列, 與 _Array 不同
export default class _Code {

    /** 
     * find IdStrDto[] Str by Id
     * @param rows source rows
     * @param id id to find
     * @returns Str property
     */
    static findStr(rows:IdStrDto[], id:string):string {
        for (let row of rows){
            if (row.Id == id) return row.Str;
        }
        
        //case of not find
        return '';
    }

    static findExt(rows:IdStrExtDto[], id:string):string {
        for (let row of rows){
            if (row.Id == id) return row.Ext;
        }
        
        //case of not find
        return '';
    }

    /**
     * filter IdStrExtDto[] and get IdStrDto[]
     * @param rows source IdStrExtDto[]
     * @param ext filter Ext value
     * @returns IdStrDto[] for filter result
     */
    static filterByExt(rows:IdStrExtDto[], ext:string):IdStrDto[] {
        let data:IdStrDto[] = [];
        for (let row of rows){
            if (row.Ext == ext) data.push({
                Id: row.Id,
                Str: row.Str,
            });
        }
        return data;
    }

    /*
    static filterExt2(rows:IdStrExt2Dto[], ext:string):IdStrExtDto[] {
        let data:any[] = [];
        for (let row of rows){
            if (row.Ext == ext) data.push({
                Id: row.Id,
                Str: row.Str,
                Ext: row.Ext2,
            });
        }
        return data;
    }
    */
   
} //class