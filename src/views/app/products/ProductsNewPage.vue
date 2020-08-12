<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>New Product</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-12 col-lg-6 mb-3">
        <label for="name">Name</label>
        <b-input-group>
          <b-input id="name" v-model="name" placeholder="Enter a name" />
          <b-form-invalid-feedback :state="validateName">{{ name.length > 0 ? validateName : "" }}
          </b-form-invalid-feedback>
        </b-input-group>

        <label for="slug" class="mt-3">Slug</label>
        <b-input-group>
          <b-input id="slug" v-model="slug" placeholder="Enter a name" />
          <b-form-invalid-feedback :state="validateSlug">{{ slug.length > 0 ? validateSlug : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
      <b-col class="col-12 col-lg-6 mb-3">
        <span v-if="images.length>0" >
          <img  v-for="image in images" :key="image" :src="image" width="600" class="rounded" />
          <!-- <b-button
            v-if="user.profilePhotoUrl"
            @click="deleteImageConfirm"
            variant="outline-secondary"
            class="ml-1 mt-1 align-bottom"
            >Remove/Change Photo</b-button
          > -->
        </span>
        <label v-if="!images.length">Photos</label>
        <image-upload
          v-if="!images.length"
          crop_width="800"
          crop_height="400"
          unique="false"
          usage="product"
          placeholder="Add Product Photo"
          @url="imageShow"
        >
        </image-upload>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="mt-2">
          <b-button @click="AddProduct" variant="outline-success" class="mr-3 mt-2 mb-2">
            Add Product
          </b-button>
        </div>
      </b-col>
    </b-row>
    <modal-confirm :title="modal.title" :body="modal.body" @ok="handleConfirmOk(modal.function)" />
  </b-container>
</template>

<script>
import _ from "lodash"
import { mapActions } from "vuex"
// import { validateSlug } from "@/core/lib.js"
import ApiService from "@/core/ApiService"
import ImageUpload from "@/components/ImageUpload.vue"
import ModalConfirm from "@/components/ModalConfirm"

export default {
   components: {
    ImageUpload, ModalConfirm
  },
  data() {
    return {
      modal: { _id: "", title: "", body:"", function:"" },
      productId: '',
      name: '',
      slug: '',
      discription: '',
      features: [],
      images: [],
      validation: {
        name: 'Your note is very short ...',
        slug: 'Your note is very short ...',
        discription: 'Your note is very short ...',
        features: 'Your note is very short ...',
        images: 'Your note is very short ...',
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    AddProduct() {
      if (!this.validateName) return this.setAlert(this.validation.name)
      if (!this.validateSlug) return this.setAlert(this.validation.slug)
      //todo add select user for ownerEmail
      //const { _id } = JwtService.decodeToken()
      const payload = {
        name: this.name,
        slug: this.slug,
        description: this.description,
        _id: this.productId,
        text: this.updateText
      }
      ApiService.post(`/app-products/product-add`, payload)
        .then(response => {
         if (response.data.response_type == 'success') {
           // redirect to the ticket page
           return this.$router.push({ 
              name: 'ticket page', 
              params: _.pick( response.data, ['message','response_type', 'ticketId'])
            })
         } 
         this.setAlert( _.pick(response.data, ['message', 'response_type']))
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },   
    imageShow(url){
      this.images.push(url)
    }
  },
  computed: {
    validateName() {
      if (this.name.length>10) return true
      return false
    },
    validateSlug() {
      if (this.slug.length>10) return true
      return false
    },
    validateDescription() {
      if (this.description.length>5) return true
      return false
    }
  }
}
</script>
