<XiBox prop={box}>
  <!-- 不同處 1/2 -->
  <textarea value={vm[fid]} on:input={onChange} maxlength={maxLen > 0 ? maxLen : -1} 
    rows={rowsCount} placeholder={placeholder} required={required}
    class={'form-control xi-input ' + _Input.getErrClass(error, fid)} disabled={_VM.isView(vm, edit)} />

  {#if error && error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //=== 個別屬性 ===
  export let maxLen = 0;
  export let rowsCount = 3;

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
  export let placeholder = '';
  export let fnValid:Function = null;
  export let fnOnChange:Function = null;
  //export let check = '';
  //export let width = '';

  //base props to input frame dto
  const box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  function onChange(event:Event){
    vm[fid] = (event.target as any).value;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }
</script>