<XiBox prop={box}>
  <!-- date(add d-inline-block), same to xiDate -->
  {@const hours = _Date.getHourList()}
  {@const minutes = _Date.getMinuteList(minuteStep)}
  <div class='d-flex'>
    <div class="input-group flex-nowrap" style="width:{_Locale.br.IDateWidth}">
      <!-- format、value屬性會互相影響, 目前設為一致 -->
      <SveltyPicker value={_Date.dsToUi(date)} format={_Locale.br.IDateFmt} on:change={onChange1}
        inputClasses={'form-control xi-input ' + _Input.getErrClass(error, fid)} {disabled} />
      <button type="button" class="btn btn-outline-secondary ps-1" {disabled}>
        <i class="ico-date"></i>
      </button>
    </div>

    <!-- hour -->
    <select value={hour} on:input={onChange2} style='width:80px' 
      class='form-select ms-2 xi-input' {disabled} >
      {#each hours || [] as row}    
        <option value={row.Id}>{row.Str}</option>
      {/each}
    </select>
    <span class='ms-2 me-2'>:</span>

    <!-- minute -->
    <select value={min} on:input={onChange3} style='width:80px'
      class='form-select xi-input' {disabled} >
      {#each minutes || [] as row}    
        <option value={row.Id}>{row.Str}</option>
      {/each}
    </select>
  </div>

  {#if error[fid]}
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
  import _Str from '../ts/_Str';

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
  export let minuteStep = 10;

  $: disabled = _VM.isView(vm, edit);

  //日期 時:分
  let date = "";
  let hour = "0";
  let min = "0";

  //vm[fid]異動時自動觸發 !!
  $: (()=> {
    date = "";
    hour = "0";
    min = "0";
    if (vm != null && _Str.notEmpty(vm[fid])){
      let dt = _Date.dtsToDate(vm[fid]);
      if (dt != null){
        date = _Date.toDs(dt);
        hour = dt.getHours().toString();
        min = dt.getMinutes().toString();
      }
    }
  })();

  //加上 d-flex 欄位才能水平排列!!
  let box = _Input.propToBox(title, required, custCss, cols, labelTip, inBlock);
  $: error = _VM.getError(vm);
  _VM.addValid(vm, fid, required, fnValid);

  function onChange1(event:Event){
    date = (event as any).detail;
    onChange();
  }
  function onChange2(event:Event){
    hour = (event.target as any).value;
    onChange();
  }
  function onChange3(event:Event){
    min = (event.target as any).value;
    onChange();
  }

  function onChange(){
    //firstIn = false;
    vm[fid] = `${date} ${hour}:${min}`;
    error[fid] = _VM.validValue(date, required, fnValid); //validate date only!!
    if (!error[fid]) _VM.setState(vm, fid);
    if (fnOnChange) fnOnChange(vm);
  }

</script>
