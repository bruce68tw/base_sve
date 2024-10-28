<div class='xg-prog-path' class:d-inline={block}>{list}</div>

<script lang="ts">
  import { onMount } from 'svelte'

  //property
  export let names:Array<string>;
  export let block = false;

  let list = '';

  onMount(()=> {
    list = names[0];
    for (var i=1; i< names.length; i++)
        list += " / " + names[i];
	});


</script>