<template>
  <div>
    <b-form-group v-if="!showCropper">
      <b-form-file
        id="file-default"
        :placeholder="placeholder"
        @change="croppie"
      ></b-form-file>
    </b-form-group>
    <div v-if="showCropper" class="float-left">
      <b-button @click="crop" variant="outline-success"
        >Crop & Save Photo</b-button
      >
      <b-button @click="rotate" variant="outline-secondary" class="ml-3"
        >Rotate ⤸</b-button
      >
      <b-button @click="cancel" variant="outline-secondary" class="ml-3"
        >Cancel</b-button
      >
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :enableResize="false"
        :enforceBoundary="true"
        :boundary="{ width: parseInt(width) + boundary, height: parseInt(height) + boundary }"
        :viewport="{ width: width, height: height, type: 'square' }"
        class="mt-3"
      ></vue-croppie>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueCroppie from "vue-croppie"
import "croppie/croppie.css"
Vue.use(VueCroppie)

import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  props: ["width", "height", "crop_width", "crop_height", "unique", "usage", "placeholder", "_id"],
  data() {
    return {
      croppieImage: "",
      cropped: null,
      boundary: 20,
      showCropper: ""
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    rotate() {
      this.$refs.croppieRef.rotate(-90)
    },
    cancel() {
      this.showCropper = false
    },
    croppie(event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files.length) return (this.file = false)
      
      this.showCropper = true 
      const reader = new FileReader()
      reader.onload = event => this.$refs.croppieRef.bind({ url: event.target.result })
      reader.readAsDataURL(files[0])
      //console.log(this.$refs.croppieRef.viewport)
    },
    crop() {
      let options = {
        type: "base64",
        format: "jpeg",
        size: { width: this.crop_width, height: this.crop_height }
      }
      this.$refs.croppieRef.result(options, output => {
        const postPayload = {
          image: output,
          unique: this.unique,
          usage: this.usage,
          _id: this._id || ''
        }
        ApiService.post("/app-files/upload-image", postPayload)
          .then(response => {
            if (response.data.response_type==="success") {
              this.showCropper = false
              this.$emit("url", response.data.url)
              this.$emit("_id", response.data._id)
            }
            else this.setAlert( { message: response.data.message } )
          })
          .catch( error => this.setAlert( { message: error.data.message } ))
      })
    }
  }
}
</script>
