export default class _Html {

    /**
     * load html file
     */ 
    static async loadHtml(path:string):Promise<string> {
        const response = await fetch(path);
        return await response.text();
    }

} //class