<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <p class="align-center"><logo/></p>
    <h5 class="mt-5 align-center">Terms and Condition Policy</h5>
    <b-form class="mt-4">
      <b-form-group class="mt-20 align-center">
        <p class="align-justify">
          A personal data is any information that can be linked to you as a
          person. The Data Protection Regulation, or GDPR, applies as a law in
          all EU member states from May 25, 2018. GDPR replaces the Swedish
          Personal Data Act PuL. Read more about GDPR at the
          <a
            href="https://www.datainspektionen.se/vagledningar/en-introduktion-till-dataskyddsforordningen/"
            target="_blank"
          >
            Data Inspectorate</a
          >.
          <br />
          Our service uses Cookies. Cookies are small pieces of text used to
          store information on web browsers. Cookies are used to store and
          receive identifiers and other information on computers, phones, and
          other devices. Other technologies, including data we store on your web
          browser or device, identifiers associated with your device, and other
          software, are used for similar purposes. In this policy, we refer to
          all of these technologies as “cookies.”
        </p>
        <p>
          Back to
          <router-link to="/login" class="mt-5">
            Log In
          </router-link>
          or
          <router-link to="/register" class="mt-5">
            Register?
          </router-link>
        </p>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"

export default {
  components: { Logo }
}
</script>
