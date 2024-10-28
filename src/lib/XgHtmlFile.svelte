{@html html}

<script lang='ts'>
    import { onMount } from "svelte";
    import _Html from "../ts/_Html";
    //import _Xp from "@/ts/_Xp";

    export let path:string;

    let html = '';

    onMount(async()=> { 
        //await _Xp.initA();
        html = await _Html.loadHtml(path);
    });    

</script>