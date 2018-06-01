<template>
  <div>
    <img class="user-poster" src="~assets/img/aa.png">
    <van-row class="user-links">
      <van-col span="6">
        <nuxt-link to="/user/order">
          <van-icon name="pending-payment" />
          待付款
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link to="/user/order">
          <van-icon name="pending-deliver" />
          待发货
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link to="/user/order">
          <van-icon name="logistics" />
          已发货
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link to="/user/order">
          <van-icon name="completed" />
          已完成
        </nuxt-link>
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <nuxt-link to="/user/order">
        <van-cell icon="records" title="全部订单" is-link />
      </nuxt-link>
    </van-cell-group>

    <van-cell-group>
      <nuxt-link to="/cart">
        <van-cell icon="cart" title="我的购物车" is-link />
      </nuxt-link>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="我的积分" is-link @click="t"/>
      <van-cell icon="gold-coin" title="我的优惠券" is-link @click="t"/>
      <van-cell icon="gift" title="我收到的礼物" is-link @click="t"/>
    </van-cell-group>
    <FooterAction />
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Toast } from 'vant';
import FooterAction from '~/components/footer-action.vue'

export default {
  middleware: 'wechat-auth',
  head() {
    return {
      title: '个人中心'
    }
  },
  methods: {
    t() {
      Toast('升级维护中～')
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    FooterAction
  }
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    display: block;
  }
  &-group {
    margin-bottom: .3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
