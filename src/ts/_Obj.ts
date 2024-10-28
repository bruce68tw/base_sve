export default class _Obj {

    static isNull(data:any):boolean{
        return (data == null || data == undefined);
    }

    static notNull(data:any):boolean {
        return !_Obj.isNull(data);
    }

} //class