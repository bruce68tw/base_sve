<!-- 
  @component
  必填欄位: vm, fid, rows
 -->
<XiBox prop={box}>
  <!-- 不同處 1/2 -->
  <select value={vm[fid].toString()} on:input={onChange} {placeholder} {required}
    class={'form-select xi-input ' + _Input.getErrClass(error, fid)} disabled={_VM.isView(vm, edit)} >
    {#if addEmptyRow}
      <option value='' title=''>{_Locale.br.PlsSelect}</option>
    {/if}
    {#each rows || [] as row}    
      <option value={row.Id.toString()}>{row.Str}</option>
    {/each}
  </select>

  {#if error && error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import type IdStrDto from '../dto/IdStrDto';
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _VM from '../ts/_VM';
  import _Fun from '../ts/_Fun';
  import _Locale from '../ts/_Locale';

  //=== 個別屬性 ===
  export let rows:Array<IdStrDto>;
  export let addEmptyRow = true;

  //=== common ===
  export let vm:any;
  /**
   * vm[fid]內容可為字串或數字, 系統會轉成字串後比對
   */
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

  //base props to input frame dto
  const box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  function onChange(event:Event){
    //let value = (event.target as any).value;
    vm[fid] = (event.target as any).value;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }
</script>