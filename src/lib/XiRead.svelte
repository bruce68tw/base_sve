<XiBox prop={box}>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <div class='xi-read'>{value || ''}</div>
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //property, 目前無法使用inline object
  //=== 不同處 2/2 ===

  //=== common below ===
  //可使用 vm[fid] 或 value 來顯示內容
  //export let vm:any = {};
  //export let fid:string = '';  
  export let value:string = '';  
  export let title = '';
  export let cols = '';
  export let labelTip = '';
  export let custCss = false;
  export let inBlock = false;
  //export let extClass = '';

  //value = value || '';
  /*
  //=== 以下相同 ===
  $: error = _VM.getError(vm);
  if (fid != ''){
    value = vm[fid];
    if (error) _VM.addSkip(vm, fid);
  }
  */
 
  //base props to input frame dto
  const box = _Input.propToBox(title, false, custCss, cols, labelTip, inBlock);
  
  </script>