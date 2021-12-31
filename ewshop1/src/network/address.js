import {request} from './request';

export function addAddress(params) {
	return request({
		url:'/api/address',
		method:'post',
		params
	})
}

export function EditAddress(id,params) {
	return request({
		url:`/api/address/${id}`,
		method:'put',
		params
	})
}

export function DeleteAddress(id) {
	return request({
		url:`/api/address/${id}`,
		method:'delete',
		
	})
}

export function getAddressList(params) {
	return request({
		url:'/api/address',
		
	})
}

export function getAddressDetail(id) {
	return request({
		url:`/api/address/${id}`,
		
	})
}