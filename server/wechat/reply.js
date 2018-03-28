
const tip = '欢迎光临法弗纳科技～'

export default async (ctx, next) => {
	const message = ctx.weixin
	
	if(message.MsgType === 'event') {
		if(message.Event === 'subscribe') {
			ctx.body = tip
		}else if(message.Event === 'unsubscribe'){
			console.log('取关了')
		}else if(message.Event === 'LOCATION'){
			ctx.body = `${message.Latitude}:${message.Longitude}`
		}
	}else{
		ctx.body = '你想要联系客服?'
	}
}
