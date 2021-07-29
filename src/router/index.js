import { createRouter, createWebHashHistory } from 'vue-router'

const router = new createRouter({
	history:createWebHashHistory(),
	routes:[
		{
			path:'/',
			component:() => import('../views/home/index.vue')
		},
    {
			path:'/type',
			component:() => import('../views/type/index.vue')
		},
		{
			path:'/cart',
			component:() => import('../views/cart/index.vue')
		},
		{
			path:'/mine',
			component:() => import('../views/mine/index.vue')
		},
		{
			path:'/detail/:id',
			component:() => import('../views/detail/index.vue')
		},
		{
			path:'/search',
			component:() => import('../views/search/index.vue')
		},
		{
			path:'/search/list',
			component:() => import('../views/search/list.vue')
		},
		{
			path:'/login',
			component:() => import('../views/login/index.vue')
		},
	]
})

// to：目标路由对象；
// from：即将要离开的路由对象；
router.beforeEach((to,from,next) => {
	// console.log(from.path,next);
	next();
})

export default router;