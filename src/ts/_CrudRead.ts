import type EasyDtDto from "../dto/EasyDtDto";
import _Ajax from "./_Ajax";
import _Fun from "./_Fun";
import _Json from "./_Json";

export default class _CrudRead {

    /**
     * 讀取後端分頁資料 by svelteKit +page.ts
     * @param min 
     * @param max 
     * @returns 
     */
    static async fetchPageA(ctrl:string, page:number):Promise<any[]> {
          
      //get datatable input params
      let easyDt:EasyDtDto = {
        start: (page - 1) * _Fun.pageRows,
        length: _Fun.pageRows,
        recordsFiltered: -1,
        findJson: '',
        sort: '',
      };
  
      //ajax call & load rows
      let json = await _Ajax.getJsonA(`/${ctrl}/GetPage`, true, easyDt, false);
      if (!json) return [];
          
      return json['data'] || [];
    }

} //class