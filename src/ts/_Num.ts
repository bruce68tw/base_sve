export default class _Num {

    static min(num1:number, num2:number):number{
        return (num1 <= num2)
            ? num1 : num2;
    }

    /**
     * get random, 包含 min, max
     * @param min 
     * @param max 
     * @returns 
     */
    static getRandom(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }    
} //class