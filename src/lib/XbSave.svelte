<button {...$$restProps} type='button' class='btn btn-primary' on:click={()=> fnOnClick()}>
  {label || _Locale.br.BtnSave}
  <i class='ico-save'></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let label = '';
  export let fnOnClick:Function;
</script>