//輸入欄位基礎類別
//以下為簡單寫法, 無法使用 optional 參數, 必須先new, 再設定屬性
//xi-row, xi-label, xi-input, xi-box
//attrs不含class
export default class XiBoxDto {
    constructor(
        public title = '',
        public labelTip = '',
        public required = false,
        public custCss = false,
        public inBlock = false,
        //public extClass = '',
        
        public isHori?:boolean,
        public col1 = 0,
        public col2 = 0,
        //public width = '',
    ){
        this.title = title;
        this.labelTip = labelTip;
        this.required = required;
        this.custCss = custCss;
        this.inBlock = inBlock;
        //this.extClass = extClass;
        this.isHori = isHori;
        this.col1 = col1;
        this.col2 = col2;
        //this.width = width;
    }
} //class