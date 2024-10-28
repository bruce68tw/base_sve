<!-- button link -->
<button {...$$restProps} type="button" class="btn btn-link" on:click={()=> fnOnClick()}>
  <i class="ico-eye" title={_Locale.br.TipView}></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let fnOnClick:Function;
</script>