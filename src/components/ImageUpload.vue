<template>
  <div>
    <input type="file" @change="croppie"/>
    <div v-if="file">
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :boundary="{ width: 450, height: 300}"
        :viewport="{ width:400, height:250, 'type':'square' }">
      </vue-croppie>
      <img :src="cropped">
      <br/>
      <button @click="rotate">Rotate 90</button>
      <button @click="crop">Crop</button>

    </div>
    <!-- <button @click="rotate">Rotate</button> -->
  </div>
</template>

<script>
import Vue from "vue";
import VueCroppie from "vue-croppie";
import 'croppie/croppie.css';

import ApiService from "@/core/ApiService";
Vue.use(VueCroppie);

export default {
  data() {
    return {
      croppieImage: '',
      cropped: null,
      file: ''
    };
  },
  methods: {
    rotate(){
      console.log(`rotate`);
      this.$refs.croppieRef.rotate(90);
    },
    croppie (event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return this.file = '';

      }
      this.file = '1';
      const reader = new FileReader();
      reader.onload = (event) => {
        this.$refs.croppieRef.bind({
          url: event.target.result
        });
      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: 600, height: 450 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
          //console.log(this.croppieImage);
          console.log(`let's submit this to the backend`)
          ApiService.post('/files/upload',{ image: this.cropped })
            .then(response => {
              console.log(response);
            })
            .catch(err =>{
              console.log(err)
            })
        });
      }
    },
    rotate() {
      this.$refs.croppieRef.rotate(90);
    }
};

</script>
