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
			path:'/test',
			component:() => import('../views/test/index.vue')
		},
	]
})

router.beforeEach((to,from,next) => {
	console.log(to,from,111);
	next();
})

export default router;