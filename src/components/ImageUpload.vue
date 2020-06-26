<template>
  <div>
    <input v-if="!show" type="file" @change="croppie" />
    <div v-if="show">
      <button @click="crop">Crop & Save</button>
      <button @click="rotate">Rotate 90</button>
      <button @click="cancel">Cancel</button>
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :enableResize="false"
        :enforceBoundary="true"
        :boundary="{ width: width + boundary, height: height + boundary }"
        :viewport="{ width: width, height: height, 'type':'square' }">
      </vue-croppie>
      <!-- <img :src="cropped"> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCroppie from "vue-croppie";
import 'croppie/croppie.css';

import ApiService from "@/core/ApiService";
Vue.use(VueCroppie);

export default {
  props: [ 'crop_width','crop_height', 'unique', 'usage'],
  data() {
    return {
      croppieImage: '',
      cropped: null,
      width: 200,
      height: 200,
      boundary: 40,
      show: ''
    };
  },
  methods: {
    rotate(){

      this.$refs.croppieRef.rotate(90);
    },
    cancel(){
      this.show = false;
    },
    croppie (event) {
      if (!this.width) this.width = 200
      if (!this.height) this.height = 200;
      if (!this.boundary) this.boundary = 40;
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return this.file = false;
      }
      this.show = true;//!this file is useless?
      const reader = new FileReader();
      reader.onload = (event) => {
        //const width = 4000;
        //const height = 4000;
        //this.$refs.croppieRef.viewport ={ width, height }
        //this.$refs.croppieRef.viewport ={ width: width+20, height:height+20 }
        this.$refs.croppieRef.bind({
          url: event.target.result,
        });
        console.log(this.$refs.croppieRef.viewport)

      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: this.crop_width, height: this.crop_height },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        //this.cropped = this.croppieImage = output;
        //console.log(this.croppieImage);
        console.log(`let's submit this to the backend`,output)
        ApiService.post('/files/upload-image',{ image: this.cropped, unique: this.unique, usage: this.usage })
          .then(response => {
            // this.$refs.croppieRef.bind({
            //   url: response.data.url
            // });
            this.show = false;
            this.$emit('url', response.data.url);

          })
          .catch(err =>{
            console.log(`error in uploading`,err)
          })
        });
      }
    },
    rotate() {
      this.$refs.croppieRef.rotate(90);
    }
};

</script>
