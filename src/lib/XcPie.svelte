<!-- 設定 legend position 會出現warning, but work fine !! -->
<canvas bind:this={chartCanvas}/>

<script lang='ts'>
    import type { ColorSetEnum } from '../enum/ColorSetEnum';
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import _Color from '../ts/_Color';
    
    //export let title:string;
    export let colorSet:ColorSetEnum;
    //export let legendPos = 'top';
    export let legends:string[];
    export let values:number[];
    export let transBg:number = 0.7;
    export let transHover:number = 1;
        
    let chartCanvas: HTMLCanvasElement;

    onMount(() => {
      let chart = new Chart(chartCanvas, {
				type: 'pie',
        options: {
          responsive: true,
          plugins: {
            //設定 legend position 會出現warning, but work fine !!
            legend: { position: 'top' },
            //legend: { position: legendPos },
          },
        },
				data: {
          labels: legends,
          datasets: [getData()],
				}
		  });
    });

    function getData():any {
      if (!legends) return {};
      
      let colorSets = _Color.pickColorSets(colorSet, legends.length, [transBg, transHover]);
      return {
          //label: 'test',
          data: values,
          borderWidth: 1,
          backgroundColor: colorSets[0],
          hoverBackgroundColor: colorSets[1],
      };
    }
</script>
