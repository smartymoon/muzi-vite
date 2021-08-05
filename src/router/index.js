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
		// detail => shiming => address => order,
		{
			path:'/detail/:id',
			component:() => import('../views/detail/index.vue')
		},
		{
			path:'/shiming',
			component:() => import('../views/shiming/index.vue')
		},
		{
			path:'/address',
			component:() => import('../views/address/index.vue')
		},
		{
			path:'/address/edit',
			component:() => import('../views/address/edit.vue')
		},
		{
			path:'/address/creat',
			component:() => import('../views/address/creat.vue')
		},
		{
			path:'/confirmorder',
			component:() => import('../views/confirmorder/index.vue')
		},
		// search
		{
			path:'/search',
			component:() => import('../views/search/index.vue')
		},
		{
			path:'/search/list',
			component:() => import('../views/search/list.vue')
		},
		// login
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
	if (!window.sessionStorage.getItem("token")) {
		let blackRouter = ['/cart', '/mine']
		if (blackRouter.includes(to.path)) { 
			sessionStorage.setItem('loginFrom',to.path)
			next('/login')
		}
	}
	next()
})

export default router;