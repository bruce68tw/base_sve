
export default class _Cookie {

    /**
     * find index by fid/value
     * @param rows
     * @param fid 
     * @param value 
     * @returns index, -1 if not found
     */
    static add(name:string, value:string, hours:number) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

} //class