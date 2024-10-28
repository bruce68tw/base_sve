//輸入欄位基礎類別
export default class XiBaseDto {
    public vm:any;
    public fid:string = '';
    public title = '';
    public value:any = '';
    public cols = '';
    public required = false;
    public custCss = false;
    public labelTip = '';
    //public inputAttrs = '';
    public placeHolder = '';
    //public width = '';
    public valids = '';
    public fnValid?:Function;

    /*
    constructor(
        public vm:any,
        public fid,
        public title = '',
        public value:any = '',
        public cols = '',
        public required = false,
        public custCss = false,
        public labelTip = '',
        //public inputAttrs = '',
        public placeHolder = '',
        //public width = '',
        public valids = '',
        public fnValid?:Function,
    ){
        this.vm = vm;
        this.fid = fid;
        this.title = title;
        this.value = value;
        this.cols = cols;
        this.required = required;
        this.custCss = custCss;
        this.labelTip = labelTip;
        //this.inputAttrs = inputAttrs;
        this.placeHolder = placeHolder;
        //this.width = width;
        this.valids = valids;
        this.fnValid = fnValid;
    }
    */
}