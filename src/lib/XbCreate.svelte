<!-- CRUD 新增按鈕 -->
<button {...$$restProps} type='button' class='btn btn-success' on:click={()=> fnOnClick()}>
  {label}
  <i class='ico-plus'></i>
</button>

<script lang="ts">
  import _Locale from '../ts/_Locale';

  export let label = _Locale.br.BtnCreate;
  export let fnOnClick:Function;
</script>