<template>
  <b-breadcrumb :items="items" v-if="items.length"></b-breadcrumb>
</template>

<script>
export default {
  computed: {
    items: function() {
      const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
      const pathArray = this.$route.path.split("/");
      pathArray.shift();
      if (pathArray[0] == "") return {};//on home page nothing to display
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        let text = '';
        if (this.$route.matched[idx].name === undefined)  text = path;
        else text = this.$route.matched[idx].name;

        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: capitalize(text),
        });
        return breadcrumbArray;
      }, [])
      breadcrumbs.unshift({ text: 'Home', to: {name: 'home'}})
      return breadcrumbs;
      // const breadcrumb = [];
      // if (pathArray.length == 1 && pathArray[0] == "") return breadcrumb;//!no need to add home
      // //console.log(`patharray:`,pathArray)

      // for (let i = 0; i<pathArray.length; i++ ) {
      //   //console.log('look');
      //   //console.log(this.$route.matched[i])
      //   if (this.$route.matched[0]){
      //     let item = {};
      //     const route = this.$route.matched[i];
      //     console.log(this.$route.matched[0].children);
      //     if (this.$route.matched[0].children != null) {
      //       console.error('yes');
      //     }
      //     if (('children' in route) ){
      //       console.log(this.$route.matched[0].children)
      //       item = {
      //         text: capitalize(this.$route.matched[i]),
      //         to: { name: this.$route.matched[i].name },
      //       };
      //     }
      //     else
      //       item = {
      //         text: capitalize(this.$route.matched[i].name),
      //         to: { name: this.$route.matched[i].name },
      //       };
      //       if (i == pathArray.length-1) { item.active = true; item.to = null }
      //       breadcrumb.push(item)
      //   }

      // }
      // breadcrumb.unshift({ text: 'Home', to: {name: 'home'}})
      // //console.log(`breadcrumb`,breadcrumb)
      // return breadcrumb;
    }
  }
};
</script>
