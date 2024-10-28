<XiBox prop={box}>
  <!-- 包一層 div 設定 xi-input -->
  <div class='xi-input'>
    <label class='xi-check' class:xg-no-label={!label}>
      <input type='checkbox' {checked} on:click={onClick} disabled={_VM.isView(vm, edit)}>{label}
      <span class='xi-cspan'/>
    </label>
  </div>
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //property, 目前無法使用inline object
  //=== 不同處 2/2 ===
  export let label = "";

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

  $: checked = (vm[fid] == 1);

  //base props to input frame dto
  const box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);

  function onClick(){
    checked = !checked;   //checked此時尚未更新!!
    vm[fid] = checked ? 1 : 0;  
    _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }
</script>