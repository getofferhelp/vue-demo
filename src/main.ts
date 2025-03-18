import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { loadIcons } from './config/icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 加载所有图标
loadIcons()

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
