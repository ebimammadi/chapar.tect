<template v-if="user.length>0">
  <b-container>
    <b-row class="mb-3">
      <b-col >
        <img v-if="user.profilePhotoUrl" :src="user.profilePhotoUrl" width="150"/>
        <b-button v-if="user.profilePhotoUrl" @click="deleteImage" variant="outline-secondary" class="ml-1 mt-1 align-bottom">Remove/Change Photo</b-button>
        <image-upload
          v-if="!user.profilePhotoUrl"
          crop_width="800"
          crop_height="800"
          unique="true"
          usage="profile"
          placeholder="Select Profile Photo"
          @url="imageShow">
        </image-upload>
      </b-col><b-col></b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-input-group>
          <label for="name">Fullname</label>
          <b-input-group>
            <b-input id="name" v-model="user.name" type="text" placeholder="Enter fullname"></b-input>
          </b-input-group>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="email">Username</label>
        <b-input-group>
          <b-input id="email" disabled v-model="user.email" type="email" placeholder="Enter email address"></b-input>
          <b-button v-if="user.emailVerify" variant="outline-secondary" class="ml-2" disabled>Verified ✓</b-button>
          <b-button v-if="user.emailVerify" variant="outline-secondary" class="ml-2" @click="changeEmail">Change</b-button>
          <b-button v-if="!user.emailVerify" variant="outline-secondary" class="ml-2" @click="changeEmail">Verify email?</b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="phone">Mobile</label>
        <b-input-group>
          <b-input id="phone" disabled v-model="user.mobile" type="text"  placeholder="Enter mobile number"  ></b-input>
          <b-button v-if="user.mobileVerify" variant="outline-secondary" class="ml-2" disabled>Verified ✓</b-button>
          <b-button v-if="user.mobileVerify" variant="outline-secondary" class="ml-2" @click="changeEmail">Change</b-button>
          <b-button v-if="!user.mobileVerify && user.mobile" variant="outline-secondary" class="ml-2" @click="changeEmail">Verify Mobile?</b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="website">Website Address</label>
        <b-input-group>
          <b-input id="website" v-model="user.urls.facebook" placeholder="Enter Website Address" >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="facebook">Facebook Address</label>
        <b-input-group>
          <b-input id="facebook" v-model="user.urls.facebook" placeholder="Enter Facebook Page" >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="instagram">Instagram Address</label>
        <b-input-group>
          <b-input id="instagram" v-model="user.urls.instagram" placeholder="Enter Instagram Page" >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-button @click="sendProfile" variant="outline-success">Save changes</b-button>
        <router-link to="/profile/address" class="float-right">
          <b-button to variant="outline-secondary">
            Add/Edit Addresses
          </b-button>
        </router-link>
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
      user: { urls: {} }
    }
  },
  components: {
    ImageUpload
  },
  methods: {
    sendProfile(){
      if (this.user.name.length<5)  return Store.commit('changeAlert', 'Name is very short.', 'warning');
      if (this.user.name.length<5)  return Store.commit('changeAlert', 'Name is very short.', 'warning');
    },
    changeEmail(){

    },
    imageShow(url){
      this.user.profilePhotoUrl = url;
    },
    deleteImage(){
      const pathArr = this.user.profilePhotoUrl.split('/');
      ApiService.get(`/files/delete-image/${pathArr[pathArr.length-2]}/${pathArr[pathArr.length-1]}`)
      .then( () => {
        this.user.profilePhotoUrl = '';
      })
      .catch( err => {
        console.log(err)
        if (!err.status) Store.commit('changeMessage', 'Network Error!');
      });
    }
  },
  created() {
    ApiService.get('/users/profile-get')
      .then( response => {
        this.user = response.data
        })
      .catch( err => {
        console.log(err)
        if (!err.status) Store.commit('changeMessage', 'Network Error!');
      });
  },
  computed: {
    emailVerify: function() {
      if (this.user.emailVerify) return `<b-button variant="outline-success">verified</b-button>`;
      return ''
    }
  }
}
</script>

<style scoped>
[b-row] {
  margin-bottom: 50px;;
}
</style>
