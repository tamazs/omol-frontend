import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import en from './locales/en.json';
import es from './locales/es.json';

const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
      en,
      es
    },
  })

  const app = createApp(App);

app.use(router)
app.use(i18n)

app.mount('#app')