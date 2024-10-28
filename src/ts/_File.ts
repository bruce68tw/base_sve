import _Str from "./_Str";

export default class _File {

    /**
     * get file name by path
     */ 
    static getFileName(path:string) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _Str.getTail(path, sep);
    }

    /**
     * get file ext without '.' in lowerCase, ex: txt
     */
    static getFileExt(path:string) {
        return _Str.getTail(path, '.').toLowerCase();
    }    

    static isImageExt(ext:string) {
        return (",jpg,jpeg,png,gif,tif,tiff,").indexOf("," + ext + ",") >= 0;
    }

} //class