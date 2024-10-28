<!-- fade not work for display none !! -->
<div class:d-none={!show} in:fade={_Fun.FadeTime}>
  <XgProgPath names={[progName]} block={fnOnTopBtn != null} />
  {#if fnOnTopBtn}
    <button class='btn btn-primary' on:click={()=> fnOnTopBtn()}>{topBtnText}</button>
  {/if}
  <div class="xg-prog">
    <slot/>
  </div>
</div>

<script lang='ts'>
  import { fade } from 'svelte/transition';
  import XgProgPath from './XgProgPath.svelte';
  import _Fun from '../ts/_Fun';

  //property
  export let progName:string;

  /**
   * top button text
   */
  export let topBtnText = '';

  /**
   * onclick top button, 在progName後面可以放一個按鈕
   */
  export let fnOnTopBtn:Function = null;

  let show = true;

  //called by CrudEdit
  export function open(){ show = true; }
  export function close(){ show = false; }

</script>
