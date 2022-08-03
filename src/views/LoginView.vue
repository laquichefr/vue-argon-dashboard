<script setup>
import { Authenticator , translations } from "@aws-amplify/ui-vue";
import { I18n } from 'aws-amplify';
I18n.putVocabularies(translations);
I18n.setLanguage('fr');
const formFields = {
  signUp: {
    email: {
      labelHidden: true,
      label: ''
    },
  },
  signIn: {
    username: {
      labelHidden: true,
      label: ''
    },
  },
}

</script>

<template>
  <div class="mx-auto" style="width: 97%">
  <authenticator  :form-fields="formFields" :login-mechanisms="['email']" >
    <template v-slot="{ user }">
      <h1>logged in </h1>
      <h1>Hello {{ user.username }}!</h1>
      <h3 v-for="i in user" :key="i">{{ i }} <hr></h3>
    </template>
  </authenticator>
  </div>
</template>

<style>
.amplify-button[data-variation='primary'] {
  background: linear-gradient(
    to right,
    var(--amplify-colors-green-80),
    var(--amplify-colors-orange-40)
  );
}
</style>