<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-vue';
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
    <authenticator :form-fields="formFields" initial-state="signUp" :login-mechanisms="['email']" >
      <template v-slot="{ user }">
        <h1>logged in </h1>
        <h1>Hello {{ user.username }}!</h1>
      </template>
    </authenticator>
  </div>
</template>