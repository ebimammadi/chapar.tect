<template>
  <b-container v-if="show">
    <b-row class="mb-3">
      <b-col>
        <h1>{{ pageType }} Product
          <span v-if=" pageType=='Edit'"> 
            Id: {{$route.params._id.slice(0,7)+'...'}}
          </span>
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-12 col-lg-6 mb-3">
        <label for="name">Name</label>
        <b-input-group>
          <b-input id="name" v-model="product.name" placeholder="Enter a name" maxlength="200" @keyup="slugGenerate" debounce="1000"/>
          <b-form-invalid-feedback :state="validateName" v-if=" product.name.length > 0">
            {{validation.name }}
          </b-form-invalid-feedback>
        </b-input-group>
        <label for="description" class="mt-3">Description </label>
        <b-input-group>
          <b-form-textarea id="description" v-model="product.description" placeholder="Enter a short descrption ..." max-rows="12" maxlength="500">
          </b-form-textarea>
          <b-form-valid-feedback :state="(product.description.length>10) && (product.description.length<400)">
            <span>{{ 500 - product.description.length}} character left</span>
          </b-form-valid-feedback>
          <b-form-valid-feedback :state=" product.description.length >= 400 ">
            <span class="float-right">{{ 500 - product.description.length}} character left</span>
          </b-form-valid-feedback>
        </b-input-group>
        <label for="slug" class="mt-3">Slug</label>
        <b-input-group>
          <b-input id="slug" v-model="product.slug" placeholder="Enter a unique slug" maxlength="20" />
          <b-form-invalid-feedback :state="validateSlug">{{ product.slug.length > 0 ? validateSlug : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
        <label for="price" class="mt-3">Price</label>
        <b-input-group>
          <b-input id="price" type="number" v-model="product.price" placeholder="Enter a price" maxlength="20" />
          <b-form-invalid-feedback :state="validatePrice">{{ product.price.length > 0 ? validation.price : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
      <b-col class="col-12 col-lg-6 mb-3">
        <label >Add {{ product.images.length>0 ? 'more' : '' }} photos</label>
        <image-upload
          :_id="product._id"
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
        <div v-for="image in product.images" :key="image" >  
            <img :src="image" class="rounded img-fluid w-100" />
            <b-button @click="deleteImageConfirm(image)" variant="secondary" class="overlay-delete">
              <b-icon-trash/>
            </b-button>
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
import ApiService from "@/core/ApiService"
import ImageUpload from "@/components/ImageUpload.vue"
import ModalConfirm from "@/components/ModalConfirm"
import { productsPageData } from "@/views/app/products/products"

export default {
  props: ["message","response_type"],
  components: {
    ImageUpload, ModalConfirm
  },
  data() {
    return productsPageData
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
            this.product.images = this.product.images.filter(image => image != fileNameKey)
          else this.setAlert({ message: response.data.message }) 
        })
        .catch( error => {
          this.setAlert({ message: error.data.message }) 
        })
    },
    SaveProduct() {
      if (!this.validateName) return this.setAlert(this.validation.name)
      this.slugGenerate() 
      if (!this.validateSlug) return this.setAlert(this.validation.slug)
      if (!this.validatePrice) return this.setAlert(this.validation.price)
      const payload = _.pick(this.product, ["_id","name","description","slug", "price","images"])
      ApiService.post(`/app-products/product-set`, payload)
        .then(response => {
         if (response.data.response_type == 'success') {
            if (this.$route.name == "new product")
              return this.$router.push({ 
                name: 'edit product', 
                params: _.pick( response.data, ['message','response_type', '_id'])
              })
          } 
          this.setAlert( _.pick(response.data, ['message', 'response_type']))
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },   
    imageShow(url){
      this.product.images.push(url)
    },
    idSet(_id) {
      if (this.product._id == '') this.product._id = _id
    },
    slugGenerate() {
      if (this.product.slug.trim() == "") 
        this.product.slug = this.product.name.trim()
          .replace(/[^a-zA-Z ]/g, "")
          .split(" ")
          .map(item => item.toLowerCase().slice(0,2))
          .join("-") + (Math.floor(Math.random() * 100) + 1)
      return this.product.slug
    }
  },
  computed: {
    validateName() {
      if (this.product.name.length>5) return true
      return false
    },
    validateSlug() {
      if (this.product.slug.length == 0) return false
      if (this.product.slug.length > 20) return false
      return true
    },
    validateDescription() {
      if (this.product.description.length>1000) return false
      return true
    },
    validatePrice() {
      if (isNaN(this.product.price)) return false
      return true
    },
    pageType(){
      if (this.$route.name == "edit product") return 'Edit'
      return 'New'
    } 
  },
  mounted() {
    if (this.$route.name == "edit product") {
      this.show = false
      console.log("edit page")
      console.log(this.message)
      if (this.message) {
        console.log(`hieisi`)
          this.messageObject.message = this.message
          this.messageObject.message = this.response_type
      }
      ApiService.get(`/app-products/product-get/${this.$route.params._id}`)
        .then( response => { 
          if (response.data.response_type == "success") {
            this.show = true
            console.log(this)
            this.product = response.data.product
            if (this.messageObject.message) this.setAlert({ ...this.messageObject })
          }
          else this.setAlert({ message: response.data.message }) 
        })
        .catch( error => {
          this.setAlert({ message: error.data.message }) 
        })
    }
    if (this.$route.name == "new product") {
      this.product = {}
      //   _id: '',
      //   name: '',
      //   slug: '',
      //   price: '',
      //   description: '',
      //   features: [],
      //   images: [],
      // }
      this.show = true  
    }
  }
}
</script>

<style scoped>
.overlay-delete {
  position: relative;
  bottom:40px;
  right:10px;
  height: 30px;
  float: right;
}
</style>