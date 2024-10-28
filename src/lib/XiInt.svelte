<XiBox prop={box}>
  <!-- 不同處 1/2, digits=true是jQuery validation的設定, pattern only for validate -->
  <input type='number' value={vm[fid]} on:keypress={onKeyPress} on:change={onChange}  
    min={min == null ? null : min} max={max == null ? null : max} placeholder={placeholder}    
    required={required} class={'form-control xi-input ' + _Input.getErrClass(error, fid)} 
    disabled={_VM.isView(vm, edit)} />

  {#if error && error[fid]}
    <div class='invalid-feedback'>{error[fid]}</div>
  {/if}
</XiBox>

<script lang='ts'>
  import XiBox from './XiBox.svelte';
  import _Input from '../ts/_Input';
  import _Fun from '../ts/_Fun';
  import _VM from '../ts/_VM';

  //property, 目前無法使用inline object
  //=== 不同處 2/2 ===
  export let min:number = null;
  export let max:number = null;

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
  export let placeholder = '';
  export let fnValid:Function = null;
  export let fnOnChange:Function = null;

  //base props to input frame dto
  const box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  //only digits
  function onKeyPress(event:KeyboardEvent){
    if (event.key == '.'){
      event.preventDefault();
      return false;
    } 
  }

  function onChange(event:Event){
    //let value = (event.target as any).value;
    vm[fid] = (event.target as any).value;
    error[fid] = _VM.validValue(vm[fid], required, fnValid);
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }
</script>