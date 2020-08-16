//TODO it should be updated
<template>
  <b-container v-if="productsRaw.perPage">
    <b-row class="mb-3">
      <b-col>
        <h1>Products List 
          <span class="float-right small">
          <router-link :to="{ name: 'new product'}">New Product </router-link>
          </span>
        </h1>
        <b-form inline class="mb-3">
          <b-pagination
            use-router
            v-model="currentPage"
            :total-rows="productsRaw.count || 0"
            :per-page="productsRaw.perPage"
            class="mb-2 mr-sm-3 mb-sm-0"
          ></b-pagination>
          <b-input 
            v-model="search"
            type="search"
            placeholder="Search subject"
            class="mb-2 mr-sm-3 mb-sm-0"
            debounce="1000"
          ></b-input>
          <label class="mr-sm-1" for="inline-form-custom-select-pref">Publish Status</label>
          <b-form-select
            v-model="publishStatus"
            class="mb-2 mr-sm-3 mb-sm-0"
            :options="publishStatusOptions"
            :value="null"
          ></b-form-select>
          <div class="mb-2 mr-sm-3 mb-sm-0">Total: <b>{{ productsRaw.count }}</b></div>
        </b-form>
        <b-table 
          responsive
          striped
          hover
          stacked="sm"
          :items="products"
          :fields="fields"
          :class="'table'"
        >
          <template v-slot:cell(name)="data">
            {{ data.item.name | titleize}} <router-link
              variant="primary" 
              v-b-tooltip.hover title="View Ticket Details"
              :to="{ name: 'edit product', params: { productId: data.item._id } }"
            >
            {{ data.item.slug }}</router-link>
            {{ data.item.description.slice(0,10)+'...' | titleize}} 
          </template>
          <template v-slot:cell(ownerId)="data">
            {{ data.item.ownerSlug | titleize}} 
          </template>
          <template v-slot:cell(publishStatus)="data">
            {{ data.item.publishStatus.toString() | titleize}} 
            <b-button @click="productPublishModal(data.item._id)"
              variant="link"
              size="sm"
              :id="`publish`+ data.item._id" 
              >
              <b-icon-pencil />
            </b-button>
            <b-button @click="productDeleteModal(data.item._id)"
              variant="danger link"
              size="sm"
              :id="`delete`+ data.item._id" 
              >
              <b-icon-trash />
            </b-button>
            <b-tooltip :target="`publish`+ data.item._id">
              {{ data.item.publishStatus.toString() == `true`? `Suspend product` : `Publish product` }}
            </b-tooltip>
            <b-tooltip :target="`delete`+ data.item._id">
              Delete product
            </b-tooltip>
          </template>
          <template v-slot:cell(date)="data">
            {{ data.item.date | localTimeFormat }} 
          </template>
          
        </b-table>
        <modal-confirm :title="modal.title" 
          :body="modal.body" 
          :_id="modal._id" 
          @ok="handleConfirmOk(modal.function)"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalConfirm from "@/components/ModalConfirm"
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  components: {
    ModalConfirm,
  },
  data(){
    return {
      modal: { _id: "", title: "", body:"", function:"" },
      productsRaw: { products: [] },
      fields: [
        { key: "name" , label: "Product" },  
        { key: "ownerId", label: "Supplier" },
        { key: "publishStatus" , label: "Published" },  
        { key: "date", label: "Date" },
      ],
      publishStatusOptions: [
        { text: 'All', value: '' }, 
        { text: 'Published', value: 'true' },
        { text: 'Unpublished', value: 'false' },
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    handleConfirmOk(function_name) {
      this[function_name](this.modal._id)
    },
    productPublishModal(_id) {
      const item = this.productsRaw.products.find( item => item._id === _id)
      const action = item.publishStatus.toString() == 'true' ? `suspend` : `publish`
      this.modal.title = item.publishStatus.toString() == 'true' ? `Suspend Product` : `Publish Product`
      this.modal.body = `Are you sure to ${action} the product <b>${item.name} (${item.slug})</b>?`
      this.modal._id = _id
      this.modal.function = "productPublish"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    }, 
    productPublish(){
      const _id = this.modal._id
      const item = this.productsRaw.products.find( item => item._id === _id )
      const request = item.publishStatus.toString() == 'true' ? '/app-products/product-suspend' : '/app-products/product-publish'
      ApiService.post(request, { _id })
        .then(response => {
          this.setAlert({message: response.data.message, variant: response.data.response_type})
          if (response.data.response_type === "success"){
            this.productsRaw.products.map(item => {
              if (item._id === _id) item.publishStatus = ! (item.publishStatus.toString() == 'true')
              return item
            })
          }
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },
    productDeleteModal(_id) {
      const item = this.productsRaw.products.find( item => item._id === _id)
      this.modal.title = `Delete Product`
      this.modal.body = `Are you sure to delete the product <b>${item.name} (${item.slug})</b>?<br/>
        Note: The product won't be available no longer, and this process cannot be undone.`
      this.modal._id = _id
      this.modal.function = "productDelete"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    }, 
    productDelete(){
      const _id = this.modal._id
      ApiService.post('/app-products/product-delete', { _id })
        .then(response => {
          this.setAlert({message: response.data.message, variant: response.data.response_type})
          if (response.data.response_type === "success"){
            this.productsRaw.products.map(item => {
              if (item._id === _id) return item
            })
          }
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },
    invokeProducts() {
      this.productsRaw.perPage = null
      ApiService.get(`/app-products/product-list?page=${this.currentPage}&search=${this.search}&publishStatus=${this.publishStatus}`)
      .then(response => this.productsRaw = response.data )
      .catch( error => this.setAlert({ message: error.data.message }) )      
    }
  },
  created() {
    this.invokeProducts()
  },
  computed: {
    products() {
      return this.productsRaw.products
    },
    currentPage: {
      get() { 
        return this.$route.query.page || 1 
      },
      set(newPage) {
        this.$router.push({ query: { ...this.$route.query, page: newPage }}).catch(()=>{})
        this.invokeProducts()
      }
    },
    search: {
      get() {
        return this.$route.query.search || ''
      },
      set(newSearch) {
        this.$router.push({ query: { ...this.$route.query, search: newSearch }}).catch(()=>{})
        this.invokeProducts()
      }
    },
    publishStatus: {
      get() {
        return this.$route.query.publishStatus || ''
      },
      set(newStatus) {
        this.$router.push({ query: { ...this.$route.query, publishStatus: newStatus  }}).catch(()=>{})
        this.invokeProducts()
      }
    },
  }
}
</script>
