<XiBox prop={box}>
  <div class="input-group flex-nowrap" style="width:{_Locale.br.IDateWidth}">
    <!-- format、value屬性會互相影響, 目前設為一致 -->
    <SveltyPicker value={_Date.dsToUi(vm[fid])} format={_Locale.br.IDateFmt} on:change={onChange}
      i18n={_Locale.xiDate}
      inputClasses={'form-control xi-input ' + _Input.getErrClass(error, fid)} {disabled} />
    <button type="button" class="btn btn-outline-secondary ps-1 xi-input" {disabled}>
      <i class="ico-date"></i>
    </button>
  </div>

  {#if error && error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import SveltyPicker from 'svelty-picker'
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';
  import _Date from '../ts/_Date';
  import _Locale from '../ts/_Locale';

  //=== common below ===
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

  $: disabled = _VM.isView(vm, edit);

  //=== 以下相同 ===
  let box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  function onChange(event:Event){
    //let value = (event.target as any).value;
    vm[fid] = (event as any).detail;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }

  /*
  function valid():boolean {
    //if (!error) return true;    
    error[fid] = _VM.validValue(vm[fid], required, check, fnValid);
    return (error[fid] == '');
  }
  */
</script>

<!--
<style>
  :root {
    --date-picker-background: #1b1e27;
    --date-picker-foreground: #f7f7f7;
  }  
</style>
-->