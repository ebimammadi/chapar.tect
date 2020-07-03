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
      if (pathArray[0] == "") return {}; //on home page nothing to display
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        let text = "";
        if (this.$route.matched[idx].name === undefined) text = path;
        else text = this.$route.matched[idx].name;

        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: capitalize(text)
        });
        return breadcrumbArray;
      }, []);
      breadcrumbs.unshift({ text: "Home", to: { name: "home" } });
      return breadcrumbs;
    }
  }
};
</script>
