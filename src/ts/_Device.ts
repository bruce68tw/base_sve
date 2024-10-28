export default class _Device {

    /**
     * is mobile or not
     */ 
    static isMobile():boolean {
        const userAgent = navigator.userAgent;
        return /Mobi/.test(userAgent); // 使用正則表達式檢查是否包含 "Mobi" 字串
    }

} //class