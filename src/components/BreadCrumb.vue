<template>
  <b-breadcrumb :items="items" v-if="items.length"></b-breadcrumb>
</template>

<script>
export default {
  computed: {
    items: function() {
      const capitalize = str =>
        str
          .split(" ")
          .map(
            ([firstChar, ...rest]) =>
              firstChar.toUpperCase() + rest.join("").toLowerCase()
          )
          .join(" ")
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
            text: capitalize(text)
          })
        }
        return breadcrumbArray
      }, [])
      breadcrumbs.unshift({ text: "Home", to: { name: "home" } })
      return breadcrumbs
    }
  }
}
</script>
