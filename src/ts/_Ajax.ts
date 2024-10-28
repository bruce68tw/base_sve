import axios from "axios"
import _Fun from "./_Fun"
import _AjaxBase from "./_AjaxBase"
//import _Json from "./_Json"
import _Tool from "./_Tool"
import _Locale from "./_Locale";

//ajax call(use axios) for client only !!
export default class _Ajax {

    /// jwt token
    static _token:string = '';

    static setToken(token:string) {
        _Ajax._token = token;
    }

    static hasToken():boolean {
        return (_Ajax._token != '');
    }

    /**
     * axios responseType: text,json,document(xml),arraybuffer,blob,ms-stream,(沒有number!!)
     * @param url 
     * @param jsonIn (false) input arg is json or not
     * @param data input json data
     * @param block (false)
     * @returns 
     */
    static async getStrA(url:string, jsonIn = false, data = {}, block = false):Promise<string | null> {
        let config = _Ajax.getConfig(url, jsonIn, data, 'T');
        let result = await _Ajax.rpcA(config, false, block);
        if (result == null) return null;
        if (result.length > 2){
            if (result.substring(0,2) == _AjaxBase.preError){
                _Tool.msg(result.substring(2));
                return null;    //important !!
            } else if (result.substring(0,2) == _AjaxBase.preBrError){
                _Tool.msg(_Ajax.getBrMsg(result));
                return null;    //important !!
            }
        }
        //case else
        return result;
    }   

    /**
     * (async) get json result
     * @param url 
     * @param jsonIn (false)json input or not
     * @param data (null) input data
     * @param block (true) block ui or not
     */
    static async getJsonA(url:string, jsonIn = false, data = {}, block = false):Promise<any> {
        let config = _Ajax.getConfig(url, jsonIn, data, 'J');
        return _Ajax.getJsonResult(await _Ajax.rpcA(config, true, block));
    }   

    //後端參數必須加上 [FromForm] !!
    static async getJsonByFormDataA(url:string, data:any, formData:FormData, block = false):Promise<any> {
        //set config, 不必設定 content-type
        let config:any = {
            baseURL: _AjaxBase.apiUrl,
            url: url,
            method: 'post',
            data: formData,
            params: data, 
            responseType: 'json',
            withCredentials: true,
            //timeout: 1000,  //milliseconds     
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };

        //add jwt token if need
        _Ajax.headerAddJwt(config);
        return _Ajax.getJsonResult(await _Ajax.rpcA(config, true, block));
    }   

    private static getJsonResult(result:any):any {
        if (result && result.ErrorMsg){
            let error = result.ErrorMsg;
            if (error.substring(0,2) == _AjaxBase.preBrError)
                error = _Ajax.getBrMsg(error);
            _Tool.msg(error);
            return null;
        } else {
            return result;
        }
    }

    //get base resource message string
    private static getBrMsg(msg:string):string {
        let code = msg.substring(2);
        return _Locale.br[code] || code;
    }

    //response text file
    static async respTextFileA(url:string, fileName:string, jsonIn = false, data = {}, block = false):Promise<void> {
        await _Ajax.respFileA(url, fileName, true, jsonIn, data, block);
    }

    //response binary file
    static async respBinFileA(url:string, fileName:string, jsonIn = false, data = {}, block = false):Promise<void> {
        await _Ajax.respFileA(url, fileName, false, jsonIn, data, block);
    }

    /**
     * response file
     * @param url 
     * @param jsonIn 
     * @param data 
     * @param block 
     * @returns 
     */
    private static async respFileA(url:string, fileName:string, isTextFile:boolean, jsonIn = false, data = {}, block = false):Promise<void> {
        let config = _Ajax.getConfig(url, jsonIn, data, isTextFile ? 'T' : 'B');
        let result = await _Ajax.rpcA(config, false, block);
        if (result == null){
            _Tool.msg('無任何資料。');
            return;
        } 

        // Create a temporary URL for the blob
        // Create a hidden <a> tag to trigger the download
        const blob = isTextFile
            ? new Blob([result], { type: 'text/plain' })
            : new Blob([result]);
        const url2 = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url2;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }   

    // server return json file
    static async getJsonFileA(url:string):Promise<any> {
        let result = await axios.get(url);
        return result.data;
    }

    private static headerAddJwt(config:any):void {
        if (_Ajax._token)
            config.headers['Authorization'] = 'Bearer ' + _Ajax._token;
    }

    /**
     * get axios config
     * @param url 
     * @param jsonIn 
     * @param data 
     * @param returnType T(text), J(json),B(binary)
     * @returns 
     */
    private static getConfig(url:string, jsonIn:boolean, data:object, returnType:string):any {
        let config = _AjaxBase.getConfig(url, jsonIn, data, returnType);
        /*
        //必須宣告為any type
        let config:any = {
            baseURL: _AjaxBase.apiUrl,
            url: url,
            method: 'post',
            //timeout: 1000,  //milliseconds     
            responseType: (returnType=='J') ? 'json' : 
            (returnType=='B') ? 'arraybuffer' :
            'text',
            withCredentials: true,  //also send cookie
        };
        if (jsonIn){
            config.data = data;
            config.headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            };
        } else {
            config.params = data;
            config.headers = {
                'Content-Type': 'application/text; charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            };
        }
        */

        //add jwt token if need
        _Ajax.headerAddJwt(config);
        //if (_Ajax._token)
        //    config.headers['Authorization'] = 'Bearer ' + _Ajax._token;
        return config;
    }

    //remote call
    //jsonOut: return json or not
    private static async rpcA(config:any, jsonOut:boolean, block:boolean):Promise<any> {
        if (block) _Tool.showWait();
        let result = _AjaxBase.rpcA(config, jsonOut);
        /*
        let result = await axios(config)
            .catch(err => {
                //會返回外層, 不是直接離開函數 !!
                //console.log(err); //browser會自動log error
                let msg = '無法呼叫遠端程式。';                
                let data = jsonOut
                    ? { ErrorMsg: msg }     //for json
                    : _Fun.PreError + msg;  //for text
                return { data: data };
            });
        */

        //case of ok
        if (block) _Tool.hideWait();
        return result;
    }

} //class


