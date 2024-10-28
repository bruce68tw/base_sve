<div {...$$restProps} class:d-none={!show} class="modal xg-modal">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content" style={size}>
      <div class="modal-header">
        <div class="modal-title">{title}</div>
        <button type="button" class="btn-close" aria-label="Close" on:click={close}></button>
      </div>
      <div class="modal-body pb-0">
        <slot/>
      </div>

      {#if fnOnYes}
        <div class="modal-footer">
          <XbCancel fnOnClick={close} />
          <XbYes fnOnClick={()=> fnOnYes()} />
        </div>
      {/if}
    </div>
  </div>
</div>

<script lang='ts'>
  import _Locale from '../ts/_Locale';
  import XbYes from './XbYes.svelte';
  import XbCancel from './XbCancel.svelte';

  //property
  export let title:string;

  /**
   * 內容區域大小,例如 'width:420px; height:300px'
   */
  export let size:string;

  /**
   * 如果設定這個函數則modal底部會顯示取消、確定按鈕
   */
  export let fnOnYes:Function = null;

  let show = false;

  export function open(){
    show = true;
  }
  export function close(){
    show = false;
  }
</script>
