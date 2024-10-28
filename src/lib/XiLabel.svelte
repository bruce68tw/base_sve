<div class='xi-label' title={labelTip}>
  {#if required}
    <span class='xg-require'>*</span>
  {/if}
  {title}
  {#if labelTip}
    <i class='ico-info'></i>
  {/if}
</div>

<script lang='ts'>
  //property
  export let title:string;
  export let labelTip:string = '';
  export let required:boolean = false;

</script>