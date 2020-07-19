<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
    <h1>Page Not Found!</h1>
    <b-button variant="outline-primary mt-5">
      <router-link to="/">
        Home
      </router-link>
    </b-button>
    <br /><br />
    <b-button variant="outline-primary" @click="$router.go(-1)"
      >Go Back</b-button
    >
      </b-col>
    </b-row>
  </b-container>
</template>
