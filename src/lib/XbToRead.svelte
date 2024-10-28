<button {...$$restProps} type='button' class='btn btn-secondary' on:click={()=> fnOnClick()}>
  {_Locale.br.BtnToRead}
  <i class='ico-back'></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let fnOnClick:Function;
</script>