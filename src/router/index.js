import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

const router = new createRouter({
	// history:createWebHistory('/mobile/'),
	// history:createWebHistory(),
	history: createWebHashHistory(),
	routes:[

		// ----------主页----------
		{
			path:'/',
			name:'home',
			component:() => import('../views/home/index.vue')
		},

		// ----------分类----------
    {
			path:'/type',
			component:() => import('../views/type/index.vue')
		},

		// ---------购物车---------
		{
			path:'/cart',
			component:() => import('../views/cart/index.vue')
		},

		// ----------我的----------
		{
			path:'/user',
			component:() => import('../views/user/index.vue')
		},
		// --我的 -> 消息--
		{
			path:'/user/msg',
			component:() => import('../views/user/msg.vue')
		},
		// --我的 -> 设置--
		{
			path:'/user/set',
			component:() => import('../views/user/set/index.vue')
		},
		// --我的 -> 设置(售后服务)--
		{
			path:'/user/set/refund',
			component:() => import('../views/user/set/refund.vue')
		},
		// --我的 -> 设置(关于我们)--
		{
			path:'/user/set/about',
			component:() => import('../views/user/set/about.vue')
		},
		// --我的 -> 设置(隐私条款/服务条款)--
		{
			path:'/user/set/article',
			component:() => import('../views/user/set/article.vue')
		},
		// --我的 -> 购物指南--
		{
			path:'/user/guide',
			component:() => import('../views/user/guide/index.vue')
		},
		// --我的 -> 购物指南(详情)--
		{
			path:'/user/guide/dtl',
			component:() => import('../views/user/guide/dtl.vue')
		},
		// --我的 -> 物流配送--
		{
			path:'/user/logistics',
			component:() => import('../views/user/logistics/index.vue')
		},
		// --我的 -> 物流配送(详情)--
		{
			path:'/user/logistics/dtl',
			component:() => import('../views/user/logistics/dtl.vue')
		},

		// --------药品详情--------
		{
			path:'/detail/:id',
			component:() => import('../views/detail/index.vue')
		},
		// --药品详情 -> 评论(详情)--
		{
			path:'/detail/comment/:id',
			component:() => import('../views/detail/comment.vue')
		},

		// --------实名认证--------
		{
			path:'/shiming',
			component:() => import('../views/shiming/index.vue')
		},

		// --------收货地址--------
		{
			path:'/address',
			component:() => import('../views/address/index.vue')
		},
		// --收货地址 -> 创建/编辑--
		{
			path:'/address/edit',
			component:() => import('../views/address/edit.vue')
		},

		// --------确认订单--------
		{
			path:'/confirmorder',
			component:() => import('../views/confirmorder/index.vue')
		},

		// ----------搜索----------
		{
			path:'/search',
			component:() => import('../views/search/index.vue')
		},
		// --搜索 -> 搜索结果--
		{
			path:'/search/list',
			component:() => import('../views/search/list.vue')
		},

		// ----------收藏----------
		{
			path:'/collection',
			component:() => import('../views/collection/index.vue')
		},

		// ---------优惠券---------
		{
			path:'/coupon',
			component:() => import('../views/coupon/index.vue')
		},

		// --------我的订单--------
		{
			path:'/myorder',
			component:() => import('../views/myorder/index.vue')
		},
		{
			path:'/myorder/detail',
			component:() => import('../views/myorder/detail.vue')
		},

		// ----------评论----------
		{
			path:'/comments/:id',
			component:() => import('../views/comments/index.vue')
		},

		// ----------物流信息----------
		{
			path:'/ship/:id',
			component:() => import('../views/ship/index.vue')
		},

		// ----------登录----------
		{
			path:'/login',
			component:() => import('../views/login/index.vue')
		},
		// --登录（注册）--
		{
			path:'/login/register',
			component:() => import('../views/login/register.vue')
		},
		// --登录（忘记密码）--
		{
			path:'/login/forgetpwd',
			component:() => import('../views/login/forgetpwd.vue')
		},
		// --登录（修改密码）--
		{
			path:'/login/changepwd',
			component:() => import('../views/login/changepwd.vue')
		}
	]
})

// 路由守卫
router.beforeEach((to,from,next) => {
	if (!window.sessionStorage.getItem("token")) {
		let blackRouter = ['/cart', '/user']
		if (blackRouter.includes(to.path)) { 
			next('/login?from=' + to.path)
		}
	}
	window.scrollTo(0, 0)
	/**
	if (from.path !== '/') {
		window.scrollTo(0, 0)
	}
	*/
	next()
})

/**
router.afterEach((to) => { 
  if (window.history.state && window.history.state.forward) {
    to.meta.isBack = true;
  } else {
  	to.meta.isBack = false;
  }
});
*/
export default router;