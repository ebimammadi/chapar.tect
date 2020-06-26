<template>
  <div>
    <h1>Profile</h1>
    <img v-if="profile_url" :src="profile_url" width="200"/>
    <image-upload
      crop_width="800"
      crop_height="800"
      unique="true"
      usage="profile"
      @url="imageShow"
    ></image-upload>
  <br>
  </div>
</template>

<script>
// import ApiService from '@/core/ApiService';
// import Store from "@/stores/stores";

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
