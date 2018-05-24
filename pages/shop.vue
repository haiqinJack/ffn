<template>
	<div>
		<van-notice-bar mode="closeable" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png">
  		足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
		</van-notice-bar>

		<van-swipe :autoplay="3000">
		  <van-swipe-item v-for="(image, index) in SwipeImages" :key="index">
		    <img v-lazy="image" class="shop_swipe"/>
		  </van-swipe-item>
		</van-swipe>		
		<div class="cap-image-ad">
			<ul>
				<li class="cap-image-ad__content top2end-img-container hotarea-pic-container" style="height: 241px; margin: 0px;">
					<img class="cap-image-ad__image" src="https://img.yzcdn.cn/upload_files/2018/04/11/FgDKc9IX4ul0_AX7m4eim7yFj6Vp.jpg?imageView2/2/w/730/h/0/q/75/format/webp">
					<a href="" class="hotarea-link" style="top: 4px; left: 12px; width: 108px; height: 118px;"></a>
					<a href="" class="hotarea-link" style="top: 4px; left: 136px; width: 108px; height: 118px;"></a>
					<a href="" class="hotarea-link" style="top: 4px; left: 259px; width: 108px; height: 118px;"></a>
					<a href="" class="hotarea-link" style="top: 125px; left: 12px; width: 108px; height: 118px;"></a>
					<a href="" class="hotarea-link" style="top: 125px; left: 136px; width: 108px; height: 118px;"></a>
					<a href="" class="hotarea-link" style="top: 125px; left: 259px; width: 108px; height: 118px;"></a>																					
				</li>
			</ul>
		</div>
		<img v-for="img  in PosterImages" v-lazy="img" :key="img" class="cap-image-ad__image">
		<FooterAction />
	</div>
</template>
<script>
import { 
	NoticeBar,
	Swipe, 
	SwipeItem,
	Lazyload 
} from 'vant'
import Vue from 'vue'
import FooterAction from '~/components/footer-action.vue'
Vue.use(Lazyload, {})

export default {
	data() {
		return {
			SwipeImages: [
				'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg',
        'http://img03.tooopen.com/uploadfile/downs/images/20110714/sy_20110714135215645030.jpg',
        'http://img.zcool.cn/community/01d941590c5577a801214550416103.jpg@2o.jpg'			
			],
			PosterImages: [
				'https://img.yzcdn.cn/upload_files/2018/04/26/Fnkszw3BNpf6H2ofG1g3ozngFwpy.jpg?imageView2/2/w/730/h/0/q/75/format/webp',
				'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg',
        'http://img03.tooopen.com/uploadfile/downs/images/20110714/sy_20110714135215645030.jpg',
        'https://img.yzcdn.cn/upload_files/2018/04/26/Fnkszw3BNpf6H2ofG1g3ozngFwpy.jpg?imageView2/2/w/730/h/0/q/75/format/webp',
        'https://img.yzcdn.cn/upload_files/2018/04/26/Fnkszw3BNpf6H2ofG1g3ozngFwpy.jpg?imageView2/2/w/730/h/0/q/75/format/webp'
			]
		}
	},
	components: {
		[NoticeBar.name]: NoticeBar,
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[Lazyload.name]: Lazyload,
		FooterAction
	}
}
</script>
<style scoped>
.shop_swipe{
	width: 100%;
}	
.cap-image-ad__content {
    position: relative;
}
.cap-image-ad .swipe-image-container .cap-image-ad__image, .cap-image-ad .top2end-img-container .cap-image-ad__image {
    width: 100%;
}
.cap-image-ad__image {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
    border: 0;
}
.cap-image-ad .hotarea-link {
    position: absolute;
    display: block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
a {
    color: #333;
    background: transparent;
    text-decoration: none;
}
.cap-image-ad {
    overflow: hidden;
    font-size: 0;
}
div, span, li, dt, dd {
    cursor: pointer;
}
</style>
