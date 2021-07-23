import { createRouter, createWebHashHistory } from 'vue-router'

const router = new createRouter({
	history:createWebHashHistory(),
	routes:[
		{
			path:'/',
			redirect:'/home'
		},
		{
			path:'/home',
			component:() => import('../views/home/index.vue')
		},
    {
			path:'/type',
			component:() => import('../views/type/index.vue')
		},
		{
			path:'/search',
			component:() => import('../views/search/index.vue')
		},
		{
			path:'/cart',
			component:() => import('../views/cart/index.vue')
		},
		{
			path:'/mine',
			component:() => import('../views/mine/index.vue')
		},
	]
})

router.beforeEach((to,from,next) => {
	console.log(to,from,111);
	next();
})

export default router;