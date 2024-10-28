//以下寫法可以在new instance時直接設定欄位值
//配合後端, 屬性使用大camel
export default class IdStrDto {
    constructor(
        public Id = '',
        public Str = '',
    ){
        this.Id = Id;
        this.Str = Str;
    } 
}