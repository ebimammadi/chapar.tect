<template>
  <div>
    <b-row class="mb-3" v-if="user.userRole !='user'">
        <b-col>
          <label for="slug">Slug (your shop short-name at our pages)</label>
          <b-input-group>
            <b-input id="slug" type="text" v-model="user.slug" placeholder="Enter Slug" />
            <b-form-invalid-feedback :state="validateSlug"> {{ validation.slug }} </b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3" v-if="user.userRole !='user'">
        <b-col>
          <label for="website">Website Address</label>
          <b-input-group>
            <b-input id="website" type="url" v-model="user.urls.website" placeholder="Enter Website Address" />
            <b-form-invalid-feedback :state="validateWebsite"> {{ validation.urls.website }} </b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3" v-if="user.userRole !='user'">
        <b-col>
          <label for="facebook">Facebook Address</label>
          <b-input-group>
            <b-input id="facebook" type="url" v-model="user.urls.facebook" placeholder="Enter Facebook Page"/>
            <b-form-invalid-feedback :state="validateFacebook">
              {{ validation.urls.facebook }}
            </b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3" v-if="user.userRole !='user'">
        <b-col>
          <label for="instagram">Instagram Address</label>
          <b-input-group>
            <b-input id="instagram" type="url" v-model="user.urls.instagram" placeholder="Enter Instagram Page" />
            <b-form-invalid-feedback :state="validateInstagram">{{ validation.urls.instagram }}</b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3" >
        <b-col>
          <router-link :to="{ name: 'address' }" class="float-right">
              Add/Edit Postal Addresses
          </router-link>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { validateURL, validateSlug } from "@/core/lib.js"

export default{
  props: [ 'user','validation'],
  computed:{
    validateWebsite() {
      const url = this.user.urls.website
      return url.length == 0 || validateURL(url)
    },
    validateFacebook() {
      const url = this.user.urls.facebook
      return url.length == 0 || validateURL(url)
    },
    validateInstagram() {
      const url = this.user.urls.instagram
      return url.length == 0 || validateURL(url)
    },
    validateSlug() {
      if (this.user.slug === undefined) return false
      return (
        this.user.slug &&
        this.user.slug.length > 0 &&
        validateSlug(this.user.slug)
      )
    }
  }
}

</script>