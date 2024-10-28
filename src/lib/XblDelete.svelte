<!-- button link -->
<button {...$$restProps} type="button" class="btn btn-link" on:click={()=> fnOnClick()}>
  <i class="ico-delete" title={_Locale.br.TipDelete}></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let fnOnClick:Function;
</script>