import { createApp } from 'vue'
import App from './App.vue'
import { Tabbar, TabbarItem,Search, Grid, GridItem } from 'vant';
import 'vant/lib/index.css'
import 'amfe-flexible'
import router from '@/router'


const app = createApp(App)
app.use(router)

app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Grid);
app.use(GridItem);

app.mount('#app')
