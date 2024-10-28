import _Fun from "./_Fun";

//static class
export default class _Json {

    static isEmpty(json:any):boolean {
        return (json == null || Object.keys(json).length === 0);
    }

    static notEmpty(json:any):boolean {
        return !_Json.isEmpty(json);
    }

    /**
     * copy data to existed json
     * @param from must be any
     * @param to must be any
     * @returns new json data
     */
    static copy(from:any, to:any):any {
        to = to || {};
        for (var fid in from)
            to[fid] = from[fid];
        /*
        Object.keys(from).forEach((key, index)=> {
            // Error: No index signature with a parameter
            // of type 'string' was found on
            // type '{ name: string; country: string; }'.
            to[key] = from[key];
        });
        */
        return to;
    }

    //convert to FormData
    static toFormData(from:any):FormData {
        let to = new FormData();
        for (var fid in from)
            to.append(fid, from[fid]);
        return to;
    }

    static toStr(json:any):string {
        return (_Json.isEmpty(json)) ? '' : JSON.stringify(json);
    }

    static getChildRows(upJson:any, childIdx:number):any[] {
        var child = _Json.getChildJson(upJson, childIdx);
        return _Json.getJsonRows(child);
    }

    //get child json
    static getChildJson(upJson:any, childIdx:number):any {
        var childs = _Fun.FidChilds;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    }

    static setChildJson(upJson:any, childIdx:number, json:any) {
        upJson[_Fun.FidChilds][childIdx] = json;
    }

    //get json rows
    static getJsonRows(json:any):any[] {
        return (json == null || json[_Fun.FidRows] == null)
            ? null
            : json[_Fun.FidRows];
    }

} //class