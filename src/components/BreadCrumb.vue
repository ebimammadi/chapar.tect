<template>
  <b-breadcrumb :items="items" v-if="items.length"></b-breadcrumb>
</template>

<script>
export default {
  methods: {
    capitalizeName (str, seperator = " ") {
      return str
          .split(seperator)
          .map(
            ([firstChar, ...rest]) =>
              firstChar.toUpperCase() + rest.join("").toLowerCase()
          )
          .join(" ")
    } 
  },
  computed: {
    
    items: function() {
      if (this.$route.path == "/") return {}
      const pathArray = this.$route.path.split("/")
      pathArray.shift()
      if (pathArray[pathArray.length-1] == "") pathArray.pop()//handles the last slash
      
      if (pathArray[0] == "") return {} //on home page nothing to display
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (this.$route.matched[idx] !== undefined){
          let text = ""
          if (this.$route.matched[idx].name === undefined) text = path
          else text = this.$route.matched[idx].name

          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? "/" + breadcrumbArray[idx - 1].path + "/" + path
              : "/" + path,
            text: this.capitalizeName(text)
          })
        }
        return breadcrumbArray
      }, [])
      breadcrumbs.unshift({ text: "Home", to: { name: "home" } })

      // /users/profile/:user
      if ( this.$route.name == "user profile") {
        breadcrumbs.pop()
        const item = `Profile (${this.$route.params.user})`
        breadcrumbs.push({ text: item })
      }
      // /suplier/:slug
      if ( this.$route.name == "supplier public page") {
        breadcrumbs.pop()
        const item = this.capitalizeName(this.$route.params.slug,"-")
        breadcrumbs.push({ text: item })
      }
      // /app/tickets/:ticketId
      if ( this.$route.name == "ticket page") {
        breadcrumbs.pop()
        const item = this.$route.params.ticketId
        breadcrumbs.push({ text: item })
      }
      // /app/products/id/productId
      if ( this.$route.name == "edit product") {
        breadcrumbs.pop()
        const item = this.$route.params.productId
        breadcrumbs.push({ text: item })
      }
      return breadcrumbs
    }
  }
}
</script>
