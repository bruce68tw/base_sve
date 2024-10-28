<!-- 
  @component
  XiKeyModal 查詢畫面右邊工具列, 目前包含3個按鈕:find,select
 -->
<div class="col-md-{col} mt-2 ps-0">
  <button type="button" class="btn btn-success" on:click={()=> fnOnFind()}>
    {_Locale.br.BtnFind}
    <i class='ico-find'></i>
  </button>
  <button type="button" class="btn btn-primary" on:click={()=> fnOnSelect()}>
    {_Locale.br.BtnSelect}
    <i class='ico-checked'></i>
  </button>
</div>

<script lang="ts">
  import _Locale from '../ts/_Locale';
  
  /**
   * - 欄位寬度
   */
  export let col:string;

  /**
   * - onclick find
   */
  export let fnOnFind:Function;

  /**
   * - onclick select
   */
   export let fnOnSelect:Function;

</script>