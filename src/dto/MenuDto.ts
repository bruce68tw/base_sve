//功能表item
//配合後端, 屬性使用大camel
export default class MenuDto {
    constructor(
        public Name:string,             //program name
        public Url?:string,             //if emtpy, means has child menu
        public Icon?:string,            //icon class name
        public Items?:Array<MenuDto>,   //sub menu items
        //public Code?:string,            //program id
        //public Sort?:number,            //sort
    ){
        this.Name = Name;
        this.Url = Url || '';
        this.Icon = Icon || '';
        this.Items = Items || [];
        //this.Code = Code || '';
        //this.Sort = Sort || 0;
    } 

}