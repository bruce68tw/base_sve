<!-- fade not work for display none !! -->
<div class:d-none={!show} in:fade={_Fun.FadeTime}>
  <!--
  <XgProgPath bind:names={progName2} />
  -->
  <!-- mode相關statement具有reactive, 如果將以下內容存成變數, 則必須使用 $: -->
  <div class='xg-prog-path'>{progName + modeName}</div>
  <div class="xg-prog">
    <!-- 使用 xg-off 來控制 xg-form 裡面的輸入欄位是否為唯讀 -->
    <slot/>

    <div class='text-center mt-3'>
      {#if hasCrudR}
        <XbToRead fnOnClick={()=> crudE.toRead()} />
      {/if}
      <XbSave label={saveLabel} fnOnClick={()=> crudE.onSaveA()} disabled={mode == 'V'} />
    </div>    
  </div>
</div>

<script lang='ts'>
  import { fade } from 'svelte/transition';
  import type CrudEdit from '../ts/CrudEdit';
  import XbSave from './XbSave.svelte';
  import XbToRead from './XbToRead.svelte';
  import _Locale from '../ts/_Locale';
  import _Fun from '../ts/_Fun';

  //property
  export let progName:string;
  export let crudE:CrudEdit;

  /**
   * show fun mode name or not
   */
  export let showMode = true;

  //save button label if need
  export let saveLabel = '';

  /**
   * 如果沒有CrudRead, 則設為false, 會隱藏相關元件
   */
  export let hasCrudR = true;

  /**
   * 開啟畫面後觸發，不可空白
   * - vm 變數必須重設才能render畫面, ex: fnSetVm={()=> vm=vm}
   */
  //export let fnSetVm:Function;
  export let fnSetVm:()=> void;
  
  /**
   * 如果包含child table, 則必須設定此函數
   * - ex: fnJsonToChild={(json)=> vm=vm}
   */
  export let fnJsonToChild:Function = null;

  let show = false;
  let mode:string;
  $: modeName = showMode ? ('-' + crudE.modeName(mode)) : '';

  //called by CrudEdit
  export function open(newMode:string, json:any){ 
    mode = newMode;
    show = true;
    fnSetVm();
    if (fnJsonToChild)
      fnJsonToChild(json);
  }
  export function close(){ show = false; }

  //called by CrudEdit
  export function callFnSetVm(){ fnSetVm(); }

  //called by CrudEdit
  export function setMode(newMode:string){ mode = newMode; }

</script>
