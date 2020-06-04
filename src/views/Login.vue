<template>
  <b-jumbotron class="enterance-jumbotron" >
    <app-logo />
    <h5 class="mt-5">Login Page</h5>
    <b-form @submit="onSubmit" class="mt-5" >
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>  
      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="password"
        
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>    

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    
    <!-- <b-button variant="primary" href="#">More Info</b-button> -->
  </b-jumbotron>
</template>

<script>
import Store from '@/stores/stores';
import Logo from '@/components/Logo.vue';

export default {
  name: 'login',
  components:{
    'app-logo': Logo
  },
  data(){
    return {
      form : {}
    }
  },
  methods:{
    onSubmit: function(evt) {
      evt.preventDefault()
      console.log('submit is fired')
      //validate 
      //stored
      Store.commit('changeSingInStatus', true)

      //console.log(this.$route.query.redirect)
      //const redirectPath = this.$route.query.redirect || "/";
      this.$router.push("/");
    }
  },
  computed:{
    appName: () => Store.getters.settings.app_name
  }
}
</script>

<style>
.enterance-jumbotron{
  text-align: left;
  max-width:400px;
  margin:20px auto;
}

</style>