<!-- 
  @component
  RWD table, 欄位寬度必須額外設定 for 手機模式 !!
 -->
<table class='table xg-table xg-rwd' {...$$restProps} cellspacing="0">
  <thead>
    <tr>
      {#each cols as col}
        <th>{col.title}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows || [] as row}
      <tr>
        {#each cols as col}
          {@const data = col.render ? col.render(row) : col.data}
          <td data-th={col.title+'：'}>
            {#if col.fid == '_btn'}
              {#if data}
                <button type="button" class="btn btn-outline-secondary btn-sm" on:click={()=> onBtn(data, row)}
                  disabled={!col.status}>{data}</button>
              {/if}
            {:else if col.fid == '_link'}
              {#if data}
                <a href={data[1]}>{data[0]}</a>
              {/if}
            {:else}
                {@html col.render ? data : 
                  col.fid ? row[col.fid] : ''}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<script lang="ts">
  import type ColDto from "../dto/ColDto";

  //column title
  export let cols:ColDto[];

  //rows, match fids
  export let rows:any[];

  /**
   * onclick custom button
   * @param data your define data type
   * @param row row data
   */
  export let fnOnBtn:Function | null = null;

  function onBtn(data:string, row:any) {
    if (fnOnBtn) fnOnBtn(data, row);
  }

</script>