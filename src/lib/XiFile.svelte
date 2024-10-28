<!-- 
  @component
  檔案上傳欄位
 -->
 <XiBox prop={box}>
  <div class='form-control xi-box mb-0 xi-input'>
    <input type='file' bind:this={fileInput} on:change={onChange} style='display:none' {accept}>
    <button type='button' class='btn btn-link' on:click={()=> fileInput.click()} {disabled}>
        <i class='ico-open'></i>
    </button>
    <button type='button' class='btn btn-link' on:click={onDeleteFile} {disabled}>
        <i class='ico-delete'></i>
    </button>
    <button type='button' class='btn btn-link' on:click={onViewFile}>{vm[fid]}</button>
  </div>

  {#if error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import type CrudEdit from '../ts/CrudEdit';
  import type EditMany from '../ts/EditMany';
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';
  import _Str from '../ts/_Str';
  import _File from '../ts/_File';
  import _Tool from '../ts/_Tool';

  //=== 共同屬性 ===
  export let vm:any;
  export let fid:string;  
  export let edit = 'CU';  
  export let title = '';
  export let cols = '';
  export let required = false;
  export let custCss = false;     //欄位是否在row class裡面
  export let inBlock = false;   //(水平)title=''時才有作用,xi-input後面加上d-inline-block
  //export let extClass = '';
  export let labelTip = '';
  //export let placeholder = '';
  //export let width = '';
  export let fnValid:Function = null;
  export let fnOnChange:Function = null;

  /**
   * server side field id, ex: t0_PhotoFile
   */
  export let sid:string;

  /**
   * crud 可以為 CrudEdit 或是 EditMany !!
   */
  export let crud:CrudEdit | EditMany;
  
  /**
   * ex: .png,.jpg
   */
  export let accept:string = '';  

  $: disabled = _VM.isView(vm, edit);

  let fileInput:HTMLInputElement;

  //=== 全部組件使用相同寫法 ===
  let box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);  //綁定error  
  _VM.addValid(vm, fid, required, fnValid); //add validation

  export function getFile():File {
    return (fileInput.files && fileInput.files[0])
      ? fileInput.files[0] : null;
  }

  export function getSid():string {
    return sid;
  }

  function onChange(){
    //'_ifile.onChangeFile(this)'

    //1.case of empty file
    var value = _File.getFileName(fileInput.value);
    vm[fid] = value;
    if (_Str.notEmpty(value)){
      //2.check file ext

      //3.check file size
    }

    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }

  function onDeleteFile(){
    setO('');
  }

  function onViewFile() {
    var fileName:string = vm[fid];
    if (_Str.isEmpty(fileName)) return;
    if (getFile() != null) {
        _Tool.msg('檔案已經修改，無法預覽。_BR.NewFileNotView');
    } else {
        let ext = _File.getFileExt(fileName);
        if (_File.isImageExt(ext))
            _Tool.showImage(crud.getFileUrl(sid, ext), fileName);
    }
  }

  //set object see _ifile.js
  function setO(value:string){
    vm[fid] = value;
    //obj.val(value);     //set hidden input value
    //_ifile._elmToLink(obj).text(value);  //set link show text
  }

  /*
  //return: valid status
  //error[fid] 必須在這個檔案設定才能更新UI !!
  function valid():boolean {
    error[fid] = _VM.validValue(vm[fid], required, check, fnValid);
    return (error[fid] == '');
  }
  */
  </script>