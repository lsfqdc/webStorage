<template>
	<div>
		<nav-bar>
			<template v-slot:default>商品分类</template>
		</nav-bar>
		<div id="mainbox">
			<div class="ordertab">
				<van-tabs v-model="active" @click="tabClick">
					<van-tab title="销量排序"></van-tab>
					<van-tab title="价格排序"></van-tab>
					<van-tab title="评论排序"></van-tab>
				</van-tabs>
			</div>
			
				<van-sidebar class="leftmenu" v-model="activekey">
				<van-collapse v-model="activeName" accordion>
					<van-collapse-item v-for="item in categories" 
					:key="item.id"
					:title="item.name" 
					:name="item.name">
					
						<van-sidebar-item 
						v-for="sub in item.children" 
						:title="sub.name" 
						:key="sub.id"
						@click="getGoods(sub.id)"
						/>
					
					</van-collapse-item>
				</van-collapse>
				</van-sidebar>
				
			
			<div class="goodslist">
				<div class="content">
					<van-card
					v-for="item in showGoods" :key="item.id"
					:num="item.comments_count"
					:tag="item.comments_count >=0 ? '流行' : '标签'"
					:price="item.price"
					:desc="item.updated_at"
					:title="item.title"
					:thumb="item.cover_url"
					:lazy-load="true"
					@click="itemClick(item.id)"
					/>
					
					
				</div>
			</div>
		</div>
		<back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue';
	import {ref,reactive,watchEffect,nextTick,onMounted,computed} from 'vue';
	import {getCategory,getCategoryGoods} from "../../network/category.js";
	import BScroll from 'better-scroll';
	import BackTop from 'components/common/backtop/BackTop';
	import {useRouter} from 'vue-router';
	
	
	export default {
		name:'Category',
		setup() {
			const router = useRouter();
			let active = ref(1);
			let activekey = ref(0);
			let activeName = ref(1);
			let categories = ref([]);
			let currentOrder = ref('sales');
			let currentCid = ref(0);
			let isShowBackTop = ref(false)
			
			const goods = reactive({
				sales:{page:1,list:[]},
				price:{page:1,list:[]},
				comments_count:{page:1,list:[]}
			})
			
			
			const showGoods = computed(()=>{
				return goods[currentOrder.value].list;
			})
			
			
			
			const init = () =>{
				getCategoryGoods("sales",currentCid.value).then(res=>{
					goods.sales.list =res.goods.data;
				})
				
				getCategoryGoods("price",currentCid.value).then(res=>{
					goods.price.list =res.goods.data;
				})
				
				getCategoryGoods("comments_count",currentCid.value).then(res=>{
					goods.comments_count.list =res.goods.data;
				})
				
			}
			let bscroll = reactive({});
			
			onMounted(()=>{
				getCategory().then(res=>{
					categories.value = res.categories;
					
				})
				init();
				bscroll = new BScroll(document.querySelector('.goodslist'),{
					probeType: 3,
					click:true,
					pullUpLoad:true
				});
				
				
				
				
				
					bscroll.on('scroll',(position)=>{
						
						//console.log(-position.y);
						isShowBackTop.value =  (-position.y) > 300;
					} )
					
					bscroll.on("pullingUp",()=>{
						console.log('上拉加载更多....');
						const page = goods[currentOrder.value].page + 1;
						
						getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
							goods[currentOrder.value].list.push(...res.goods.data);
							goods[currentOrder.value].page +=1;
							
						})
						
						bscroll.finishPullUp();
						
						nextTick(()=>{
							bscroll && bscroll.refresh();
						})
					})
				})
					
				
			
			
			const tabClick = (index)=>{
				let orders = ['sales','price','comments_count'];
				currentOrder.value = orders[index];
				
				getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
					goods[currentOrder.value].list =res.goods.data;
					
					nextTick(()=>{
						bscroll && bscroll.refresh();
					})
				})
				
				
				
			}
			
			const getGoods = (cid) =>{
				currentCid.value = cid;
				init();
				
			} 
			
			
			watchEffect(()=>{
				nextTick(()=>{
					bscroll && bscroll.refresh();
				})
			})
			
			const bTop = ()=>{
				bscroll.scrollTo(0,0,300);
			}
			
			return {
				activekey,
				categories,
				activeName,
				active,
				tabClick,
				currentOrder,
				currentCid,
				getGoods,
				goods,
				showGoods,
				bscroll,
				isShowBackTop,
				bTop,
				itemClick:(id)=>{
					router.push({path:'/detail',query:{id}});
				}
			}
		},
		components: {
			NavBar,
			BackTop
		}
	}
</script>

<style scoped lang="scss">
	#mainbox {
		margin-top: 45px;
		display: flex;
		.ordertab {
			flex: 1;
			float: right;
			
			
			height: 50px;
			z-index: 9;
			position: fixed;
			top: 45px;
			right: 0;
			left: 130px;
		}
		.leftmenu {
			position: fixed;
			top: 110px;
			left: 0;
			width: 130px;
			
			
			
		}
		.goodslist {
			flex: 1;
			padding:10px;
			position: absolute;
			text-align: left !important;
			top: 100px;
			left: 130px;
			right: 0;
			height: 100vh;
			
			.van-card_content {
				text-align: left !important;
				
				left: 0;
			}
		}
	}
	
	.van-card_thumb {
		width: 68px !important;
	}
</style>
