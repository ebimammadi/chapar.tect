<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1 class="mb-3">User list</h1>
        <b-table responsive stacked="sm" striped :items="users" :fields="fields" v-if="users">
          <template v-slot:cell(nameSlot)="data">
            <b-avatar :src="data.value.avatar" />
            {{ data.value.name }}
          </template>

        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ApiService from "@/core/ApiService"

export default {
  data(){
    return {
      usersRaw: [],
      fields: [
        { key: "nameSlot", label: "name" },
        { key: "contact" , label: "Email/Mobile" },  
        "status"
      ]
    }
  },
  created(){
    ApiService.get("/users/user-list")
      .then(response => (this.usersRaw = response.data))
      .catch(error => this.setAlert( { message: `Network Error!` }) && console.log(error) )
  },
  computed: {
    users() {
      if (this.usersRaw.length == 0) return []
      const items = this.usersRaw.map( item => {
        item.status = item.isActive ? 'Active' : 'In-active'
        item.contact = item.email //+ item.mobile
        item.nameSlot = {
          "name": item.name,
          "avatar": item.profilePhotoUrl
          } //''item.name + ` <b-avatar :src=${item.profilePhotoUrl} />`
        return item
      })
      return items
    }
  }
}
</script>