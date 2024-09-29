import { createApp } from 'vue'
import App from './App.vue'
import { Tabbar, TabbarItem,Search } from 'vant';
import 'vant/lib/index.css'
import 'amfe-flexible'
import router from '@/router'


const app = createApp(App)
app.use(router)

app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.mount('#app')
