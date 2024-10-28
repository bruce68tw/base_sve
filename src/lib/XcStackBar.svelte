<canvas bind:this={chartCanvas}/>

<script lang='ts'>
    //import { onMount } from 'svelte';
    import type { ColorSetEnum } from '../enum/ColorSetEnum';
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import _Color from '../ts/_Color';  

    import {
      Chart as ChartJs,
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale,
    } from 'chart.js';
  
    ChartJs.register(
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
    );

    export let colorSet:ColorSetEnum;
    export let legends:string[];    
    export let labels:string[];
    export let values:any[];
    export let trans:number[];

    /*
    //let valueLen = values.length;
    let options = {
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      }
    };

    //必須使用$:監聽
    $: data = {
        labels: labels,
        datasets: getData(),
    };
    */

    let chartCanvas: HTMLCanvasElement;

    onMount(() => {
      //let colorSets = _Color.pickColorSets(colorSet, labels.length, [transBg, transBorder]);
      let chart = new Chart(chartCanvas, {
				type: 'bar',
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
				data: {
          labels: labels,
          datasets: getData(),
				}
		  });
    });

    //無法個別指定border color !!
    function getData():any[] {
      if (!labels) return [];

      //顏色數=labels, 色階數=trans 
      let colorSets = _Color.pickColorSets(colorSet, labels.length, trans);
      let datasets:any[] = [];
      //debugger;
      //資料筆數=色階數(已做xy轉換)
      for (let i=0; i<values.length; i++){
        //let cs:string[] = colorSets[i];
        //console.log(cs[valueLen]);
        datasets.push({
          label: legends[i],
          data: values[i],
          borderWidth: 1,
          backgroundColor: colorSets[i],  //colorSets[i]為陣列
          //borderColor: cs[valueLen],
        });
      }

      return datasets;
    }

</script>
