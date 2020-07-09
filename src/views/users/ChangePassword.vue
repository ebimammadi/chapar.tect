<template>
  <b-container>
    <b-row class="mb-3">
      <label for="new-password">New Password</label>
      <b-input-group>
        <b-input
          id="new-password"
          v-model="newPassword"
          type="password"
          placeholder="Enter new password"
        ></b-input>
        <b-form-invalid-feedback :state="validateNewPassword"
          >{{ newPassword.length > 0 ? validation.newPassword : "" }}
        </b-form-invalid-feedback>
      </b-input-group>
    </b-row>
    <b-row class="mb-3">
      <label for="confirm-password">Confirm New Password</label>
      <b-input-group>
        <b-input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm new password"
        ></b-input>
        <b-form-invalid-feedback :state="validateConfirmPassword"
          >{{ validation.confirmPassword }}
        </b-form-invalid-feedback>
      </b-input-group>
    </b-row>
    <b-row class="mb-3">
      <label for="password">Current Password</label>
      <b-input-group>
        <b-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your current password"
        ></b-input>
        <b-form-invalid-feedback :state="validatePassword"
          >{{ password.length > 0 ? validation.password : "" }}
        </b-form-invalid-feedback>
      </b-input-group>
    </b-row>
    <b-row>
      <b-button
        variant="outline-success"
        class="float-right"
        @click="changePassword"
        >Save New Password
      </b-button>
      <router-link to="/profile" class="ml-2 float-right">
        <b-button to variant="outline-secondary">
          Back to Profile
        </b-button>
      </router-link>
    </b-row>
  </b-container>
</template>

<script>
import { validate } from "secure-password-validator";
import { mapActions } from "vuex";
import ApiService from "@/core/ApiService";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      password: "",
      validation: {
        newPassword: `The 'New Password' should be at least 8 characters, with
          at least one lowercase, uppercase, number and special character.`,
        confirmPassword: `'Confirm New Password' Should match the new password`,
        password: `Current password is required.`
      }
    };
  },
  methods: {
    ...mapActions(["setAlert"]),
    changePassword() {
      if (!this.validateNewPassword)
        return this.setAlert({ message: this.validation.newPassword });
      if (!this.validateConfirmPassword)
        return this.setAlert({ message: this.validation.confirmPassword });
      if (!this.validatePassword)
        return this.setAlert({ message: this.validation.password });

      ApiService.post("/users/password-set", {
        newPassword: this.newPassword,
        password: this.password
      })
        .then(response => {
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          });
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.newPassword = this.confirmPassword = this.password = "";
        });
    }
  },
  computed: {
    passwordOptions() {
      return {
        minLength: 8,
        maxLength: 255,
        digits: true,
        letters: true,
        uppercase: true,
        lowercase: true,
        symbols: true
      };
    },
    validateNewPassword() {
      return validate(this.newPassword, this.passwordOptions).valid;
    },
    validateConfirmPassword() {
      return this.newPassword == this.confirmPassword;
    },
    validatePassword() {
      return validate(this.password, this.passwordOptions).valid;
    }
  }
};
</script>
