<template>
  <div>
    <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
    <!-- <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :boundary="{ width: 300, height: 300}"
        @result="result"
        @update="update">
    </vue-croppie>

    <!-- the result -->
    <!-- <img v-bind:src="cropped">

    <button @click="bind()">Bind</button>
    <!-- Rotate angle is Number -->
    <!-- <button @click="rotate(-90)">Rotate Left</button>
    <button @click="rotate(90)">Rotate Right</button>
    <button @click="crop()">Crop Via Callback</button>
    <button @click="cropViaEvent()">Crop Via Event</button> -->


    <!-- <input type="file" @change="croppie" v-bind:name="file"/> -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      @change="croppie"
    ></b-form-file>
    <div v-if="file">
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :boundary="{ width: 450, height: 300}"
        :viewport="{ width:400, height:250, 'type':'square' }">
      </vue-croppie>
      <!-- the result -->
      <img :src="cropped"><br/>
      <button @click="crop">Crop</button>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import VueCroppie from "vue-croppie";
import 'croppie/croppie.css';

Vue.use(VueCroppie);

export default {
  data() {
    return {
      croppieImage: '',
      cropped: null,
      file: null
    };
  },
  methods: {
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };

    reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: 600, height: 450 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
          console.log(this.croppieImage);
        });
      }
  }
};
// export default {
//   mounted() {
//       // Upon mounting of the component, we accessed the .bind({...})
//       // function to put an initial image on the canvas.
//       this.$refs.croppieRef.bind({
//           url: 'http://i.imgur.com/Fq2DMeH.jpg',
//       })
//   },
//   data() {
//       return {
//           cropped: null,
//           images: [
//               'http://i.imgur.com/fHNtPXX.jpg',
//               'http://i.imgur.com/ecMUngU.jpg',
//               'http://i.imgur.com/7oO6zrh.jpg',
//               'http://i.imgur.com/miVkBH2.jpg'
//           ]
//       }
//   },
//   methods: {
//       bind() {
//           // Randomize cat photos, nothing special here.
//           let url = this.images[Math.floor(Math.random() * 4)]

//           // Just like what we did with .bind({...}) on
//           // the mounted() function above.
//           this.$refs.croppieRef.bind({
//               url: url,
//           });
//       },
//       // CALBACK USAGE
//       crop() {
//           // Here we are getting the result via callback function
//           // and set the result to this.cropped which is being
//           // used to display the result above.
//           let options = {
//               format: 'jpeg',
//               circle: true
//           }
//           this.$refs.croppieRef.result(options, (output) => {
//               this.cropped = output;
//           });
//       },
//       // EVENT USAGE
//       cropViaEvent() {
//         let options = {
//               format: 'png',
//               circle: true
//           }
//           this.$refs.croppieRef.result(options);
//       },
//       result(output) {
//           this.cropped = output;
//       },
//       update(val) {
//           console.log(val);
//       },
//       rotate(rotationAngle) {
//           // Rotates the image
//           this.$refs.croppieRef.rotate(rotationAngle);
//       }
//   }
// }
</script>
