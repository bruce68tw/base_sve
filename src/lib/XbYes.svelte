<button {...$$restProps} type='button' class='btn btn-primary' on:click={()=> fnOnClick()}>
  {label}
  <i class='ico-checked'></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let label = _Locale.br.BtnYes;
  export let fnOnClick:Function;
</script>