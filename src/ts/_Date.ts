import moment from 'moment';
import _Fun from "./_Fun";
import _Locale from "./_Locale";
import _Str from "./_Str";
import type IdStrDto from '../dto/IdStrDto';

/**
 * 使用 moment.js(mm), 預設傳入Date, 如果傳入字串則為mm格式
 * for date related
 * short name:
 *  1.date: moment date
 *  2.dt: moment datetime
 *  3.ds: date string
 *  4.dts: datetime string
 */ 
export default class _Date {

    /**
     * mm date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */ 
    static dsToUi(ds:string):string {
        return (_Str.isEmpty(ds))
            ? ''
            : moment(ds, _Fun.MmDateFmt).format(_Locale.br.MmUiDateFmt);
    }

    static dtsToUi(dts:string):string {
        return (_Str.isEmpty(dts))
            ? ''
            : moment(dts, _Fun.MmDtFmt).format(_Locale.br.MmUiDtFmt);
    }

    static dtsToUi2(dts:string):string {
        return (_Str.isEmpty(dts))
            ? ''
            : moment(dts, _Fun.MmDtFmt).format(_Locale.br.MmUiDt2Fmt);
    }

    static todayToUi():string {
        return _Date.toUiDate(new Date());
    }

    static toUiDate(date:Date):string {
        return moment(date).format(_Locale.br.MmUiDateFmt);
    }

    static toDs(date:Date):string {
        return moment(date).format(_Fun.MmDateFmt);
    }

    /*
    static dateToMm(date:Date):string {
        return moment(date).format(_Fun.MmDateFmt);
    }
    */

    static getHourList():IdStrDto[] {
        let rows:IdStrDto[] = [];
        for(let i=0; i<24; i++) {
            rows.push({
                Id: i.toString(),
                Str: i.toString(),
            });
        }
        return rows;
    }

    static getMinuteList(step:number):IdStrDto[] {
        let rows:IdStrDto[] = [];
        for (let i=0; i<60; i+=step){
            rows.push({
                Id: i.toString(),
                Str: i.toString(),
            });
        }
        return rows;
    }

    static dtsToDate(dts:string):Date | null {
        if (dts == "") return null;
        if (dts.length <= 10) dts += " 00:00:00";

        let date = new Date(dts);
        return isNaN(date.getTime()) ? null : date;
    }

} //class