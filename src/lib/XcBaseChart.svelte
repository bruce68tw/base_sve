<!-- 
  所有統計圖表的基礎類別
  設定 legend position 會出現warning, but work fine !! 
-->
<canvas bind:this={chartCanvas}></canvas>

<script lang='ts'>
    import type { ColorSetEnum } from '../enum/ColorSetEnum';
    import { Chart } from 'chart.js';
    //import { Pie } from 'svelte-chartjs';
    import _Color from '../ts/_Color';
    import { onMount } from 'svelte';

    /*
    import {
      Chart as ChartJs,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJs.register(
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    );
    */
    export let chartType:string;

    /*
    //export let title:string;
    export let colorSet:ColorSetEnum;
    export let legendPos = 'top';
    export let legends:string[];
    export let values:number[];
    export let transBg:number = 0.7;
    export let transHover:number = 1;
      */

    let chartCanvas: HTMLCanvasElement;

    //注意: 設定 legend position 會出現warning, but work fine !!
    /*
    let options = {
      responsive:true,
      plugins: {
        legend: { position: legendPos },
      }
    };
  
    $: data = {
      labels: legends,
      datasets: [getData()],
    };
    */

    onMount(() => {
      var chart = new Chart(chartCanvas, {
				type: 'line',
				data: {
						//labels: chartLabels,
						datasets: [{
								label: 'Revenue',
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: [],//chartValues
						}]
				}
		  });
    });

    /*
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
    */
</script>
