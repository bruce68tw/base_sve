//import { SHA256 } from 'crypto-js';
import pkg from 'crypto-js';
const {SHA256} = pkg;

export default class _Str {

    static isEmpty(str:string | null):boolean{
        return (str == null || str == "");
    }

    static notEmpty(str:string | null):boolean {
        return !_Str.isEmpty(str);
    }

    static format(str:string, ...vals:any[]):string {
        for (let index = 0; index < vals.length; index++) {
          str = str.replace(`{${index}}`, vals[index]);
        }
        return str;
    }

    static toIntList(str:string, sep:string = ','):number[]{
        return (_Str.isEmpty(str))
            ? []
            : str.split(sep).map(a=>Number(a));
    }

    //get query param
    static getUrlParam(url:string, fid:string):string {
        let pairs = url.split('&');
        for (let pair of pairs){
            let cols = pair.split('=');
            if (cols.length == 2 && cols[0] == fid) return cols[1];
        }
        //case of not found
        return '';
    }

    static getMid(str:string, find1:string, find2:string):string {
        if (_Str.isEmpty(str)) return '';
        var pos = str.indexOf(find1);
        if (pos < 0) return str;
        var pos2 = str.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? str.substring(pos + find1.length)
            : str.substring(pos + find1.length, pos2)
    }

    //get tail part string
    static getTail(value:string, find:string):string {
        var pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    }

    //refer c# _Str.NewId()
    static newId(len:number = 10):string {
        const now = Date.now().toString();
        let hash = SHA256(now).toString();
      
        // 過濾非字母和數字的字元，並取得指定長度的字串
        hash = hash.replace(/[^a-zA-Z0-9]/g, '');
        return hash.slice(0, len);
    }

} //class