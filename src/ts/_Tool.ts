import type XgTool from "../lib/XgTool.svelte";

//static class
export default class _Tool {

    private static me:XgTool;

    static init(tool:XgTool) { _Tool.me = tool; }
    static showWait() { _Tool.me.showWait(); }
    static hideWait() { _Tool.me.hideWait(); }
    static showImage(url:string, imageName:string) { _Tool.me.showImage(url, imageName); }

    static alert (msg:string) { _Tool.me.alert(msg); }
    static msg (msg:string) { _Tool.me.msg(msg); }
    static ans (msg:string, fnOnYes:Function, fnOnNo?:Function) {
        _Tool.me.ans(msg, fnOnYes, fnOnNo);
    }
   
} //class