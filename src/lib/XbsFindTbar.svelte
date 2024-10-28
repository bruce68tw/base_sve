<!-- 
  @component
  查詢畫面右邊工具列, 目前包含3個按鈕:F(find),R(reset),2(find2)
 -->
<span class='col-md-3 xg-find-tbar'>
  {#if hasFind}
    <button type='button' class='btn btn-primary' on:click={()=> crudR.onFindA()}>
      {_Locale.br.BtnFind}
      <i class='ico-find'></i>
    </button>
  {/if}
  {#if hasReset && fnOnReset}
    <button type='button' class='btn btn-secondary' on:click={()=> fnOnReset()}>
      {_Locale.br.BtnReset}
      <i class='ico-delete'></i>
    </button>
  {/if}
  {#if hasFind2}
    <button type='button' class='btn btn-info' on:click={()=> crudR.onFind2()}>
      {_Locale.br.BtnFind2}
      <i class='ico-find2'></i>
    </button>
  {/if}
</span>

<script lang="ts">
  import type CrudRead from '../ts/CrudRead';
  import _Locale from '../ts/_Locale';
  
  /**
   * crudR 變數
   */
  export let crudR:CrudRead;

  /**
   * - 包含的功能清單, F(find), R(reset), 2(find2:ext find form)
   * - default: 'F'
   * - ex: 'FR2'
   */
  export let funs:string = 'F';

  /**
   * - funs包含reset功能時, 必須提供這個屬性, 因為vm無法在外部設定 !!
   * - 固定內容: fnOnReset={()=> vm=crudR.getReset()}
   */
  export let fnOnReset:Function = null;

  //variables
  let hasFind = funs.indexOf('F') >= 0;
  let hasReset = funs.indexOf('R') >= 0;
  let hasFind2 = funs.indexOf('2') >= 0;

  /*
  //todo
  function onFind2() {
    if (hasFind2) crudR.onFind2();
  }
  */

</script>