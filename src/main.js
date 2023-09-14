import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'

const i18n = createI18n({
    legacy: false,
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
  })

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')