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
		{
			path:'/login/register',
			component:() => import('../views/login/register.vue')
		},
		{
			path:'/login/forgetpwd',
			component:() => import('../views/login/forgetpwd.vue')
		},
	]
})

// 路由守卫
router.beforeEach((to,from,next) => {
	if (!window.localStorage.getItem("token")) {
		let blackRouter = ['/cart', '/mine']
		if (blackRouter.includes(to.path)) { 
			sessionStorage.setItem('loginFrom',to.path)
			next('/login')
		}
	}
	next()
})

export default router;