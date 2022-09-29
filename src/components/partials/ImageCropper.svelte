<script lang="ts">
  import Cropper from 'svelte-easy-crop'
  import { Button } from '../elements/';
  import { v4 as uuidv4 } from 'uuid';
  import getCroppedImg from '../../cropperUtils';

  export let value: any;
  let crop = { x: 0, y: 0 }
  let zoom = 1
  let cropActive = false;
  let imageCropped = false;
  let image, fileinput, pixelCrop;
  const id = uuidv4()

  const onFileSelected = (e) => {
	  let imageFile = e.target.files[0];
	  let reader = new FileReader();
	  reader.onload = e => {
	    image = e.target.result;
	  };
	  reader.readAsDataURL(imageFile);
    cropActive = true;
	}

  const openCropper = () => {
    document.getElementById(id).click();
  };

  const closeCropper = () => {
    cropActive = false;
  };

  const previewCrop = (e) => {
	  pixelCrop = e.detail.pixels;
	}


  const useImage = async () => {
	  const croppedImage = await getCroppedImg(image, pixelCrop);
    console.log(croppedImage)
    value = croppedImage;
    cropActive = false;
    imageCropped = true;
  };

</script>

<div class="imgContainer">
  {#if cropActive}
    <div>
      <div class="cropperContainer">
        <Cropper
          {image}
          bind:crop
          bind:zoom
          on:cropcomplete={previewCrop}
          aspect={16/9}
        />
      </div>
      <Button 
        text="use_image"
        onClick={useImage}
        />
      <Button 
        text="go_back"
        className="basic_btn"
        onClick={closeCropper}
        />
    </div>
  {/if}

  {#if !cropActive}
    <div class="imgPlaceholder">
      {#if imageCropped}
      <img src={value} alt="Preview" title="Preview" />
      {/if}

      {#if !imageCropped}
        {#if value}
        <img src={value} alt="Preview" title="Preview" />
        {/if}

        {#if !value}
          <img src={'/assets/images/placeholder.png'} alt="Preview" title="Preview" />
        {/if}
      
      {/if}
    </div>

    <Button 
      text="change_image"
      onClick={openCropper}
    />
      <input 
        id={id}
        type="file" 
        accept=".jpg, .jpeg, .png" 
        on:change={(e)=>onFileSelected(e)} 
        bind:this={fileinput} 
        style="display:none"
      >
  {/if}
</div>

<style type="text/scss">
  .cropperContainer {
    position: relative;
    width: 100%;
    height: 300px;

    :global(.btn) {

    }
  }

  .imgContainer {
    :global(.btn) {
      width: 100%;
      background-color: #444;
    }
  }

  .imgPlaceholder {
    background-color: #eee;
    min-width: 200px;
    height: 253px;
    display: flex;

    img {
      height: 253px;
      margin: auto;
    }
  }
</style>
