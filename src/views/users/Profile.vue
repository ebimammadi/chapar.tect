<template>
  <div>
    <h1>Profile</h1>
    <!-- <input name="name" placeholder="File Name" />
    <input type="file" name="name" placeholder="File Name" /> -->
    <!-- Styled -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
  <br>
  </div>
</template>

<script>
// import ApiService from '@/core/ApiService';
// import Store from "@/stores/stores";

export default {
  methods: {

  },
  data(){
    return {
      file: null
    }
  },
  created() {
    return console.log('yes')
    // ApiService.get('/about')
    // .then( response => {
    //   Store.commit('changeMessage',`${response.data.message}`);
    //   Store.commit('changeVariant','success');
    // })
    // .catch( err => {
    //   console.log(err)
    //   console.log('error in about/validate page')
    //   if (!err.status)
    //     Store.commit('changeMessage', 'Network Error!');
    // }).finally(function(){
    //   //test
    //   //Store.commit('changeOverlayShow', false);
    // });

  }
}
</script>
