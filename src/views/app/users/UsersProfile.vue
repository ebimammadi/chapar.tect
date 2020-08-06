<template>
  <b-container v-if="user.email">
    <b-row class="mb-3">
      <b-col>
        <img
          v-if="user.profilePhotoUrl"
          :src="user.profilePhotoUrl"
          width="150" class="rounded"
        />
        <b-avatar v-if="!user.profilePhotoUrl" size="lg" rounded="sm"/>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="name">Fullname</label>
        <b-input-group>
          <b-input
            v-focus
            id="name"
            v-model="user.name"
            type="text" 
            placeholder="Enter fullname"
            disabled
          ></b-input>
        </b-input-group>
      </b-col>
    </b-row> 
    <b-row>
      <b-col>
        <hr/>
      </b-col>
    </b-row>
     <b-row class="mb-3">
      <b-col>
        <label for="email">Username (Email)</label>
        <b-input-group>
          <b-input id="email" disabled v-model="user.email" type="email" placeholder="Enter email address" />
          <b-button v-if="user.emailVerify" variant="outline-secondary" class="ml-2" disabled>
            <b-icon-check-all/>
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="mobile">Mobile Number </label>
        <b-input-group>
          <b-input id="mobile" disabled v-model="user.mobile" placeholder="-" />
          <b-button v-if="user.mobileVerify" variant="outline-secondary" class="ml-2" disabled>
            <b-icon-check-all/>
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="user-role">Access Role</label>
        <b-input-group>
          <b-input id="user-role" v-model="user.userRole" type="text" disabled/>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole =='user' && user.mobileVerify && user.emailVerify">
      <b-col>
        <div v-if="userRoleInfo.length>0"><b-icon-info-circle/> {{userRoleInfo}}</div>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row class="mb-3" >
      <b-col>
        <label for="slug">Slug</label>
        <b-input-group>
          <b-input
            id="slug"
            type="text"
            v-model="user.slug"
            disabled
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="website">Website Address</label>
        <b-input-group>
          <b-input
            id="website"
            v-model="user.urls.website"
            disabled
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" >
      <b-col>
        <label for="facebook">Facebook Address</label>
        <b-input-group>
          <b-input
            id="facebook"
            v-model="user.urls.facebook"
            disabled
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" >
      <b-col>
        <label for="instagram">Instagram Address</label>
        <b-input-group>
          <b-input
            id="instagram"
            v-model="user.urls.instagram"
            disabled
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  data() {
    return {
      user: { urls: { facebook: "", website: "", instagram: "" } },
      
    }
  },
  methods: {
    ...mapActions(["setAlert","setProfilePhotoUrl"]),
    imageShow(url) {
      this.user.profilePhotoUrl = url
      this.setProfilePhotoUrl(url)
    }
  },
  created() {
    ApiService.get(`/users/profile-get-by-email/${this.$route.params.user}`)
      .then(response => (this.user = response.data))
      .catch( error => this.setAlert( { message: error.data.message } ))
  },
  computed: {
    userRoleInfo() {
      const dateFormat = (date) => {
        const [ datePart,time ] = date.split('T')
        return datePart + ',' + time.slice(0,5)
      }
      try{
        if (this.user.roleStatus.status == 'pending' ) 
          return `Supplier request pending, sent at `+ dateFormat(this.user.roleStatus.date)
        return ''  
      }catch(_){
        return ''
      }
    }, 
  }
}
</script>

<style scoped>
#user-role {
  text-transform: capitalize;
}
</style>
