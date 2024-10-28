<!-- 
  @component
  文字輸入欄位, 屬性目前無法使用inline object
  必填欄位: vm, fid
  注意: 
    1.因為使用grid排版, 無法使用width限制欄位寬度並且在後面增加內容 !!
    2.有外觀的元素都加上 xi-input(控制margin, min-height), 含複合欄位
    3.垂直欄位外層加 xi-box-v, 水平則不加
 -->

 <XiBox prop={box}>
  <!-- 文字欄位 -->
  <input value={vm[fid]} on:input={onChange} {placeholder} {required}  
    type={isPwd ? 'password' : 'text'} maxlength={maxLen > 0 ? maxLen : -1}
    class={'form-control xi-input ' + _Input.getErrClass(error, fid)} disabled={_VM.isView(vm, edit)} />

  {#if error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //=== 個別屬性 ===
  export let isPwd = false;
  export let maxLen = 0;

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
  export let placeholder = '';
  //export let width = '';
  export let fnValid:Function = null;
  export let fnOnChange:Function = null;

  //=== 全部組件使用相同寫法 ===
  //debugger;
  let box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);  //綁定error  
  _VM.addValid(vm, fid, required, fnValid); //add validation

  function onChange(event:Event){
    vm[fid] = (event.target as any).value;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
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