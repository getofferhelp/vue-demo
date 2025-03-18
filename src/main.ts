import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { loadIcons } from './config/icons'

// 添加主题切换图标
library.add(faSun, faMoon)

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 加载所有图标
loadIcons()

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
