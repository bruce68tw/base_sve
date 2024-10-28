import type MenuDto from "../dto/MenuDto";
import _Fun from "./_Fun";

export default class _LeftMenu {

    /**
     * filter menu(最多2層) by auth str list
     * @param items
     * @param auths 後端傳入的權限字串, 已包含前後分隔字元
     * @returns new menu
     */
    static filterByAuth(items:MenuDto[], auths:string):MenuDto[] {
        if (_Fun.authType == 0) return items;
        let sep = (_Fun.authType == 1) ? ',' : ':';
        //let auth2 = ',' + auths + sep;
        let result:MenuDto[] = [];
        for (let item of items){
            if (item.Items){
                let result2:MenuDto[] = [];
                for (let item2 of item.Items){
                    if (auths.indexOf(',' + item2.Url?.substring(1) + sep) >= 0)
                        result2.push(item2);
                }
                if (result2.length > 0)
                    result.push({ Name: item.Name, Items: result2 });
            } else {
                if (auths.indexOf(',' + item.Url?.substring(1) + sep) >= 0)
                    result.push(item);
            }
        }
        
        return result;
    }

} //class