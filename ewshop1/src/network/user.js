import {request} from "./request.js";

export function register(data) {
	return request({
		url:'/api/auth/register',
		method:'post',
		data
	})
}

export function login(data) {
	return request({
		url:'/api/auth/login',
		method:'post',
		data
	})
}

export function getUser(data) {
	return request({
		url:'/api/user',
		
		
	})
}

export function logout(data) {
	return request({
		url:'/api/auth/logout',
		method:'post',
		
	})
}