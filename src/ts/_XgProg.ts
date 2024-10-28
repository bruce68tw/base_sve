import {CrudEnum} from "../enum/CrudEnum";
import _Fun from "./_Fun";
import _Str from "./_Str";

//program function, 適用於其他專案, 所以使用 _XgProg, 字首_Xg表示內含商業規則
export default class _XgProg {

    /**
     * get auth string for ctrl for authType=action/row only
     * @param prog
     * @returns string(9 chars)
     */
    static getAuthStr(prog:string):string {
        return _Str.getMid(_Fun.authStrs, "," + prog + ":", ",");
    }

    /**
     * 檢查是否具備某個crud功能權限
     * @param authStr 
     * @param crudEnum 
     * @returns status
     */
    static checkCrudAuth(authStr:string, crudEnum:CrudEnum):boolean {
        return (authStr.length <= crudEnum) 
            ? false 
            : (authStr.substring(crudEnum, crudEnum+1) != '0');
    }

    static checkCreate(authStr:string):boolean {
        return this.checkCrudAuth(authStr, CrudEnum.create);
    }
    static checkUpd(authStr:string):boolean {
        return this.checkCrudAuth(authStr, CrudEnum.update);
    }
    static checkDel(authStr:string):boolean {
        return this.checkCrudAuth(authStr, CrudEnum.delete);
    }
    static checkView(authStr:string):boolean {
        return this.checkCrudAuth(authStr, CrudEnum.view);
    }
    /**
     * check row fun of update、delete、view
     * @param authStr 
     * @returns [3]
     */
    static getRowAuths(authStr:string):boolean[] {
        return [
            this.checkCrudAuth(authStr, CrudEnum.update),
            this.checkCrudAuth(authStr, CrudEnum.delete),
            this.checkCrudAuth(authStr, CrudEnum.view),
        ];
    }

} //class