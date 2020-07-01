<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <img v-if="profile_url" :src="profile_url" width="150"/>{{user.profilePhotoUrl}}
        <b-button v-if="profile_url" @click="deleteImage" variant="danger">Remove</b-button>
        <image-upload
          crop_width="800"
          crop_height="800"
          unique="true"
          usage="profile"
          @url="imageShow"
        ></image-upload>
        <br>
        <router-link to="/profile/address">address</router-link><br/><br/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Fullname">
          <b-form-input v-model="user.name" type="text" placeholder="Enter email"></b-form-input>
        </b-form-group>
        <b-form-group label="Email address">
          <b-form-input
            v-model="user.email"
            type="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ApiService from '@/core/ApiService';
import Store from "@/stores/stores";

import ImageUpload from "@/components/ImageUpload.vue";

export default {
  data(){
    return {
      profile_url: '',
      user: null
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
        if (!err.status)
          Store.commit('changeMessage', 'Network Error!');
      });
    }
  },
  created() {
    console.log('yes')
    ApiService.get('/users/profile-get')
    .then( response => {
      //console.log(response.data)
      console.log(response.data.profilePhotoUrl)

      this.profile_url = response.data.proflePhotoUrl;
      this.user = response.data;
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
}
</script>
