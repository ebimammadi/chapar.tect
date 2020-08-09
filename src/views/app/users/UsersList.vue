<template>
<!-- <div> -->
  <b-container v-if="usersRaw.perPage">
    <b-row class="mb-3">
      <b-col>
        <h1 class="mb-3">User list</h1>
        <b-form inline class="mb-3">
          <b-pagination
            use-router
            v-model="currentPage"
            :total-rows="usersRaw.count || 0"
            :per-page="usersRaw.perPage"
            class="mb-2 mr-sm-3 mb-sm-0"
          ></b-pagination>
          <b-input 
            v-model="search"
            type="search"
            placeholder="Search name/email"
            class="mb-2 mr-sm-3 mb-sm-0"
            debounce="1000"
          ></b-input>
          <label class="mr-sm-1" for="inline-form-custom-select-pref">Role</label>
          <b-form-select
            v-model="userRole"
            class="mb-2 mr-sm-3 mb-sm-0"
            :options="userRoleOptions"
            :value="null"
          ></b-form-select>
          <div class="mb-2 mr-sm-3 mb-sm-0">Total: <b>{{ usersRaw.count }}</b></div>
        </b-form>
        <div class="table-responsive">
        <b-table 
          striped
          hover
          stacked="sm"
          :items="users"
          :fields="fields"
          :class="'table'"
        >
          <template v-slot:head(logs)>
            <b-icon-list-check v-b-tooltip.hover title="View Recent Logs" />
          </template>   
          <template v-slot:head(profile)>
            <b-icon-person v-b-tooltip.hover title="View User Profile"/>
          </template>       
          <!-- userSlot column -->
          <template v-slot:cell(nameSlot)="data">
            <b-avatar :src="data.item.profilePhotoUrl" />
            {{ data.item.name }}
          </template>
          <!-- userRole column -->
          <template v-slot:cell(userRole)="data">
            {{ data.item.userRole | titleize }}
            <b-button 
              v-if="data.item.userRole == 'user' && data.item.emailVerify  && data.item.mobileVerify " 
              @click="userSetAsSupplierShowConfirm(data.item._id)"
              variant="link"
              size="sm"
              v-b-tooltip.hover title="Set as Supplier"
              >
              <b-icon-pencil />
            </b-button>
            <span
              v-if="data.item.userRole == 'user' && 
                  (!data.item.emailVerify  || !data.item.mobileVerify ) " 
              size="sm"
              v-b-tooltip.hover title="User info incomplete!"
              >
              <b-icon-info-circle />
            </span>
            
            <router-link v-if="data.item.userRole != 'user' "
              variant="primary" 
              v-b-tooltip.hover title="View Store"
              :to="{ name: 'supplier public page', params: { slug: data.item.slug } }"
            >
              <b-icon-shop />                  
            </router-link>
          </template>
          <!-- EmailSlot column -->
          <template v-slot:cell(emailSlot)="data">
            <span v-b-tooltip.hover :title="data.value.emailTooltip">
              {{ data.item.email }} 
              <b-icon-check-all v-if="data.item.emailVerify" variant="success" /> 
              <b-icon-exclamation-circle v-if="!data.item.emailVerify" variant="warning"/> 
            </span> 
          </template>
          <!-- MobileSlot column -->
          <template v-slot:cell(mobileSlot)="data">
            <span v-if="data.item.mobile.length>0" v-b-tooltip.hover :title="data.value.mobileTooltip" >
              {{ data.item.mobile }} 
              <b-icon-check-all v-if="data.item.mobileVerify" variant="success" /> 
              <b-icon-exclamation-circle v-if="!data.item.mobileVerify" variant="warning" /> 
            </span>
          </template>
          <!-- status column -->
          <template v-slot:cell(status)="data">
            {{ data.value.status | titleize }}
            <b-button @click="userActivateShowModal(data.item._id)"
              variant="link"
              size="sm"
              :id="`activation`+ data.item._id" 
              >
              <b-icon-pencil />
            </b-button>
            <b-tooltip :target="`activation`+ data.item._id">
                {{ data.value.status == `Active`? `Suspend User` : `Activate User` | titleize}}
            </b-tooltip>
          </template>
          <template v-slot:cell(date)="data">
            {{ data.item.date | localTimeFormat }} 
          <!-- </template> -->
          <!-- <template v-slot:cell(logs)="data"> -->
            <router-link class="ml-2"
              variant="primary" 
              v-b-tooltip.hover title="View Recent Logs"
              :to="{ name: 'user logs', params: { email: data.item.email } }"
            >
            <b-icon-list-check /> 
            </router-link>
          <!-- </template> -->
          <!-- <template v-slot:cell(profile)="data"> -->
            <router-link class="ml-2"
              variant="primary" 
              v-b-tooltip.hover title="View Profile"
              :to="{ name: 'user profile', params: { user: data.item.email } }"
            >
              <b-icon-person />                  
            </router-link>
          </template>
        </b-table>
        </div>
        <modal-confirm 
          :title="modal.title" 
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
import ApiService from "@/core/ApiService"
import { mapActions } from "vuex"

export default {
  components: {
    ModalConfirm,
  },
  data(){
    return {
      modal: { _id: "", title: "", body:"", function:"" },
      usersRaw: { users: [] },
      fields: [
        { key: "nameSlot", label: "User" },
        { key: "userRole", label: "Role" },
        { key: "emailSlot" , label: "Email" },  
        { key: "mobileSlot" , label: "Mobile" },  
        { key: "status", label: "Status" },
        { key: "date", label: "Reg. Time"},
      ],
      userRoleOptions: [
        { text: 'All User Roles', value: '' }, 
        { text: 'Users', value: 'user' },
        { text: 'Suppliers', value: 'supplier' },
        { text: 'Admins', value: 'admin' }
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    handleConfirmOk(function_name) {
      this[function_name](this.modal._id)
    },
    userActivateToggle(_id){
      const item = this.usersRaw.users.find( item => item._id === _id )
      const request = item.isActive ? '/users/user-suspend' : '/users/user-activate'
      ApiService.post(request, { _id })
        .then(response => {
          this.setAlert({message: response.data.message, variant: response.data.response_type})
          if (response.data.response_type === "success"){
            this.usersRaw.users.map(item => {
              if (item._id === _id) item.isActive = !item.isActive
              return item
            })
          }
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },
    userActivateShowModal(_id){
      const item = this.usersRaw.users.find( item => item._id === _id)
      const action = item.isActive ? `suspend` : `activate`
      this.modal.title = item.isActive ? `Suspend User` : `Activate User`
      this.modal.body = `Are you sure to ${action} the user <b>${item.name} (${item.email})</b>?`
      this.modal._id = _id
      this.modal.function = "userActivateToggle"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    userSetAsSupplier(_id){
      ApiService.post('/users/user-set-role', { _id, userRole: 'supplier' })
        .then(response => {
          this.setAlert({message: response.data.message, variant: response.data.response_type})
          if (response.data.response_type === "success") {
            this.usersRaw.users.map(item => {
              if (item._id === _id) item.userRole = 'supplier'
              return item
            })
          }
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    },
    userSetAsSupplierShowConfirm(_id){
      const item = this.usersRaw.users.find( item => item._id === _id)
      this.modal.title = `Set Role As Supplier`
      this.modal.body = `Are you sure to grant the role 'supplier' to the user <b>${item.name} (${item.email})</b>?
        Please note this action cannot be undone.`
      this.modal._id = _id
      this.modal.function = "userSetAsSupplier"
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    invokeUsers() {
      ApiService.get(`/users/user-list?page=${this.currentPage}&search=${this.search}&userRole=${this.userRole}`)
        .then( response => (this.usersRaw = response.data) )
        .catch( error => this.setAlert( { message: error.data.message } ))
    }
  },
  created(){
    this.invokeUsers()
  },
  computed: {
    users() {
      if (!this.usersRaw.users || this.usersRaw.users.length == 0) return []
      const items = this.usersRaw.users.map( item => {
        item.emailSlot = {
          emailTooltip: item.emailVerify == true ? `Verified Email.` : `Not verified yet!`,
        }
         item.mobileSlot = {
          mobileTooltip: item.mobileVerify == true ? `Verified Mobile.` : `Not verified yet!`,
        }
        item.mobile = item.mobile || ''
        item.status = {
          status: item.isActive ? `Active` : `Suspended`,
          verb: item.isActive ? `Suspend` : `Activate`
        }
        return item
      })
      return items
    },
    currentPage: {
      get() { 
        return this.$route.query.page || 1 
      },
      set(newPage) {
        this.$router.push({ query: { ...this.$route.query, page: newPage }}).catch(()=>{})
        this.invokeUsers()
      }
    },
    search: {
      get() {
        return this.$route.query.search || ''
      },
      set(newSearch) {
        this.$router.push({ query: { ...this.$route.query, search: newSearch }}).catch(()=>{})
        this.invokeUsers()
      }
    },
    userRole: {
      get() {
        return this.$route.query.userRole || ''
      },
      set(newRoleSelected) {
        this.$router.push({ query: { ...this.$route.query, userRole: newRoleSelected }}).catch(()=>{})
        this.invokeUsers()
      }
    }
  },
}
</script>
