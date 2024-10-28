<!-- 
  @component
  - (暫未使用) 簡單的 checkbox, 綁定變數內容為 boolean
  - property: checked, label
-->
<label class='xi-check'>
  <input type='checkbox' bind:checked={checked} {disabled}>{label}
  <span class='xi-cspan'/>
</label>

<script lang="ts">
  /**
   * checked status, 必填
   * - 使用 bind 綁定, ex: bind:checked={checks[i]}
   */
  export let checked:boolean;

  export let disabled = false;

  /**
   * checkbox後面顯示文字
   * - default: ''
   */
  export let label:string = '';
</script>