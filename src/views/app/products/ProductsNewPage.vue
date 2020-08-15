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
          <b-input id="name" v-model="name" placeholder="Enter a name" maxlength="200" @keyup="slugGenerate" debounce="1000"/>
          <b-form-invalid-feedback :state="validateName" v-if= " name.length > 0">{{validation.name }}
          </b-form-invalid-feedback>
        </b-input-group>
        
        <label for="description" class="mt-3">Description </label>
        <b-input-group>
          <b-form-textarea id="description" v-model="description" placeholder="Enter a short descrption ..." max-rows="12" maxlength="500">
          </b-form-textarea>
          <b-form-valid-feedback :state="(description.length>10) && (description.length<400)">
            <span>{{ 500 - description.length}} character left</span>
          </b-form-valid-feedback>
          <b-form-valid-feedback :state=" description.length >= 400 ">
            <span class="float-right">{{ 500 - description.length}} character left</span>
          </b-form-valid-feedback>
        </b-input-group>
        
        <label for="slug" class="mt-3">Slug</label>
        <b-input-group>
          <b-input id="slug" v-model="slug" placeholder="Enter a name" maxlength="20" />
          <b-form-invalid-feedback :state="validateSlug">{{ slug.length > 0 ? validateSlug : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
      <b-col class="col-12 col-lg-6 mb-3">
        <label >Add {{ images.length>0 ? 'more' : '' }} photos</label>
        <image-upload
          :_id="productId"
          width="400"
          height="200"
          crop_width="800"
          crop_height="400"
          unique=""
          usage="product"
          placeholder="Add Product Photo"
          @url="imageShow" @_id="idSet"
        >
        </image-upload>
        <div v-if="images.length>0"  >
          <span v-for="image in images" :key="image" >  
          <img  :src="image" class="rounded img-fluid w-100" />
          <b-button 
            @click="deleteImageConfirm(image)"
            variant="secondary"
            class="overlay-delete"
            >
            <b-icon-trash/>
          </b-button>
          </span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="mt-2">
          <b-button @click="SaveProduct" variant="outline-success" class="mr-3 mt-2 mb-2">
            Save Product
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
      description: '',
      features: [],
      images: [],
      validation: {
        name: `Your 'Name' is very short`,
        slug: 'Your note is very short ...',
        description: 'Your note is very short ...',
        features: 'Your note is very short ...',
        images: 'Your note is very short ...',
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    handleConfirmOk(function_name) {
      this[function_name](this.modal._id)
    },
    deleteImageConfirm(filename) {
      this.modal.title = `Are you sure to delete this photo? It cannot be undone.`
      this.modal.body = `<img src="${filename}" class="img-fluid w-100" />`
      this.modal._id =  filename
      this.modal.function = "deleteImage"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    deleteImage() {
      const fileNameKey = this.modal._id
      const [ , , server, filename] = fileNameKey.split("/")
      ApiService.get(`/app-files/delete-image/${server}/${filename}`)
        .then( response => { 
          if (response.data.response_type == "success") 
            this.images = this.images.filter(image => image != fileNameKey)
          else this.setAlert({ message: response.data.message }) 
        })
        .catch( error => {
          this.setAlert({ message: error.data.message }) 
        })
    },
    SaveProduct() {
      if (!this.validateName) return this.setAlert(this.validation.name)
      if (this.slug.trim() == "") this.slug = this.name.trim().split(" ").map(item => item.toLowerCase().slice(0,2)).join("-") + (Math.floor(Math.random() * 100) + 1)
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
      ApiService.post(`/app-products/product-set`, payload)
        .then(response => {
         if (response.data.response_type == 'success') {
            if (this.$route.name == "new product")
            return this.$router.push({ 
              name: 'edit product', 
              params: _.pick( response.data, ['message','response_type', 'productId'])
            })
         } 
         this.setAlert( _.pick(response.data, ['message', 'response_type']))
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },   
    imageShow(url){
      this.images.push(url)
    },
    idSet(_id) {
      if (this.productId == '') this.productId = _id
    },
    slugGenerate() {
      if (this.slug.length > 4) return 
      console.log(this.name.trim().split(" ").map(item => item.toLowerCase().slice(0,2)).join("-"))
      if (this.name.length>0) this.slug = this.name.trim().split(" ").map(item => item.toLowerCase().slice(0,2)).join("-")
      else this.slug = ""
    }
  },
  computed: {
    validateName() {
      if (this.name.length>5) return true
      return false
    },
    validateSlug() {
      if (this.slug.length == 0) return false
      if (this.slug.length > 20) return false
      return true
    },
    validateDescription() {
      if (this.description.length>1000) return false
      return true
    }
  },
  created(){
    if (this.$route.name == "edit product")
    ApiService.get(`/app-products/product-get/${this.$route.params.productId}`)
        .then( response => { 
          if (response.data.response_type == "success") {
            this.productId = response.data.product._id
            this.name = response.data.product.name
            this.slug = response.data.product.slug
            this.description = response.data.product.description
            this.images = response.data.product.images
            this.features = response.data.product.features
          }
          else this.setAlert({ message: response.data.message }) 
        })
        .catch( error => {
          this.setAlert({ message: error.data.message }) 
        })
    console.log(this.$route)
    //this.invokeUsers()
  },
}
</script>

<style scoped>
.overlay-delete {
   position:absolute;
    bottom:10px;
    right:25px;
    height:30px;
}
</style>