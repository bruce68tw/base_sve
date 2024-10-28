import XiBaseDto from "./XiBaseDto"

//for XiText input
export default class XiTextDto extends XiBaseDto {
    public isPwd = false;
    public maxLen = 0;

    /*
    constructor(
        vm:any,
        fid:string,
        public isPwd = false,
        public maxLen = 0,
    ){
        super(vm, fid);
        this.isPwd = isPwd;
        this.maxLen = maxLen;
    }
    */
}