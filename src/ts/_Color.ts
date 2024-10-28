import { ColorSetEnum } from "../enum/ColorSetEnum";
import _Num from "./_Num";

export default class _Color {

    //3的倍數, 最多12個元素
    private static getColors(colorSet:ColorSetEnum):string[] {
        switch (colorSet){
            case ColorSetEnum.vintage:    //1.復古
                //1,4,9,3,6,8,2,7,10,5,11,12
                return [
                    'rgb(7,128,207,?)',
                    'rgb(14,44,130,?)',
                    'rgb(0,157,178,?)',
                    'rgb(250,109,29,?)',
                    'rgb(218,31,24,?)',
                    'rgb(244,122,117,?)',
                    'rgb(118,80,5,?)',
                    'rgb(112,24,102,?)',
                    'rgb(2,75,81,?)',
                    'rgb(182,181,31,?)',
                    'rgb(7,128,207,?)',
                    'rgb(118,80,5,?)',
                ]; 
            case ColorSetEnum.fresh:    //2.清新
                return [
                    'rgb(99,178,238,?)',
                    'rgb(124,214,207,?)',
                    'rgb(120,152,225,?)',
                    'rgb(248,203,127,?)',
                    'rgb(248,149,136,?)',
                    'rgb(239,166,102,?)',
                    'rgb(118,218,145,?)',
                    'rgb(237,221,134,?)',
                    'rgb(118,218,145,?)',
                    'rgb(145,146,171,?)',
                    'rgb(153,135,206,?)',
                    'rgb(99,178,238,?)',                    
                ];
            case ColorSetEnum.energetic:    //4.有精神
                return [
                    'rgb(0,168,225,?)',
                    'rgb(153,204,0,?)',
                    'rgb(0,0,255,?)',
                    'rgb(227,0,57,?)',
                    'rgb(255,102,0,?)',
                    'rgb(219,0,194,?)',
                    'rgb(128,0,128,?)',
                    'rgb(128,128,0,?)',
                    'rgb(0,128,128,?)',
                    'rgb(252,211,0,?)',
                    'rgb(0,153,78,?)',
                    'rgb(200,204,0,?)',                    
                ];
            case ColorSetEnum.nostalgia:    //5.懷舊
                return [
                    'rgb(59,98,145,?)',
                    'rgb(56,132,152,?)',
                    'rgb(63,104,153,?)',
                    'rgb(148,60,57,?)',
                    'rgb(156,64,61,?)',
                    'rgb(201,121,55,?)',
                    'rgb(119,144,67,?)',
                    'rgb(191,115,52,?)',
                    'rgb(125,152,71,?)',
                    'rgb(98,76,124,?)',
                    'rgb(103,80,131,?)',
                    'rgb(59,139,161,?)',
                ];
            case ColorSetEnum.light:    //7.明亮
                return [
                    'rgb(14,114,204,?)',
                    'rgb(22,175,204,?)',
                    'rgb(14,114,204,?)',
                    'rgb(245,147,17,?)',
                    'rgb(250,67,67,?)',
                    'rgb(250,67,67,?)',
                    'rgb(108,163,15,?)',
                    'rgb(133,192,33,?)',
                    'rgb(108,163,15,?)',
                    'rgb(209,42,106,?)',
                    'rgb(245,147,17,?)',
                    'rgb(22,175,204,?)',
                ];
            case ColorSetEnum.colorFul:     //12.色彩豐富
                return [
                    'rgb(250,44,123,?)',
                    'rgb(255,56,224,?)',
                    'rgb(201,4,68,?)',
                    'rgb(4,197,243,?)',
                    'rgb(0,102,254,?)',
                    'rgb(128,133,233,?)',
                    'rgb(255,162,53,?)',
                    'rgb(144,237,125,?)',
                    'rgb(247,163,92,?)',
                    'rgb(137,50,165,?)',
                    'rgb(203,155,255,?)',
                    'rgb(67,67,72,?)',
                ];
                /*
            case ColorSetEnum.aa:
                return [
                ];
                */
            case ColorSetEnum.rainBow:
                return [
                    'rgb(243, 46, 55, ?)',
                    'rgb(234, 190, 55, ?)',
                    'rgb(137, 233, 38, ?)',
                    'rgb(34, 227, 82, ?)',
                    'rgb(47, 229, 232, ?)',
                    'rgb(41, 90, 231, ?)',
                    'rgb(136, 40, 238, ?)',
                    'rgb(230, 41, 183, ?)',
                    'rgb(230, 41, 183, ?)',
                ];
        }
    }

    /**
     * 將color範本字串轉成2個rgba顏色陣列
     * @param tpl template string
     * @param trans 透明度陣列
     * @returns 如果 trans.length==1 傳回字串陣列, 否則傳回2維字串陣列
     */
    private static tplToColorSets(tpl:string, trans:number[]):any[] {
        //tpl = tpl.replaceAll('\n', '');
        let result:any[] = [];
        for (let tran of trans)
            result.push(tpl.replaceAll('?', tran.toString()).split(';'));
        return (trans.length == 1) ? result[0] : result;
    }

    /**
     * pick color set array
     * @param colorSet 
     * @param colorNum 選取的顏色數量
     * @param trans 透明度陣列, 長度與回傳的set數目相同
     */
    static pickColorSets(colorSet:ColorSetEnum, colorNum:number, trans:number[]):any[] {
        //get template(tpl)
        let colors = this.getColors(colorSet);
        let colorLen = colors.length;
        let bools: boolean[] = new Array(12).fill(false);   //是否已選取
        let tpl = '';
        let sep = '';
        let takes = 0;
        //let maxTakes = trans.length;
        while (takes < colorNum){
            //find color array
            let start = takes * 3 % colorLen;
            let find = start + _Num.getRandom(0, 2);
            //如果元素已經選用, 往後面找2個元素
            if (bools[find]){
                for(let j=0; j<2; j++){
                    find++;
                    if (find > start + 2) find -= 3; //大於上限值則減3
                    if (!bools[find]) break;    //找未選用元素
                }
            }

            //add result
            bools[find] = true;
            tpl += sep + colors[find];
            sep = ';';
            takes++;
        }

        //template to result array
        return this.tplToColorSets(tpl, trans);
    }

} //class