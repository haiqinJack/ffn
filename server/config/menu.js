import config from './index'

export default {
	button: [
		{
			type: 'miniprogram',
			name: '商城首页',
			url: config.SITE_ROOT_URL + '/allgoods',
			appid: config.wechatMini.appID,
			pagepath: '/pages/index'
		}
	]
}
