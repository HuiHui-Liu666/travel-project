import { createApp } from 'vue'
import App from './App.vue'
import { Tabbar, TabbarItem,Search, Grid, GridItem,List,Icon,Tag } from 'vant';
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
app.use(List);
app.use(Icon);
app.use(Tag);
app.mount('#app')
