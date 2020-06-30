<template>
  <div>
    <h1>Profile</h1>
    <img v-if="profile_url" :src="profile_url" width="200"/>
    <b-button v-if="profile_url" @click="deleteImage" variant="danger">Button</b-button>
    <b-button v-if="profile_url" @click="deleteImage" class="mt-2" >Remove</b-button>
    <image-upload
      crop_width="800"
      crop_height="800"
      unique="true"
      usage="profile"
      @url="imageShow"
    ></image-upload>
  <br>
  <router-link to="/profile/address">address</router-link>
  </div>
</template>

<script>
import ApiService from '@/core/ApiService';
import Store from "@/stores/stores";

import ImageUpload from "@/components/ImageUpload.vue";

export default {
  data(){
    return {
      profile_url: ''
    }
  },
  components: {
    ImageUpload
  },
  methods: {
    imageShow(url){
      this.profile_url = url;
      console.log(url)
    },
    deleteImage(){
      const pathArr = this.profile_url.split('/');
      const path = `/${pathArr[pathArr.length-2]}/${pathArr[pathArr.length-1]}`
      console.log(`/files/delete-image${path}`);
      ApiService.get(`/files/delete-image${path}`)
      .then( response => {
        Store.commit('changeMessage',`${response.data.message}`);
        Store.commit('changeVariant','success');
        this.profile_url = '';
      })
      .catch( err => {
        console.log(err)
        console.log('error in about/validate page')
        if (!err.status)
          Store.commit('changeMessage', 'Network Error!');
      }).finally(function(){
        //test
        //Store.commit('changeOverlayShow', false);
      });
    }
  },
  created() {
    return console.log('yes')
    // ApiService.get('/about')
    // .then( response => {
    //   Store.commit('changeMessage',`${response.data.message}`);
    //   Store.commit('changeVariant','success');
    // })
    // .catch( err => {
    //   console.log(err)
    //   console.log('error in about/validate page')
    //   if (!err.status)
    //     Store.commit('changeMessage', 'Network Error!');
    // }).finally(function(){
    //   //test
    //   //Store.commit('changeOverlayShow', false);
    // });

  }
}
</script>
