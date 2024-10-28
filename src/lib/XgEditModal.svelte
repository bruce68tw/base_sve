<!-- 
  @component
  用在非編輯畫面時(ex:earth_adm_sve VolE2.svelte)：
    crudE=null, 設定fnOnOk　
 -->
 <div class:d-none={!show} class="modal xg-modal">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content" style="width:{width}">
      <div class="modal-header">
        <div class="modal-title">{progName + modeName}</div>
        <button type="button" class="btn-close" aria-label="Close" on:click={close}></button>
      </div>

      <div class="modal-body">
        <!-- 使用 xg-off 來控制 xg-form 裡面的輸入欄位是否為唯讀 -->
        <div class='xg-form' class:xg-off={isView}>
          <slot/>
        </div>
      </div>

      <div class="modal-footer">
        <XbCancel fnOnClick={close}/>
        {#if fnOnYes}
          <XbYes fnOnClick={fnOnYes} disabled={isView} />
        {:else}
          <XbSave fnOnClick={onSaveA} disabled={isView} />
        {/if}
      </div>
    </div>
  </div>
</div>

<script lang='ts'>
  import type CrudEdit from '../ts/CrudEdit';
  import XbSave from './XbSave.svelte';
  import XbCancel from './XbCancel.svelte';
  import XbYes from './XbYes.svelte';
  import _Locale from '../ts/_Locale';

  //property
  /**
   * program title
   */
   export let progName:string;
  
  /**
   * null也必須設定 for 非編輯畫面用途
   */
  export let crudE:CrudEdit;

  /**
   * 內容區域寬度, ex:'600px'
   */
   export let width = '600px';

  /**
   * show fun mode name or not
   */
  export let showMode = true;

  /**
   * 開啟畫面後觸發，不可空白
   * - vm 變數必須重設才能render畫面, ex: fnSetVm={()=> vm=vm}
   */
  export let fnSetVm:Function;

  /**
   * 如果包含child table, 則必須設定此函數
   * - ex: fnJsonToChild={(json)=> vm=vm}
   */
  export let fnJsonToChild:Function = null;

  /**
   * onclick OK button, 如果有值則會使用OK(確定)按鈕取代Save按鈕
   */
  export let fnOnYes:Function = null;

  let show = false;
  let mode:string;
  $: isView = (mode == 'V');
  $: modeName = showMode ? ('-' + crudE.modeName(mode)) : '';

  //called by CrudEdit, save XgEditForm
  export function open(nowMode:string, json:any){ 
    mode = nowMode;
    show = true;
    fnSetVm();
    if (fnJsonToChild)
      fnJsonToChild(json);
  }

  //called by 2 places & outside
  export function close(){ show = false; }

  //called by CrudEdit
  export function callFnSetVm(){ fnSetVm();}

  async function onSaveA():Promise<void> {
    if (await crudE.onSaveA()) show = false; //close modal
  }

</script>
