//XgDatatable查詢結果欄位
export default class RitemDto {
    constructor(
        /**
         * column header
         */
        public title = '',

        /**
         * - 保留欄位: _crud(UDV), _btn(name:string), _btns(names:string[]), _link([文字,url,0/1(開新頁)]), _swap(b:/f:), ()為data欄位內容 
         * - for _btn, _btns, 必須額外設定Datatable fnOnBtn(data, key) 屬性。
         */
        public fid?:string,    

        /**
         * - fid為保留欄位時(參考Fid), 必須設定此內容(如括號內容): 
         */
        public data?:string,    

        /**
         * 控制 _crud(boolean[3])、_btn(boolean)的狀態
         * 如果 _crud只有2個icon, 陣列依然有3個元素 !!
         */
        public Status?:any,    

        /**
         * - 標題 mouse over 提示文字
         */
        public tip?:string,

        /**
         * - style width 語法, ex: '80px'
         */
        public width?:string,

        /**
         * - 排序欄位, 如果後端查詢多個table, 則此欄位必須加上table alias, 例如 'u.Account'
         */
        public sortFid?:string,

        /**
         * - 自定欄位 render 函數, 語法為 render:((row)=> xxx)
         * - 設定 fid=所有保留欄位時的data欄位動態內容(if need)
         */
        public render?:Function,
    ){
        this.title = title;
        this.fid = fid || '';
        this.data = data || '??';   //for 提醒
        this.tip = tip || '';
        this.width = width || '';
        this.sortFid = sortFid || '';
        this.render = render;
    } 
}