//顯示欄位 for XgTable
export default class ColDto {
    constructor(
        /**
         * - (必填)欄位 title
         */
        public title:string,

        /**
         * - (optional)欄位Id, 保留欄位為: _btn(name:string),_link([文字,url,0/1(開新頁)), ()為Data欄位內容 
         * - for _btn 必須額外設定 XgTable的 fnOnBtn(data, key) 屬性。
         */
        public fid?:string,

        /**
         * - (optional)Fid為保留欄位時(如上), 必須設定此欄位內容(如括號內容): 
         */
        public data?:any,

        /**
         * - (optional)控制 _btn(boolean)的狀態
         */
        public status?:boolean,

        /**
         * - (optional)style width 語法, ex: '80px'
         */
        public width?:string,

        /**
         * - (optional)自定欄位 render 函數, 語法為 render:((row)=> xxx)
         * - 設定 fid=所有保留欄位時的Data欄位動態內容(if need)
         */
        public render?:Function,
    ){
        this.title = title;
        this.fid = fid;
        this.data = data || '??';   //for 提醒
        this.status = status;
        this.width = width || '';   //for 直接取值
        this.render = render;
    } 
}