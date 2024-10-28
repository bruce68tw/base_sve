<!-- 
  @component
  分頁元件, 包含左邊筆數欄位、文字和右邊頁次按鈕
-->

<!-- pagination -->
{#if _dto.pageCount > 0}
  <div class="xg-pager">
    <!-- left: rows info -->
    <label>
      {_Locale.br.PerPageRows}
      <select bind:value={pageRows} class='form-select' on:change={()=> fnOnFetch(1, true, true)}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      {_perPageRows2Text}
    </label>

    <!-- right: pagination -->
    <nav aria-label="Navigate results">
      <ul class="pagination justify-content-end xg-pager">
        <li class="page-item"><a on:click={onFirstA} class="page-link" href={null}>|&lt;</a></li>
        <li class="page-item"><a on:click={onPrevA} class="page-link" href={null}>&lt;</a></li>
        {#each _dto.pageNos as page}
          <li class={'page-item' + (_dto.nowPage == page ? ' active' : '')}>
            <a on:click={()=> userOnPageA(page, false)} class="page-link" href={null}>{page}</a>
          </li>
        {/each}
        <li class="page-item"><a on:click={onNextA} class="page-link" href={null}>&gt;</a></li>
        <li class="page-item"><a on:click={onLastA} class="page-link" href={null}>&gt;|</a></li>
      </ul>
    </nav>
  </div>
{/if}

<script lang="ts">
  //import { onMount } from 'svelte';
  import type EasyDtDto from '../dto/EasyDtDto';
  import _Locale from '../ts/_Locale';
  import _Fun from '../ts/_Fun';
  import _Ajax from '../ts/_Ajax';
  import _Json from '../ts/_Json';
  import _Num from '../ts/_Num';
  import _Str from '../ts/_Str';
  import _Device from '../ts/_Device';

  /**
   * 傳入pageNo:number, reCount:boolean, setPage:boolean
   * return Promise<void>
   */
  export let fnOnFetch:Function;

  export let pageRows = 10;     //rows count per page
  export let pageShow = 10;     //page amount showed
  export let pageShowMobile = 5;     //page amount showed for mobile

  let _pageShow = _Device.isMobile() ? pageShowMobile : pageShow;

  /**
   * onclick custom button
   * @param data your define data type
   * @param row row data
   */
  //export let fnOnBtn:Function = null;
    
  //instance變數較多, 前面加底線做區別
  let _dto = { 
    nowPage: 1,     //current page no, initial
    firstPage: 1,   //screen first page no, initial
    lastPage: 0,    //screen last page no
    pageNos: [1],   //[firstPage..lastPage], declare不能用空[]
    pageNosLen: 0,  //pageNos.length, fetchRows()會重新設定
    pageCount: 0,   //filtered page count
    recordsFiltered: -1,  //initial -1 表示重新讀取筆數, refer jQuery DataTables
  };

  //instance variables
  //const _perPageRows2 = _Locale.br.PerPageRows2;
  let _perPageRows2Text = '';

  export function getNowPage():number {
    return _dto.nowPage;
  }
  export function getFirstPage():number {
    return _dto.firstPage;
  }

  function isPageChange(page:number) {
    return (_dto.nowPage != page);
  }

  export async function fetchPageA(ctrl:string, page:number, findJson:any, sort:string, 
      reCount:boolean, setPage:boolean, block=false):Promise<any[]> {
        
    //get datatable input params
    let easyDt:EasyDtDto = {
      start: (page - 1) * pageRows,
      length: pageRows,
      recordsFiltered: reCount ? -1 : _dto.recordsFiltered,
      findJson: _Json.toStr(findJson),
      sort: sort,
    };

    //ajax call & load rows
    let json = await _Ajax.getJsonA(`/${ctrl}/GetPage`, true, easyDt, block);
    if (!json) return [];
        
    //_pager.nowPage = page;
    //const rowCount:number = json.recordsFiltered;
    if (setPage)
      updatePage(_dto.firstPage, json.recordsFiltered as number);

    return json['data'] || [];
  }

  //set firstPage,lastPage,pageList by firstPage, pageList.length
  export function updatePage(firstPage:number, recordsFiltered:number) {
    _dto.pageCount = (recordsFiltered % pageRows == 0)
        ? recordsFiltered / pageRows
        : Math.trunc(recordsFiltered / pageRows) + 1;
    _dto.pageNosLen = (_dto.pageCount <= _pageShow)
        ? _dto.pageCount : _pageShow;

    let pageNos:number[] = [];
    for(let i=0; i<_dto.pageNosLen; i++){
      pageNos[i] = firstPage + i;
    }
    _dto.firstPage = firstPage;
    _dto.lastPage = pageNos[_dto.pageNosLen];
    _dto.pageNos = pageNos;
    _dto.recordsFiltered = recordsFiltered;

    //左下方頁數文字
    const firstRow = (_dto.nowPage - 1) * pageRows + 1;
    _perPageRows2Text = _Str.format(_Locale.br.PerPageRows2, 
      firstRow, _Num.min(firstRow + pageRows - 1, recordsFiltered), recordsFiltered
    );
  }

  async function userOnPageA(page:number, setPage:boolean):Promise<void> {
    if (isPageChange(page)) 
      await fnOnFetch(page, false, setPage);

    /*
    let count = 
    if (count > 0 && setPage) 
      updatePage(_dto.firstPage, count);
      */
  }

  //=== onclick pager button below ===
  async function onFirstA():Promise<void> {
    _dto.firstPage = 1;
    await userOnPageA(1, true);
    //const page = 1;
    //if (isPageChange(page)) await onPageA(page);
  }

  async function onLastA():Promise<void> {
    _dto.firstPage = 1;
    await userOnPageA(_dto.pageCount, true);
    /*
    const page = _dto.pageCount;
    if (isPageChange(page)){
      //setPageDto(page - _page.pageNosLen + 1);
      await onPageA(page);
    }
    */
  }

  async function onPrevA():Promise<void> {
    const page = _dto.nowPage - 1;
    if (page > 1)
      await userOnPageA(page, true);
    /*
    const page = _dto.nowPage - 1;
    if (page > 1){
      //if (page == _page.pageNos[0])
      //  setPageDto(page);

      await onPageA(page);
    }
    */
  }

  async function onNextA():Promise<void> {
    const page = _dto.nowPage + 1;
    if (page < _dto.pageCount)
      await userOnPageA(page, true);
    /*
    const page = _dto.nowPage + 1;
    if (page < _dto.pageCount){
      if (page == _dto.pageNos[_dto.pageNosLen])
        updatePage(page);

      await onPageA(page);
    }
    */
  }

</script>