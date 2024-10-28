<!-- 
  @component
  可用於查詢結果和編輯畫面的多筆區域
-->
<th class={extClass} title={tip} on:click={onClick}
  style={width ? `width:${width}` : ''}>
  {#if required}
    <span class='xg-require'>*</span>
  {/if}
  {title}
  {#if tip}
    <i class='ico-info'></i>
  {/if}
</th>

<script lang="ts">
  //property
  export let title:string;
  export let tip = '';
  export let required = false;
  export let fnOnClick:Function = null;  //sort fid with table alias if need, ex:'u.account'
  export let extClass = '';
  
  /**
   * 欄位寬度, ex:20%, 80px
   */
  export let width = '';    //min width, 0 for not set
  //export let hideRwd = false; //todo: hide for RWD phone
  
  //onclick時必須移除其他欄位的排序符號, 所以在上一層處理
  function onClick(){
    if (fnOnClick) fnOnClick();  //不必傳入參數
  }

</script>