import type IdStrDto from '../dto/IdStrDto';
//import type XiBaseDto from '../dto/XiBaseDto';
import type XiBoxDto from '../dto/XiBoxDto';
import _Fun from './_Fun';
import _Str from './_Str';
import _Locale from './_Locale';

// 自訂元件 helper, copy from c# _Input.cs
export default class _Input {

    //inputAttrs: 逗號分隔, ex:id,userId,name,userId
    public static propToBox(title:string, required:boolean, custCss:boolean, cols:string, 
        labelTip:string, inBlock:boolean):XiBoxDto
    {       
        let isHori:boolean | null = null;
        let labelAttrs:any = {};
        let col1:number = 0;
        let col2:number = 0;
        if (title != ''){
            let cols2:number[] = (cols == '')
                ? _Fun.DefHoriCols
                : cols.split(',').map(a=> Number(a));
            col1 = cols2[0];
            isHori = (cols2.length > 1);
            if (isHori) col2 = cols2[1];
            if (labelTip != '') labelAttrs['title'] = labelTip;
        }
        
        //box attributes

        /*
        //input attributes
        //let attrs: {[k: string]: any} = {};
        let inputAttrs2:any = {};
        if (type) inputAttrs2['type'] = type;
        if (required) inputAttrs2['required'] = true;
        if (placeHolder) inputAttrs2['placeHolder'] = placeHolder;
        if (inputAttrs){
            let vals = inputAttrs.split(',');
            for(let i=0; i<vals.length; i+=2)
                inputAttrs2[vals[i]] = vals[i+1].toString();
        } 
        */

        //無法設定全部屬性時必須先new
        let dto:XiBoxDto = {
            title: title,
            required: required,
            custCss: custCss,
            inBlock: (title == '' && inBlock),
            //extClass: extClass,
            labelTip: labelTip,
            //
            //labelAttrs: labelAttrs,
            isHori: (isHori == null) ? true : isHori,
            col1: col1,
            col2: col2,
            //col: inputCol,
            //boxAttrs: boxAttrs,
            //inputAttrs: inputAttrs2,

            //width: width,
        };
        return dto;

        /*
        //set data-fid, name
        let attr = _str.isEmpty(fid)
            ? " " : ` data-fid='${fid}' name='${fid}'`;
        //if (!edit)
        //    attr += " readonly";
        attr += " " + _helper.getDataEdit(edit);
        if (required)
            attr += " required";
        if (inputAttr != "")
            attr += " " + inputAttr;
        return attr;
        */
    }

    //get validate ok class object
    public static getErrClass(error:any, fid:string):string {
        return (error && error[fid]) ? _Fun.InvalidClass : '';
        /*
        var data:any = {};
        if (error) 
            data[_Fun.InvalidClass] = true;
        else if(_Fun.AddValidClass) 
            data['is-valid'] = true;
            
        return data;
        */
    }
   
    /**
     * copy from c# _Input.cs
     * @param from must be any
     * @param to must be any
     * @returns new json data
     */
    /*
    public static copy(from:any, to:any):object {
        to = to || {};
        for (let key in from)
            to[key] = from[key];
        return to;
    }


    //=== remark below ===
    public static getRequiredSpan(required:boolean):string{
        return required ? "<span class='xg-require'>*</span>" : "";
    }

    public static getIconTip():string{
        return "<i class='ico-info'></i>";
    }

    public static getInputAttr(fid:string, edit:string = "", 
        required:boolean = false, inputAttr:string = ""):string 
    {            
        //set data-fid, name
        let attr = _Str.isEmpty(fid)
            ? " " : ` data-fid='${fid}' name='${fid}'`;
        //if (!edit)
        //    attr += " readonly";
        attr += " " + _Input.getDataEdit(edit);
        if (required)
            attr += " required";
        if (inputAttr != "")
            attr += " " + inputAttr;
        return attr;
    }
   
    //get data-edit attribute string
    public static getDataEdit(edit:string):string{
        if (_Str.isEmpty(edit))
            edit = "*";
        return ` data-edit='${edit}'`;
    }

    //add placeholder attribute
    //placeholder could have quota, use escape
    public static getPlaceHolder(inputTip:string):string{
        return (inputTip == "")
            ? ""
            : " placeholder='" + inputTip + "'";
    }

    //get required attribute
    public static getRequired(required:boolean):string{
        return required ? " required" : "";
    }

    //get maxlength attribute
    public static getMaxLength(maxLen:number):string{
        return (maxLen > 0) 
            ? " maxlength='" + maxLen + "'" 
            : "";
    }

    public static getDateHtml(fid:string, value:string, type:string, 
        required:boolean = false, edit:string = "", inputTip:string = "",             
        inputAttr:string = "", boxClass:string = ""):string 
    {
        //input field attribute
        let attr:string;
        if (_Str.isEmpty(type)){
            //no fid, name
            attr = _Input.getInputAttr("", edit, required);
        } else {
            //only fid
            attr = _Input.getInputAttr(fid, edit, required) +
                ` data-type='${type}'`;
            boxClass += " xi-box";
        }
        attr += _Input.getPlaceHolder(inputTip);

        //value -> date format
        //value = _Date.GetDateStr(value);  //todo
        //let dataEdit = GetDataEdit(edit);

        //input-group & input-group-addon are need for datepicker !!
        return `
<div class='input-group date ${boxClass}' data-provide='datepicker' ${inputAttr}>
    <input${attr} value='${value}' type='text' class='form-control'>
    <div class='input-group-addon'></div>
    <span>
        <i class='ico-delete' onclick='_idate.onReset(this)'></i>
        <i class='ico-date' onclick='_idate.onToggle(this)'></i>
    </span>
</div>`;
    }

    //get link function string
    public static getLinkFn(fn:string):string{
        return `event.preventDefault();${fn};return false;`;
    }

    public static getSelectHtml(fid:string, value:string, type:string, rows:IdStrDto[] ,
        required:boolean = false, edit:string = "", addEmptyRow:boolean = true, 
        inputTip:string = "", inputAttr:string = "", boxClass:string = "",
        fnOnChange:string = ""):string
    {
        let hasType = _Str.notEmpty(type);
        let attr:string = hasType
            ? _Input.getInputAttr(fid, edit, required, inputAttr) + ` data-type='${type}'`
            : _Input.getInputAttr("", edit, required, inputAttr);
        attr += _Input.getPlaceHolder(inputTip);
        if (_Str.notEmpty(fnOnChange))
            attr += ` onchange='${fnOnChange}'`;

        //ext class
        //let extClass = required ? XdRequired : "";
        if (hasType)
            boxClass += " xi-box";

        //option item
        let optList = "";
        let tplOpt = "<option value='{0}'{2}>{1}</option>";

        //add first empty row & set its title='' to show placeHolder !!
        if (addEmptyRow)
            optList += _Str.format(tplOpt, "", _Locale.br.PlsSelect, "title=''");

            let len = (rows == null) ? 0 : rows.length;
        for (let i = 0; i < len; i++) {
            let selected = (value == rows[i].Id) ? " selected" : "";
            optList += _Str.format(tplOpt, rows[i].Id, rows[i].Str, selected);
        }

        //set data-width='100%' for RWD !!
        //use class for multi columns !!
        //xg-select-col for dropdown inner width=100%, xg-select-colX for RWD width
        return `
<select${attr} class='form-select ${boxClass}'>
${optList}
</select>`;            
    }

    private static getCols(cols:string):number[] {
        let values = _Str.toIntList(cols);
        return (values == null) ? _Fun.DefHoriCols : values;
    }    
    */
   
} //class