import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import "@aws-amplify/ui-vue/styles.css";
import './assets/main1.css'

Amplify.configure({
    Auth: {

        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-3',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-3_0YGMn2nrN',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'hp23kcjb0mee8h0n701mefjij',
    }
})

const app = createApp(App);
app.use(router)
app.mount('#app')
