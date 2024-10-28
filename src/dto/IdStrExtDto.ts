import IdStrDto from "./IdStrDto";

//配合後端, 屬性使用大camel
export default class IdStrExtDto extends IdStrDto {
    constructor(
        public Ext = '',
    ){
        super();
        this.Ext = Ext;
    } 
}