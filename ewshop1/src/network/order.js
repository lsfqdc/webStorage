import {request} from './request.js';

//创建
export function createOrder(params) {
	return request({
		url:'/api/orders',
		methods:'post',
		params
	})
}
//获取订单详情预览
export function getOrderPreview() {
	return request({
		url:'/api/order/preview'

	})
}

//订单支付,获取二维码
export function payOrder(order,params) {
	return request({
		url:`/api/orders/${order}/pay`,
		params
	})
}

//订单的状态
export function payOrderStatus(order) {
	return request({
		url:`/api/orders/${order}/status`
		
	})
}

//获取订单列表
export function getOrderList(params) {
	return request({
		url:'/api/orders',
		methods:'get',
		params
	})
}

//订单详情
export function getOrderDetail(order) {
	return request({
		url:`/api/orders/${order}`,
		params: {
			include:'user,orderDetails.goods'
		}
	})
}


//确认订单
export function confirmOrder(order) {
	return request({
		url:`/api/orders/${order}/confirm`,
		methods:'patch',
		params
	})
}


//获取物流信息
export function viewExpress(order) {
	return request({
		url:`/api/orders/${order}/express`,
	})
}