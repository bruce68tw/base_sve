<button {...$$restProps} type='button' class='btn btn-secondary' on:click={()=> fnOnClick()}>
  {label}
  <i class='ico-delete'></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let label = _Locale.br.BtnCancel;
  export let fnOnClick:Function;
</script>