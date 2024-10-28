import _Fun from "./_Fun";
import _Array from "./_Array";
import _Json from "./_Json";
import _Locale from "./_Locale";
import _Str from "./_Str";
import _Obj from "./_Obj";

//底線開始的欄位會略過
export default class _VM {

    //vm底下有2個欄位: FidValid(json,不必清除), FidExt(json,可被清除)
    //(jarray:{fid,fnValid}[])一個fid允許多個fnValid, 這種方式可以避開重複fnValid
    static readonly FidValid = '_valid';     //(json)fid-[required,fnValid]
    static readonly FidExt = '_ext';         //(json)fid-ext(json)

    //=== 以下為FidExt的屬性 start ===
    //(string)edit mode: '',(非編輯畫面),C(create),U(upate),V(view)
    //可控制欄位在特殊情形下是否可編輯
    static readonly FidMode = '_mode';       

    //欄位是否異動, (json)fid-change state(bool)
    static readonly FidState = '_state';     

    //欄立驗證, (json)fid-error msg
    static readonly FidError = '_error';
    //=== end ===

    /**
     * for查詢畫面或其他畫面初始化
     * @param vm 
     * @param mode 
     * @returns 
     */
    static init(vm:any, mode:string = ''):any {
        vm[_VM.FidValid] = {};    //json type
        _VM.resetExt(vm, mode);   //initial vm
        return vm;
    }

    /**
     * initial for edit form(C,U,V)
     * 登入畫面只需要 valid, 不需要 save !!
     * @param vm (by ref) for 新增時填入初始值
     * @param fidSaves (by ref) 不使用系統機制儲存DB可以傳null
     * @param mode C,U,V
     * @return vmInit
     */
    static initEdit(vm:any, fidSaves:string[], mode:string = ''):any {
        //fidSaves ??= [];
        //set vmInit & fidSaves
        let vmInit:any = {};
        for (let fid in vm){
            if (vm[fid] == '?') vm[fid] = '';
            else if (fidSaves) fidSaves.push(fid);  

            vmInit[fid] = vm[fid];
        }

        //initial ext & valids
        _VM.init(vm, mode);
        return vmInit;
    }

    static addValid(vm:any, fid:string, required:boolean, fnValid:Function){
        //多筆資料的輸入欄位載入時未讀取資料, vm[_VM.FidValid]為null, 所以加判斷
        if((required || fnValid) && vm[_VM.FidValid]) 
            vm[_VM.FidValid][fid] = [required, fnValid];

        /*
        if (vm[_VM.FidValid] != null){
            let valids = vm[_VM.FidValid] as any[];
            if (_Array.findIndex(valids, 'fid', fid) < 0)
                valids.push({'fid':fid, 'fnValid':fnValid});
        }
        */
    }

    //copy data fid only (no system field)
    static copyRow(from:any, to:any) {
        for (let fid in from)
            if (!_VM.isSystemFid(fid)) to[fid] = from[fid];
    }

    //copy data and state
    static copyRowState(from:any, to:any) {
        for (let fid in from){
            if (!_VM.isSystemFid(fid) && to[fid] != from[fid]){
                to[fid] = from[fid];
                _VM.setState(to, fid);
            } 
        }
    }

    //get data fid only (no system field)
    static getRow(vm:any):any {
        if (vm == null) return null;

        let result = {};
        _VM.copyRow(vm, result);
        return result;
    }

    //get json for create vm
    static getCreateRow(vm:any, fidSaves:string[]):any {
        let result:any = {};
        for (let fid in vm){
            if (!_VM.isSystemFid(fid) && vm[fid] != null && fidSaves.indexOf(fid) >= 0)
                result[fid] = vm[fid];
        }
        return _Json.isEmpty(result) ? null : result;
    }

    static getUpdRow(vm:any, fidSaves:string[]):any {
        let state = _VM.getState(vm);
        let result:any = {};
        for (let fid in vm){
            if (!_VM.isSystemFid(fid) && state[fid] && vm[fid] != null && fidSaves.indexOf(fid) >= 0)
                result[fid] = vm[fid];
        }
        return _Json.isEmpty(result) ? null : result;
    }

    static getValid(vm:any):any {
        return vm[_VM.FidValid] || {};
    }
    static getExt(vm:any):any {
        return vm[_VM.FidExt] || {};
    }
    static getState(vm:any):any {
        return _VM.getExt(vm)[_VM.FidState] || {};
    }
    static getError(vm:any):any {
        return _VM.getExt(vm)[_VM.FidError] || {};
    }
    static getFidError(vm:any, fid:string):string {
        return _VM.getError(vm)[fid] || '';
    }

    //判斷vm欄位是否為system fid
    private static isSystemFid(fid:string) {
        return (fid == _VM.FidValid || fid == _VM.FidExt);
    }

    /**
     * 輸入欄位是否唯讀模式 for 控制自定輸入欄位的狀態(disabled or not)
     * @param vm
     * @param editFuns 擁有的編輯功能字串清單, ex:'CUV'
     */ 
    static isView(vm:any, editFuns:string):boolean {
        let ext = _VM.getExt(vm);
        if (!ext) return false;

        var mode = ext[_VM.FidMode];
        return (mode == '') 
            ? false
            : editFuns.indexOf(mode) < 0;
    }

    /**
     * reset ext field
     * @param vm 
     * @param mode set FidMode
     */
    static resetExt(vm:any, mode:string) {
        let ext:any = {};
        vm[_VM.FidExt] = ext;
        ext[_VM.FidMode] = mode;
        ext[_VM.FidState] = {};       //json
        ext[_VM.FidError] = {};       //json
    }

    /*
    //reset
    static resetRow(vm:any, mode:string) {
        for (let fid in vm)
            if (!_VM.isSystemFid(fid)) vm[fid] = '';         
        _VM.resetExt(vm, mode);
    }
    */

    //set value & state
    static setValue(vm:any, fid:string, value:any) {
        vm[fid] = value;
        _VM.setState(vm, fid);
    }
    
    //set changed state
    static setState(vm:any, fid:string) {
        _VM.getExt(vm)[_VM.FidState][fid] = true;
    }

    /**
     * set edit mode, called by CrudEdit setMode()
     * @param mode C,U,V
     */ 
    static setMode(vm:any, mode:string) {
        _VM.getExt(vm)[_VM.FidMode] = mode;
    }
   
    /**
     * called by 自定欄位 onChange event
     * @param value 
     * @param required 自定欄位check屬性
     * @param fnValid fnValid屬性
     * @returns error msg if any
     */
    static validValue(value:any, required:boolean, fnValid?:Function):string {
        //let error:any = _VM.getError(vm);
        //if (!error) return true;

        return _Obj.isNull(value) ? (required ? _Locale.br.Required : '') : 
            fnValid ? fnValid() : 
            '';
    }

    /**
     * validate vm
     * @param vm 
     * @param validJson use vm[valid] if null, EditMany 呼叫時會傳入 !! 
     * @returns 
     */
    static validRow(vm:any, validJson:any = null):boolean {
        //if (!valids) valids = vm[_VM.FidValid] as any[];
        validJson ??= _VM.getValid(vm);
        let state:any = _VM.getState(vm);
        let error:any = _VM.getError(vm);
        let ok = true;
        for (let fid in validJson){
            //沒有異動過的欄位才處理 fnValid會update error[fid]
            if (state[fid] == null && validJson[fid]){
                let ary:any[] = validJson[fid];
                error[fid] = _VM.validValue(vm[fid], ary[0], ary[1]);
            } //(validJson[fid] as Function)();
            if (ok && error[fid]) ok = false;
        }
        return ok;
    }

} //class