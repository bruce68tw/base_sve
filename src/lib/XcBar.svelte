<canvas bind:this={chartCanvas}/>

<script lang='ts'>
    import type { ColorSetEnum } from '../enum/ColorSetEnum';
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import _Color from '../ts/_Color';  

    //export let title:string;
    export let colorSet:ColorSetEnum;
    export let labels:string[];
    export let values:number[];
    export let transBg:number = 0.7;
    export let transBorder:number = 1;

	  let chartCanvas: HTMLCanvasElement;

    onMount(() => {
      let colorSets = _Color.pickColorSets(colorSet, labels.length, [transBg, transBorder]);
      let chart = new Chart(chartCanvas, {
				type: 'bar',
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
				data: {
          labels: labels,
          datasets: [{
              borderWidth: 1,
              backgroundColor: colorSets[0],
              borderColor: colorSets[1],
              data: values
          }]
				}
		  });
    });
</script>
