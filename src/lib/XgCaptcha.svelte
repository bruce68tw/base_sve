<img src={`${_AjaxBase.apiUrl}${action}?${key}`} alt='Captcha' {width} {height}/>
<i class='ico-reset' on:click={()=> key++} style='font-size:24px; vertical-align:middle;'/>


<script lang="ts">
  //import { onMount } from 'svelte';
  import _Locale from '../ts/_Locale';
  import _AjaxBase from '../ts/_AjaxBase';

  export let action:string;
  export let width:string;
  export let height:string;
  //export let fnOnClick:Function;

  let key = 0;
</script>