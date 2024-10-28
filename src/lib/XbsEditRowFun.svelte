<!-- 
  @component
  編輯畫面多筆資料列功能按鈕, 最多包含4個按鈕:edit,delete,move up,move down
 -->
<span class=''>
  {#if fnOnUpdate}
    <XblUpdate fnOnClick={()=> fnOnUpdate(vm)} disabled={isView}/>
  {/if}
  <XblDelete fnOnClick={()=> fnOnDelete(vm)} disabled={isView}/>
  {#if fnOnView}
    <XblView fnOnClick={()=> fnOnView(vm)} />
  {/if}
  {#if fidSort}
    <!-- todo -->
    <button type="button" class="btn btn-link">
      <i class="ico-delete" title={_Locale.br.TipDelete}></i>
    </button>
    <button type="button" class="btn btn-link">
      <i class="ico-delete" title={_Locale.br.TipDelete}></i>
    </button>  
  {/if}
</span>

<script lang="ts">
  import _Locale from '../ts/_Locale';
  import XblUpdate from './XblUpdate.svelte';
  import XblDelete from './XblDelete.svelte';
  import XblView from './XblView.svelte';
  
  /**
   * row key
   */
  export let vm:any;

  /**
   * row key
   */
  //export let kid:string;

  /**
   * is view only or not
   */
  export let isView:boolean;

  /**
   * sorting fid, if has will show move up/down icon
   */
  export let fidSort:string = '';

  /**
   * (optional) onclick edit function
   */
  export let fnOnUpdate:Function = null;

  /**
   * (optional) onclick edit function
   */
   export let fnOnView:Function = null;

/**
   * onclick delete function
   */
  export let fnOnDelete:Function;

</script>