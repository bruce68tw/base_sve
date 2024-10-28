<!-- 
  @component
  (非RWD) 分頁查詢結果, 包含 table, sorting, pagination 
  - 加入其他 class name 無作用, 因為 dataTable.css 已經使用 !important.
-->
<table class={"table table-hover dataTable xg-table " + ($$restProps.class || '')} cellspacing="0">
  <thead>
    <tr>
      {#each cols as col,i}
        <XgTh title={col.title} tip={col.tip} extClass={_sortClasses[i]} 
          width={col.width} fnOnClick={()=> onHeaderA(i)} />
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each _rows as row}
      <tr>
        <!-- row -->
        {#each cols as col}
          {@const data = col.render ? col.render(row) : col.data}
        <td>
            {#if col.fid == '_crud'}
              <!-- const 必須在 if 裡面, 否則 error -->
              {#if data.indexOf('U') >= 0}
                <XblEdit fnOnClick={()=> crudR.onUpdateA(row[_kid])} disabled={col.Status != null && !col.Status[0]} />
              {/if}
              {#if data.indexOf('D') >= 0}
                <XblDelete fnOnClick={()=> crudR.onDeleteA(row[_kid])} disabled={col.Status != null && !col.Status[1]} />
              {/if}
              {#if data.indexOf('V') >= 0}
                <button type="button" class="btn btn-link" on:click={()=> crudR.onViewA(row[_kid])} 
                    disabled={col.Status != null && !col.Status[2]}>
                  <i class="ico-eye" title={_Locale.br.TipView}></i>
                </button>
              {/if}
            {:else if col.fid == '_btn'}
              {#if data}
                <button type="button" class="btn btn-outline-secondary btn-sm" on:click={()=> onBtn(data, row)}
                  disabled={col.Status != null && col.Status == false}>{data}</button>
              {/if}

            <!-- todo, 顯示多個按鈕 
            {:else if col.fid == '_btns'}
              {@const data = col.render ? col.render(row) : col.data}
              <button type="button" class="btn btn-link">{col.data}</button>
            -->

            {:else if col.fid == '_link'}
              {#if data}
                <button type="button" class="btn btn-link">{data}</button>
              {/if}
              
            <!-- button(b:名稱), fid(f:欄位名) -->
            {:else if col.fid == '_swap'}
              {@const key2 = data.substring(0,2)}
              {@const val2 = data.substring(2)}
              {#if key2=='b:'}
                <!-- button -->
                <button type="button" class="btn btn-outline-secondary btn-sm" on:click={()=> onBtn(val2, row)}
                  disabled={col.Status != null && col.Status == false}>{val2}</button>
              {:else if key2=='f:'}
                <!-- field -->
                {row[val2]}
              {:else}
                <!-- 直接顯示內容 -->
                {val2}
              {/if}

           sortFid}
              <!-- 一般情形, 會考慮 render 函數是否存在 -->
              {@html col.render ? data : 
                col.fid ? row[col.fid] : ''}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
<XgPager bind:this={_pager} fnOnFetch={fetchPageA}/>

<script lang="ts">
  //import { onMount } from 'svelte';
  import type RitemDto from '../dto/RitemDto';  
  import type CrudRead from '../ts/CrudRead';
  import XgTh from './XgTh.svelte'; 
  import XblDelete from './XblDelete.svelte';
  import XblEdit from './XblUpdate.svelte';
  import XgPager from './XgPager.svelte';
  import _Locale from '../ts/_Locale';
  import _Fun from '../ts/_Fun';
  import _Ajax from '../ts/_Ajax';
  import _Json from '../ts/_Json';
  import _Num from '../ts/_Num';
  import _Str from '../ts/_Str';

  //property
  export let crudR:CrudRead;
  export let cols:RitemDto[];        //result columns array

  /**
   * onclick custom button
   * @param data your define data type
   * @param row row data
   */
  export let fnOnBtn:Function | null = null;
    
  let _pager:XgPager;
  let _rows:any[] = [];

  //for button list in datatable rows
  //let _btns:Array<string>;

  const _colLen = cols.length;
  let _sortClasses:string[] = [];
  for(let i=0; i<_colLen; i++){
    let col = cols[i];
    _sortClasses[i] = col.sortFid ? 'sorting' : '';
    //if(col.fid == '_btns')
    //  _btns = col.data.split(',');
  }

  //instance variables
  let _kid = crudR.getKid();  //key field id
  //let _recordsFiltered = -1;   //<0表示重新計算筆數, 與jQuery同屬性名
  let _findJson = {};
  let _sortCol = -1;    //initial value
  let _sortAsc = true;

  //=== exposed function ===
  export async function findByJsonA(vm:any):Promise<void> {
    _findJson = vm;
    //_recordsFiltered = -1;  //re-count
    await fetchPageA(1, true, true);
  }

  /**
   * reload page, widthd by: 查詢(true)、改變顯示頁數(true)、儲存後更新畫面(false)
   * async void 應只用在最上層的event handler，它無法 catch exception
   */
   export async function reloadA(reCount:boolean):Promise<void> {
    await fetchPageA(_pager.getNowPage(), reCount, reCount);
  }
 
  //=== others ===
  function onBtn(data:string, row:any) {
    fnOnBtn(data, row);
  }

  /*
  //render col content
  function renderCol(col:Ritfidto, row:any):string {
    let value = row[col.Fid];
    return col.Render
      ? col.Render(row) : value;
  }
  */
 
  /**
   * fetch page rows
   * @param page 讀取頁次
   * @param reCount 重新計算筆數
   * @param setPage 更新頁次內容
   * @returns recordsFiltered 表示筆數有變, 否則為0
   */
  async function fetchPageA(page:number, reCount:boolean, setPage:boolean):Promise<void> {
    //如果必須重新計算筆數, 則頁次也要更新
    if (reCount) setPage = true;
    let sort = (_sortCol < 0) 
        ? '' : (_sortAsc ? 'A' : 'D') + cols[_sortCol].sortFid;
    _rows = await _pager.fetchPageA(crudR.ctrl, page, _findJson, sort, reCount, setPage);
    /*
    if (!json) return;
        
    //_pager.nowPage = page;
    _rows = json['data'] || [];
    //const rowCount:number = json.recordsFiltered;
    if (setPage)
      _pager.updatePage(_pager.getFirstPage(), json.recordsFiltered as number);
    */

    /*
    if (_recordsFiltered == rowCount){
      return 0;
    } else {
      _recordsFiltered = rowCount;
      return rowCount;
    }
    */
  }

  //onclick hefidr for sorting
  //class name 配合 bootstrap5 & dataTables
  async function onHeaderA(find:number):Promise<void> {    
    //點擊欄位無排序功能
    if (!_sortClasses[find]) return;

    let sort = false;
    for(let i=0; i<_colLen; i++){
      //欄位無排序功能則skip
      if (!_sortClasses[i]) continue;

      if (i == find){
        //目前要排序的欄位
        if (i == _sortCol){
          //已有排序: A/D 互換
          _sortAsc = !_sortAsc;
          _sortClasses[i] = _sortAsc ? 'sorting sorting_asc' : 'sorting sorting_desc';
        } else {
          //未排序則為fid
          _sortCol = i;
          _sortAsc = true;
          _sortClasses[i] = 'sorting sorting_asc';
        }

        sort = true;
      } else {
        //取消排序
        _sortClasses[i] = 'sorting';        
      }
    }

    //sorting
    if (sort) 
      await fetchPageA(1, false, true);
  }
</script>