//import type IdStrDto from "../dto/IdStrDto";

//處理基本資料/any型態陣列, 與 _List 不同
export default class _Array {

    /**
     * find index by fid/value
     * @param rows
     * @param fid 
     * @param value 
     * @returns index, -1 if not found
     */
    static findIndex(rows:any[], fid:string, value:string):number {
        if (rows == null) return -1;        
        for (let i=0; i<rows.length; i++){
            if (rows[i][fid] == value) return i;
        }
        
        //case of not find
        return -1;
    }

    /**
     * reset array
     * @param data (byRef)
     */
    static reset(data:any[]) {
        data.splice(0, data.length);
    }

} //class