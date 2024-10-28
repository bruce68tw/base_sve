<!-- 
  @component
  - 簡單的 radio button, 綁定變數內容為value欄位
  - property: value, checked(false), label('')
-->
<label class='xi-check'>
  <input type='radio' {name} {value} bind:group>{label}
  <span class='xi-rspan'/>
</label>

<script lang="ts">
  //import { onMount } from "svelte";

  /**
   * 注意: 必須使用双向 bind, ex: bind:value={xxx}
   */
  export let value:string;

  /**
   * checked status, default: false
   */
  //export let checked = false;
  export let group = null;

  export let name:string;

  /**
   * checkbox後面顯示文字
   * - default: ''
   */
  export let label:string = '';

  /*
  //keep initial value
  let valueInit:string;
  onMount(()=> {
    valueInit = value;
    if (!checked) value = '-' + value;
  });

  //如果沒有勾選則在value前面加上'-'做區別, 配合 _Check.isChecked()
  //有勾選保持欄位保持原本內容, 方便資料複製
  function onClick(){
    checked = !checked;  //checked此時尚未更新!!
    value = checked ? valueInit : ('-' + valueInit);
  }
  */

</script>