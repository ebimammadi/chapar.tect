<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>About this website</h1>
        <div class="mr-0" a>
          <Logo />
        </div>
        <p class="mt-4" >
          You can deliver your product, goods and comodoties in the local neighbourhood, <br/>
          when you can focus on your productions, you can let 'chapar' pickup and deliver your parcels and packages.<br/>
        </p>
        <p class="mt-4">  
          <b-icon-info-circle />
          You can sell your products in this platform, the product should be small in size,<br/>
          like a parcel at most 50cmX50cmX50cm.
        </p>
        <p class="mt-4">  
          <b-icon-info-circle />
          You can use the delivery service if you want to buy from the suppliers in this platform.<br/>
        
        </p>
        <p class="mt-5">  
          This web application is part of a master's thesis for a parcel delivery decision system.<br/>
           For more info visit <router-link :to="'/contact'"> contact us</router-link> us and do not hesitate to ask from us. We come up with smart solutions.
        </p>
        
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Logo from "@/components/Logo.vue"

export default {
  components: { Logo }
}
</script>
