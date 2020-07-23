<template>
  <b-modal 
    id="mainModal" 
    ref="mainModal"
    @ok="ok"
    @cancel="cancel"
    :title="title" 
    :_id="_id" 
  >
    <p v-html="body"></p>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: { default: "" }, 
    body: { default: "" }, 
    _id: { default: "" } 
  },
  methods: {
    ok(){
      this.$emit('ok',{ _id: this._id })
    },
    cancel() {
      this.$emit('cancel',{ _id: this._is })
    }
  }
}
</script>