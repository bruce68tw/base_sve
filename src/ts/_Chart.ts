import _Array from "./_Array";

export default class _Chart {

    /**
     * 將Db回傳的水平資料列轉成垂直列 for chart.js
     * 固定設定欄位labels、values
     * @param rows db rows
     * @param cols column name array
     * @param labels (byRef)
     * @param values (byRef) 2維陣列 
     */
    static xySwap(rows:any[], cols:string[]):any {
        if (rows == null || rows.length == 0) return {};

        //展開
        let labels:any[] = [];
        let values:any[] = [];
        let data:any[] = [];
        let colLen = cols.length - 1;    //不含label
        for(let i=0; i<rows.length; i++){
            labels.push(rows[i][cols[0]]);
            for(let j=1; j<=colLen; j++)
                data.push(rows[i][cols[j]]);
        }

        //x -> y
        //let labelLen = labels.length;
        let dataLen = data.length;
        for(let i=0; i<colLen; i++){
            let row:any[] = [];
            for(let j=i; j<dataLen; j+=colLen)
                row.push(data[j]);
            values.push(row);
        }
        return {
            labels: labels,
            values: (colLen == 1) ? values[0] : values,
        };
    }

} //class