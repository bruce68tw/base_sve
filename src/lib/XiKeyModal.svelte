<XiBox prop={box}>
  <!-- 增加 flex-nowrap, 否則icon會換行 !! -->
  <div class="input-group flex-nowrap">
    <input value={vm[fname]} type='text'
        class={'form-control xi-input ' + _Input.getErrClass(error, fid)} disabled />
    <button type="button" class="btn btn-outline-secondary ps-1 xi-input" on:click={()=> fnOnOpen()} disabled='{_VM.isView(vm, edit)}'>
      <i class="ico-find" title='開啟查詢畫面'></i>
    </button>
    
    {#if error && error[fid]}
      <div class='invalid-feedback order-last'>{error[fid]}</div>
    {/if}    
  </div>
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //=== 個別屬性 ===
  export let fname:string;  //name field
  export let fnOnOpen:Function;

  //=== common ===
  export let vm:any;
  export let fid:string;  
  export let edit = 'CU';  
  export let title = '';
  export let cols = '';
  export let required = false;
  export let custCss = false;
  export let inBlock = false;
  //export let extClass = '';
  export let labelTip = '';
  export let fnValid:Function = null;
  export let fnOnChange:Function = null;

  /**
   * onclick button to open modal
   */

  //=== 以下相同 ===
  let box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  export function onChange(value:string){
    //vm[fid] = value;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }
</script>
