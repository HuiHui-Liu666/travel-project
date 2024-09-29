import { createApp } from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import router from '@/router'
const app = createApp(App)
app.use(Button)
app.use(router)
app.mount('#app')
