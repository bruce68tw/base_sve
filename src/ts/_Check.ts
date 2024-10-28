import type IdStrExtDto from "../dto/IdStrExtDto";

/**
 * for checkbox
 */
export default class _Check {

    /**
     * is now checked, 配合 XgCheckValue
     * @param value 
     * @returns 
    public static statusByValue(value:string):boolean {
        return (value.substring(0, 1) != '-');
    }
     */

    /**
     * get checked rows
     * @param rows 
     * @returns [] for none
     */
    public static getCheckedRows(rows:any[]):any[] {
        let result:any[] = [];
        for (let row of rows){
            if (row.Checked) result.push(row);
        }
        return result;
    }

    /**
     * check whether row existed
     * @param rows
     * @param fid 
     * @param value
     * @returns 
     */
    public static rowExisted(rows:any[], fid:string, value:string):boolean {
        for (let row of rows){            
            if (row[fid] == value) return true;
        }

        //case of not found
        return false;
    }

    //rows add Checked field for XgCheck
    public static addCheckedFid(rows:any[]):any[] | null {
        if (rows == null) return null;
        for (let row of rows)
            row.Checked = false;    

        return rows;
    }

} //class