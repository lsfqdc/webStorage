<template>
	<div>
		<nav-bar>
			<template v-slot:default>个人中心</template>
		</nav-bar>
		<div style="margin: 15px;margin-top: 100px;">
			<van-button @click="tologout" round block color='#44ba80'>退出登陆</van-button>
		</div>
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue';
	import {logout,getUser} from 'network/user';
	import {Toast} from 'vant';
	import {useRouter} from 'vue-router';
	import {useStore} from 'vuex';
	
	
	export default {
		name:'Profile',
		components:{
			NavBar
		},
		setup(){
			const router = useRouter();
			const store = useStore();
			const state = reactive({
				user:{}
			})
			
			
			onMounted(()=>{
				getUser().then(res=>{
					console.log(res);
					state.user = res;
				})
			})
			
			const tologout = () =>{
				logout().then(res=>{
					if(res.status == '204') {
						Toast.success('退出成功');
						window.localStorage.setItem('token','');
						store.commit('setIsLogin',false);
						
						
						setTimeout(()=>{
							router.push({path:'/login'});
							
							
						},500);
					}
				});
			}
			
			const goTo = (path,query) => {
				router.push({path,query:query || {}})
			}
			
			return {
				...toRefs(state),
				tologout,
				goTo
			}
		},
		components:{
			NavBar
		}
	}
</script>

<style>
</style>
