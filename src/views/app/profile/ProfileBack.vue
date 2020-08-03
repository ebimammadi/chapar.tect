<template >
  <b-container v-if="this.user.name && this.user.name.length>0">
    <b-row class="mb-3">
      <b-col>
        <img v-if="user.profilePhotoUrl" :src="user.profilePhotoUrl" width="150" class="rounded" />
        <b-button
          v-if="user.profilePhotoUrl"
          @click="deleteImage"
          variant="outline-secondary"
          class="ml-1 mt-1 align-bottom"
          >Remove/Change Photo</b-button
        >
        <image-upload
          v-if="!user.profilePhotoUrl"
          crop_width="400"
          crop_height="400"
          unique="true"
          usage="profile"
          placeholder="Select Profile Photo"
          @url="imageShow"
        >
        </image-upload>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="name">Fullname</label>
        <b-input-group>
          <b-input v-focus id="name" v-model="user.name" placeholder="Enter fullname" />
          <b-form-invalid-feedback :state="validateName">{{ validation.name }}</b-form-invalid-feedback>
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
          <b-button v-if="user.emailVerify" variant="outline-secondary" class="ml-2" disabled>✓</b-button>
          <b-button @click="confirmEmail" v-if="!user.emailVerify" variant="outline-secondary" class="ml-2">
            Confirm Email
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="mobile">Mobile Number </label>
        <b-input-group>
          <b-input id="mobile" disabled v-model="user.mobile" placeholder="Use 'Change Mobile' to set your mobile number" />
          <b-button v-if="user.mobileVerify" variant="outline-secondary" class="ml-2" disabled>✓</b-button>
          <b-button v-if="!user.mobileVerify && user.mobile" @click="confirmMobile" variant="outline-secondary" class="ml-2">
            Verify Mobile
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
          <b-form-invalid-feedback :state="validateUserRole">{{ validation.userRole }}</b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole =='user' && user.mobileVerify && user.emailVerify">
      <b-col>
        <b-button @click="sendSupplierRequestModal"  variant="outline-secondary" 
          v-if="user.userRole =='user' && user.mobileVerify && user.emailVerify && user.supplierRequest.status!='pending'">
          Request to be a supplier ?
        </b-button>
        <div v-if="userRoleInfo.length>0"><b-icon-info-circle/> {{userRoleInfo}}</div>
      </b-col>
    </b-row>
    
    <b-row class="mb-3" >
      <b-col>
        <hr/>
        <a v-b-toggle href="#addresses" @click.prevent>Web and postal addresses</a> 
      </b-col>
    </b-row>
      <b-collapse id="addresses">
        <child-web-addresses :user="user" :validation="validation"/>
      </b-collapse>
    <b-row ><b-col><hr/></b-col></b-row>
    <b-row class="mt-3">
      <b-col>
        <b-button @click="sendProfile" variant="outline-success" class="mr-3 mt-2 mb-2">
          Save Profile
        </b-button>
        <router-link :to="{ name: 'change mobile'}" class="ml-2 mt-2 mb-2 float-right" >
          <b-button to variant="outline-secondary"><b-icon-phone/> Change Mobile</b-button>
        </router-link>
        <router-link :to="{ name: 'change email'}" class="ml-2 mt-2 mb-2 float-right">
          <b-button to variant="outline-secondary"><b-icon-envelope/> Change Email</b-button>
        </router-link>
        <router-link :to="{ name: 'change password'}" class="ml-2 mt-2 mb-2 float-right">
          <b-button variant="outline-secondary"><b-icon-key /> Change Password</b-button>
        </router-link>
      </b-col>
    </b-row>
    <modal-confirm 
      :title="modal.title" 
      :body="modal.body" 
      @ok="handleConfirmOk(modal.function)"
    />
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"
import ImageUpload from "@/components/ImageUpload.vue"
import ModalConfirm from "@/components/ModalConfirm"
import { validateSlug } from "@/core/lib.js"

import ChildWebAddresses from "@/views/app/profile/ProfileChildWebAddresses"

export default {
  data() {
    return {
      modal: { _id: "", title: "", body:"", function:"" },
      user: { urls: { facebook: "", website: "", instagram: "" } },
      validation: {
        userRole: `To become a supplier and start selling, you need to verify you email and mobile number!`,
        name: `Your 'Fullname' should be at least 5 characters, including first name and last name.`,
        slug: `'Slug' should contain only lowercase characters and numbers separated by hyphen (-). 
          For example if the name is 'John Smith Foods' you can use 'john-smith-foods'.`,
        urls: {
          website: `Website Address (URL) format is not valid. It should start with http:// or https://`,
          instagram: `Instagram Address (URL) format is not valid. It should start with https://`,
          facebook: `Facebook Address (URL) format is not valid. It should start with https://`
        }
      }
    }
  },
  components: {
    ImageUpload, ModalConfirm, ChildWebAddresses
  },
  methods: {
    ...mapActions(["setAlert","setProfilePhotoUrl"]),
    handleConfirmOk(function_name) {
      this[function_name](this.modal._id)
    },
    sendSupplierRequestModal(){
      this.modal.title = `Are you sure to become a supplier?`
      this.modal.body = `Please note that, you should comply with the terms (terms link), and keep your page updated.`
      this.modal.function = "sendSupplierRequest"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    sendSupplierRequest(){
      //todo fetch _id from token
      const { _id } = JwtService.decodeToken()
      ApiService.post("/users/send-request-supplier",{ _id } )
        .then(response => {
          this.setAlert({ message: response.data.message, variant: response.data.response_type})
        })
        .catch( error => this.setAlert({ message: `Network Error!` }) && console.log(error))
    },
    confirmMobile() {
      this.modal.title = `Confirm to Send a new code`
      this.modal.body = `Are you sure you want to send a code to this number <b>${this.user.mobile}</b>?`
      this.modal.function = "sendCode"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    sendCode() {
      ApiService.post("/users/send-verification-sms",{ mobile: this.user.mobile } )
        .then(response => {
          if (response.data.response_type == "success"){ 
            this.$router.push({ 
              name: 'verify mobile', 
              params: { message: response.data.message, variant: response.data.response_type }
            })
          }
          this.setAlert({ message: response.data.message})
        })
        .catch( error => this.setAlert({ message: `Network Error!` }) && console.log(error))
    },
    confirmEmail() {
      ApiService.get("/users/send-verification-link")
        .then(response => {
          if (response.data.message)
            return this.setAlert({
              message: response.data.message,
              variant: response.data.response_type
            })
        })
        .catch(
          error =>
            this.setAlert({ message: `Network Error!` }) && console.log(error)
        )
    },
    sendProfile() {
      if (!this.validateName)
        return this.setAlert({ message: this.validation.name })

      if (!this.validateSlug)
        return this.setAlert({ message: this.validation.slug })

      if (!this.validateWebsite)
        return this.setAlert({
          message: this.validation.urls.website
        })
      if (!this.validateFacebook)
        return this.setAlert({
          message: this.validation.urls.facebook
        })
      if (!this.validateInstagram)
        return this.setAlert({
          message: this.validation.urls.instagram
        })

      ApiService.post("/users/profile-set", {
        name: this.user.name,
        slug: this.user.slug,
        urls: this.user.urls
      })
        .then(response => {
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          })
        })
        .catch( error => this.setAlert({ message: `Network Error!` }) && console.log(error))
    },
    imageShow(url) {
      this.user.profilePhotoUrl = url
      this.setProfilePhotoUrl(url)
    },
    deleteImage() {
      const [ , , server, filename] = this.user.profilePhotoUrl.split("/") 
      ApiService.get(`/files/delete-image/${server}/${filename}`)
        .then(() => { 
          this.user.profilePhotoUrl = ""
          this.setProfilePhotoUrl("") 
        })
        .catch( error => {
          this.user.profilePhotoUrl = "" 
          this.setAlert({ message: `Network Error!` }) 
          console.log(error)
        })
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.user = response.data))
      .catch( error =>this.setAlert({ message: `Network Error!` }) && console.log(error))
  },
  computed: {
    userRoleInfo() {
      const dateFormat = (date) => {
        const [ datepart,time ] = date.split('T')
        return datepart + ',' + time.slice(0,5)
      }
      try{
        if (this.user.supplierRequest.status == 'pending' ) 
          return `Supplier request pending, sent at `+ dateFormat(this.user.supplierRequest.date)
        return ''  
      }catch(_){
        return ''
      }

    }, 
    validateName() {
      return (
        this.user.name &&
        this.user.name.length > 5 &&
        this.user.name.split(" ").length > 1
      )
    },
    validateUserRole() {
      return !(this.user.userRole == 'user' && (!this.user.emailVerify || !this.user.mobileVerify ) )
    },
    validateSlug() {
      console.log(`this.user.slug`, this.user.slug)
      if (this.user.slug === undefined) return false
      return (
        this.user.slug &&
        this.user.slug.length > 0 &&
        validateSlug(this.user.slug)
      )
    }
  }
}
</script>
