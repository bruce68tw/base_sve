<!-- alert -->
{#if _showAlert}
<div id='xgAlert' transition:fade={{delay:500}} class='alert alert-success alert-dismissable'>
  <button type='button' class='btn-close' on:click={()=> _showAlert=false}></button>
  <span>{_alertText}</span>
</div>
{/if}

<!-- msg -->
{#if _showMsg}
<div class='modal xg-modal xg-msg'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='btn-close' on:click={onCloseMsg}></button>
            </div>
            <div class='modal-body'>
                <p>{_msgText}</p>
            </div>
            <div class='modal-footer'>
                <button type='button' class='btn btn-primary xd-close' on:click={onCloseMsg}>{_Locale.br.BtnClose}</button>
            </div>
        </div>
    </div>
</div>
{/if}

<!-- ans -->
{#if _showAns}
<div class='modal xg-modal xg-msg'>
  <div class='modal-dialog' role='document'>
      <div class='modal-content'>
          <div class='modal-header'>
              <button type='button' class='btn-close' on:click={()=> _showAns=false}></button>
          </div>
          <div class='modal-body'>
              <p>{_msgText}</p>
          </div>
          <div class='modal-footer'>
              <button type='button' class='btn btn-secondary' on:click={onAnsNo}>{_Locale.br.BtnCancel}</button>
              <button type='button' class='btn btn-primary' on:click={onAnsYes}>{_Locale.br.BtnYes}</button>
          </div>
      </div>
  </div>
</div>
{/if}

<!-- textarea(many lines) editor 
<div id='xgArea' class='modal fade xg-modal' data-backdrop='static' data-keyboard='false'>
  <div class='modal-dialog' role='document'>
      <div class='modal-content'>
          <div class='modal-header'>
              <h4 class='modal-title'></h4>
              <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' style='padding:10px 10px;'></button>
          </div>
          <div class='modal-body'>
              <textarea value='' style='width:100%' rows='8' maxlength='1000' class='form-control' aria-invalid='false'>
              </textarea>
          </div>
          <div class='modal-footer'>
              <button type='button' class='btn btn-secondary xd-cancel' data-bs-dismiss='modal'>{baseR.BtnCancel}</button>
              <button type='button' class='btn btn-primary xd-yes' onclick='_tool.onAreaYes()'>{baseR.BtnYes}</button>
          </div>
      </div>
  </div>
</div>
-->

<!-- show image -->
{#if _showImage}
  <div id='xgImage' class='modal'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <div class='modal-body' style='margin:auto;'>
              <img src={_imageUrl} alt='show image' />
            </div>
            <div class='modal-footer justify-content-between'>
                <div>{_imageName}</div>
                <button type='button' class='btn btn-primary xd-close' on:click={()=> _showImage=false}>{_Locale.br.BtnClose}</button>
            </div>
        </div>
    </div>
  </div>
{/if}

<!-- waiting -->
{#if _showWait}
  <div class='xg-wait'>
    <div>Waiting...</div>
  </div>
{/if}

<script lang='ts'>
  import { fade } from 'svelte/transition';
  import _Locale from "../ts/_Locale";
  import _File from '../ts/_File';

  let _showAlert = false;
  let _showMsg = false;
  let _showAns = false;
  let _showWait = false;
  let _fnOnAnsYes:Function;  //共用
  let _fnOnAnsNo:Function;   //共用
  let _msgText = '';         //共用
  let _alertText = '';
  //const self = arguments[0]

  //image
  let _showImage = false;
  let _imageName = '';
  let _imageUrl = '';

  //alert
  export function alert(text:string){
    _alertText = text;
    _showAlert = true;
    setTimeout(() => {
      _showAlert = false;
    }, 3000);
  }

  //msg
  export function msg(text:string){
    _msgText = text;
    _showMsg = true;
  }

  //ans
  export function ans(text:string, fnOnYes:Function, fnOnNo?:Function){
    _msgText = text;
    _fnOnAnsYes = fnOnYes;
    _fnOnAnsNo = fnOnNo;
    _showAns = true;
  }

  export function showWait(){ _showWait = true; }
  export function hideWait(){ _showWait = false; }

  export function showImage(url:string, imageName:string){ 
    _imageUrl = url;
    _imageName = imageName;
    _showImage = true; 
  }

  function onAnsYes(){
    _showAns = false;
    _fnOnAnsYes();
  }
  function onAnsNo(){
    _showAns = false;
    if (_fnOnAnsNo) _fnOnAnsNo();
  }

  //close
  //function onCloseAlert(){ _showAlert = false; }
  function onCloseMsg(){ _showMsg = false; }
  //function onCloseAns(){ _showAns = false; }
  //function onCloseImage(){ _showImage = false; }
  //function onCloseWait(){ _showWait = false; }

</script>