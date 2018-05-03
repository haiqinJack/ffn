<template>
    <div>
    <div class="footer"></div>
	<div class="shop-nav">
		<div class="shop-nav nav-menu nav-menu-1 has-menu-3">
			<div class="nav-special-item">
				<a href="/shop" class="home"></a>
			</div>
			<div class="nav-items-wrap">
				<div class="nav-item">
					<a href="/allgoods" class="mainmenu js-mainmenu">
						<span class="mainmenu-txt">
							<i class="arrow-weixin"></i>
							全部商品
						</span>
					</a>
				</div>
				<div class="nav-item">
					<a href="/cart" class="mainmenu js-mainmenu">
						<span class="mainmenu-txt">
							<i class="arrow-weixin"></i>
							购物车
						</span>
					</a>
				</div>
				<div class="nav-item">
					<a href="/user" class="mainmenu js-mainmenu">
						<span class="mainmenu-txt">
							<i class="arrow-weixin"></i>
							个人中心
						</span>
					</a>
				</div>								
			</div>
		</div>
	</div>
    </div>
</template>
<script>
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant'

export default {
  methods: {
    onClickMiniBtn() {
      Toast('点击图标');
    },
    onClickBigBtn() {
      Toast('点击按钮');
    }
  }	
}	
</script>
<style>
@media only screen and (-webkit-min-device-pixel-ratio: 1.5), not all, not all
.nav-menu-1 {
  border-top-width: 1px;
}	
.nav-menu-1 {
    border: 0 none;
    -webkit-border-image: url(https://b.yzcdn.cn/v2/image/wap/shopnav/nav_border_inner.png) 2 stretch;
    -moz-border-image: url(https://b.yzcdn.cn/v2/image/wap/shopnav/nav_border_inner.png) 2 stretch;
    border-image: url(https://b.yzcdn.cn/v2/image/wap/shopnav/nav_border_inner.png) 2 stretch;
    border-top: 2px solid #e5e5e5;
    background: no-repeat #fafafa;
    background-size: 100% 100px;
    background-origin: content-box;
    background-clip: content-box;
    height: 49px;
}
.nav-menu-1, .nav-menu-2, .nav-menu-3 {
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    /*background: #eaeaea;*/
    color: #eee;
    text-align: center;
}
.shop-nav {
    position: fixed;
    z-index: 99;
}
.nav-menu-1 .nav-special-item {
    position: absolute;
    width: 43px;
    height: 49px;
}
.home {
    display: inline-block;
    width: 43px;
    color: #333;
    font-weight: bold;
    font-size: 14px;
    background: url(https://b.yzcdn.cn/v2/image/wap/shopnav/ico_home_20160816.png) no-repeat scroll center center;
    background-size: 24px 24px;
    text-indent: -10000px;
    height: 40px;
    vertical-align: top;
}
div, span, li, dt, dd {
    cursor: pointer;
}

.nav-menu-1 .nav-special-item a {
    background-size: 24px 24px;
    margin: 0 auto;
}
.nav-menu-1 a {
    display: block;
    color: #4b4b4b;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.nav-menu a {
    display: block;
    height: 100%;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
}
.nav-menu-1 .nav-items-wrap {
    margin-left: 43px;
}
.nav-menu-1.has-menu-3 .nav-item {
    width: 33.33333333%;
}
.nav-menu-1 .nav-item {
    float: left;
    display: block;
    height: 49px;
    border-left: 2px solid #e5e5e5;
}
.nav-menu .nav-item {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
a {
  color: #333;
  background: transparent;
  text-decoration: none;
}
.nav-menu .mainmenu .mainmenu-txt {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.nav-menu .mainmenu .arrow-weixin, .nav-menu .mainmenu .mainmenu-txt {
    font-size: 14px;
    line-height: 49px;
    display: inline-block;
    vertical-align: middle;
}
.footer {
    margin-bottom: 50px;
}
</style>
