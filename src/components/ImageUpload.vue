<template>
  <div>
    <b-form-group label="Choose Profile " label-for="file-default" label-cols-sm="2" v-if="!show">
      <b-form-file id="file-default" @change="croppie"></b-form-file>
    </b-form-group>
    <div v-if="show">
      <b-button @click="crop">Crop & Save</b-button>
      <b-button @click="rotate" class="ml-3">⤸</b-button>
      <b-button @click="cancel" class="ml-3">Cancel</b-button>
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :enableResize="false"
        :enforceBoundary="true"
        :boundary="{ width: width + boundary, height: height + boundary }"
        :viewport="{ width: width, height: height, 'type':'square' }"
        class="mt-3"
      ></vue-croppie>
      <!-- <img :src="cropped"> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCroppie from "vue-croppie";
import "croppie/croppie.css";

import ApiService from "@/core/ApiService";
Vue.use(VueCroppie);

export default {
  props: ["crop_width", "crop_height", "unique", "usage"],
  data() {
    return {
      croppieImage: "",
      cropped: null,
      width: 200,
      height: 200,
      boundary: 40,
      show: ""
    };
  },
  methods: {
    rotate() {
      this.$refs.croppieRef.rotate(-90);
    },
    cancel() {
      this.show = false;
    },
    croppie(event) {
      if (!this.width) this.width = 200;
      if (!this.height) this.height = 200;
      if (!this.boundary) this.boundary = 40;
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return (this.file = false);
      }
      this.show = true; //!this file is useless?
      const reader = new FileReader();
      reader.onload = event => {
        this.$refs.croppieRef.bind({
          url: event.target.result
        });
        //console.log(this.$refs.croppieRef.viewport)
      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      let options = {
        type: "base64",
        format: "jpeg",
        size: { width: this.crop_width, height: this.crop_height }
      };
      this.$refs.croppieRef.result(options, output => {
        //this.cropped = this.croppieImage = output;
        //console.log(this.croppieImage);
        // console.log(`options`, options);
        // console.log(`let's submit this to the backend`);
        const postPayload = {
          image: output,
          unique: this.unique,
          usage: this.usage
        };
        ApiService.post("/files/upload-image", postPayload)
          .then(response => {
            // this.$refs.croppieRef.bind({
            //   url: response.data.url
            // });
            this.show = false;
            this.$emit("url", response.data.url);
          })
          .catch(err => {
            console.log(`error in 'ImageUpload' component`, err);
          });
      });
    }
  },
  rotate() {
    this.$refs.croppieRef.rotate(90);
  }
};
</script>
