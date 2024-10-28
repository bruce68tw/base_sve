<!-- 
  @component
  用在多筆編輯畫面的一行資料, UR表示user-role, 以checkbox形式選取多筆資料的部分
  刪除時子table傳入rowId, 新增時傳入relatId
  必填欄位: label, rows(IdStrExtDto[])
 -->
<div class='row'>
  <div class='col-md-{cls1} xi-label'>{title}</div>
  <div class='col-md-{cls2} xi-input'>
      <table width="100%" border={0} cellspacing="0" cellpadding="0">
          <tbody><tr><td>
              {#each rows as row}
                <XgCheck bind:checked={row.checked} label={row.label} />
              {/each}
          </td></tr></tbody>
      </table>
  </div>
</div>

<script lang="ts">
  import type CheckDto from '../dto/CheckDto';
  import _Check from '../ts/_Check';
  import XgCheck from './XgCheck.svelte';

  export let title:string;
  export let cols:string;

  /**
   * Id:value, Str:顯示文字, Ext:是否checked
   */
  export let rows:CheckDto[];

  let colList = cols.replaceAll(' ','').split(',');
  const cls1 = colList[0];
  const cls2 = colList[1];
  //const cls1 = colList.length >= 1 ? colList[0] : '2';
  //const cls2 = colList.length >= 2 ? colList[1] : '6';

</script>