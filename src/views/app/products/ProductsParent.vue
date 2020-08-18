<template>
  <keep-alive>
    <router-view :key="$route.path"/>
  </keep-alive>
</template>
