<!-- 2層功能表 -->
<ul class={'xg-leftmenu' + (show ? '' : ' xg-off')}>
  {#each items || [] as item}
    <li>
      {#if item.Items && item.Items.length}
        <a href={null} on:click={()=> onToggle(item.Name)}>
          <i class={item.Icon}></i>{item.Name}
          <b class='xg-arrow' class:xg-on={item.Name == _name}></b>
        </a>
        {#if item.Name == _name}
          <ul class='xg-leftmenu-sub' transition:slide={_Fun.FadeTime}>
            {#each item.Items as item2}
              <li>
                <a use:link href={item2.Url}>{item2.Name}</a>
              </li>
            {/each}
          </ul>
        {/if}
      {:else}
        <a use:link href={item.Url}>{item.Name}</a>
      {/if}
    </li>
  {/each}
</ul>

<script lang='ts'>
  import { link } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import type MenuDto from '../dto/MenuDto';
  import _Fun from '../ts/_Fun';
  
  //property
  export let show = true;
  export let items:MenuDto[] = [];

  //variables
  let _name = '';

  function onToggle(name:string){
    _name = (_name == name) ? '' : name;
  }
</script>
