<!-- 1.horizontal label, not custCss -->
{#if type == 1}
  <div class='row'>
    <div class={clsLabelH} title={prop.labelTip}>
      <XiLabel title={prop.title} required={prop.required} labelTip={prop.labelTip} />
    </div>
    <div class={clsInputH}>
      <slot/>
    </div>
  </div>

<!-- 2.horizontal label && custCss -->
{:else if type == 2}
  <div class={clsLabelH} title={prop.labelTip}>
    <XiLabel title={prop.title} required={prop.required} labelTip={prop.labelTip} />
  </div>
  <div class={clsInputH}>
    <slot/>
  </div>

<!-- 3.vertical label -->
{:else if type == 3}
  <div class={clsV}>
    <XiLabel title={prop.title} required={prop.required} labelTip={prop.labelTip} />
    <slot/>
  </div>

<!-- 4a.inline-block -->
{:else if prop.inBlock}
  <div class='d-inline-block'>
    <slot/>
  </div>
<!-- 4b.no label -->
{:else}
  <slot/>
{/if}

<script lang='ts'>
  import type XiBoxDto from '../dto/XiBoxDto'
  import XiLabel from './XiLabel.svelte'

  //property, 只能以變數傳入, 無法在外部使用inline property
  export let prop:XiBoxDto;

  //variables for template
  //type: 1(H not custCss), 2(H custCss), 3(V), 4(no label)
  const type = (prop.title == '') ? 4 : 
    prop.isHori ? (prop.custCss ? 2 : 1) : 3;
    //(prop.isHori === false) ? 3 : 4;
  const clsV = `col-md-${prop.col1} xg-y`;  //v class
  const clsLabelH = `col-md-${prop.col1}`;  //h label class
  const clsInputH = `col-md-${prop.col2}`;  //h input class
  //const width = (prop.width == '') ? '' : 'width:' + prop.width;
</script>