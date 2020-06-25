<template>
  <div>
    <input type="file" @change="croppie"/>
    <vue-croppie ref="croppieRef" :enableOrientation="true" :boundary="{ width: 450, height: 300}" :viewport="{ width:400, height:250, 'type':'square' }">
    </vue-croppie>
    <!-- the result -->
    <img :src="cropped">
    <button @click="crop">Crop</button>
    <button @click="h">test</button>
    <!-- <button @click="rotate">Rotate</button> -->
  </div>
</template>

<script>
import Vue from "vue";
import VueCroppie from "vue-croppie";
import 'croppie/croppie.css';

Vue.use(VueCroppie);

export default {
  data() {
    return {
      croppieImage: '',
      cropped: null
    };
  },
  methods: {
    h(){
      console.log(`test`);this.$refs.croppieRef.rotate(90);
    },
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
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
          console.log(this.croppieImage);
        });
      }
    },
    rotate() {
      this.$refs.croppieRef.rotate(90);
    }
};

</script>
