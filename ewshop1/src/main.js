import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'

import {PullRefresh,List,Popup,Grid,GridItem,AddressEdit,AddressList,Icon,SubmitBar,CheckboxGroup,SwipeCell,Stepper,Checkbox,Field,Form,Tag,Button,Image as VanImage,Card,Tab,Swipe,
Tabs,SwipeItem,Lazyload,Badge,Sidebar,SidebarItem,Collapse,CollapseItem} from 'vant';

createApp(App)
.use(Swipe).use(SwipeItem).use(Badge).use(Sidebar).use(SidebarItem)
.use(Lazyload,{loading:('./assets/images/default.png')})
.use(store).use(PullRefresh).use(Popup).use(Stepper).use(Checkbox).use(List).use(Grid).use(SubmitBar).use(GridItem).use(Form).use(Tag)
.use(Button).use(Tab).use(CheckboxGroup).use(SwipeCell).use(Icon).use(Tabs).use(Card).use(VanImage)
.use(Collapse).use(AddressEdit).use(AddressList).use(Field).use(CollapseItem).use(router).mount('#app')
