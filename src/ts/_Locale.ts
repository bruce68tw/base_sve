import _Ajax from './_Ajax';

//static class
export default class _Locale {

    //=== constant start ===
    //date/datetime format
    //static readonly BasePath = '/src/base/locale/';
    //static readonly LocalePath = '/src/locale/';

    static locale:string = '';   //locale code, ex: zh-TW
    static br:any = {};          //base resource
    static xiDate:any = {};      //for XiDate

    /**
     * set _Locale.br & _Locale.locale
     * @param locale zh-TW, zh-CN, en-US
     */
    static async setBrA(locale:string):Promise<any> {
        //set global
        _Locale.locale = locale;

        //read json file to br
        _Locale.br = await _Ajax.getJsonFileA(`/locale/${locale}/BR.json`);
        _Locale.xiDate = await _Ajax.getJsonFileA(`/locale/${locale}/XiDate.json`);
    }

    /*
    //get locale file json
    static async getJsonA(file:string):Promise<any> {
        _Ajax.getJsonFile(`${_Locale.LocalePath}${_Locale.locale}/${file}.json`, (json:any)=> {
            _Locale.br = json;
        });
    }
    */
   
} //class

//方便其他程式存取, but _BR內容停留在{} !!
//export var _BR = _Locale.br;    
