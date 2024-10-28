<XiBox prop={box}>
  <div class='xi-input'>
    {#each rows as row}    
      <label class='xi-check'>
        <input type='radio' name={fid} value={row.Id} bind:group={vm[fid]} on:click={onChange} {disabled}>{row.Str}
        <span class='xi-rspan'/>
      </label>    
    {/each}
  </div>
</XiBox>

<script lang='ts'>
  import type IdStrDto from '../dto/IdStrDto';
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //property, 目前無法使用inline object
  //=== 不同處 2/2 ===
  //export let label = "";

  /**
   * 資料來源, Id=radio.value, Str=顯示文字
   */
  export let rows:IdStrDto[];

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
  export let fnOnChange:Function = null;

  //let checked = (vm[fid] == 1);

  $: disabled = _VM.isView(vm, edit);

  //base props to input frame dto
  const box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);

  function onChange(){
    //vm[fid] = checked ? 0 : 1;  //checked此時尚未更新!!
    //if (state) state[fid] = true;
    _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }

</script>