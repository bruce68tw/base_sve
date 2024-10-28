<canvas bind:this={chartCanvas}/>

<script lang='ts'>
    import type { ColorSetEnum } from '../enum/ColorSetEnum';
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import _Color from '../ts/_Color';  

    export let colorSet:ColorSetEnum;
    export let legends:string[];
    export let labels:string[];
    //n個數字陣列
    export let values:any[];
    //line,hover
    export let transLine:number = 0.7;
    export let transHover:number = 1;
    
    let chartCanvas: HTMLCanvasElement;

    onMount(() => {
      let chart = new Chart(chartCanvas, {
				type: 'line',
        options: {
          responsive: true,
        },
				data: {
          labels: labels,   //x座標文字
          datasets: getData(),
				}
		  });
    });

    function getData():any[] {
      if (values == null) return [];
      
      let count = values.length;
      let colorSets = _Color.pickColorSets(colorSet, count, [transLine, transHover]);
      let cs1:string[] = colorSets[0];
      let cs2:string[] = colorSets[1];
      let datasets:any[] = [];
      for (let i=0; i<count; i++){
        //let title = titles[i];
        //debugger;

        datasets.push({
          label: legends[i],  //圖例文字
          data: values[i],
          fill: true,
          lineTension: 0.3,
          backgroundColor: cs1[i],
          borderColor: cs1[i],
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: cs1[i],
          pointBackgroundColor: cs1[i],
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: cs2[i],
          pointHoverBorderColor: cs2[i],
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        });
      }

      return datasets;
    }
</script>
