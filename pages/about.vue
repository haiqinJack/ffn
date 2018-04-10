<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1>{{ name }}</h1>
  </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  asyncData({ req }) {
    const url = req.headers['x-forwarded-proto'] + '://' + req.headers['host'] + req.url
    return {
      name: url
    }
  },
  head() {
    return {
      title: `测试页面`
    }
  },
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  beforeMount() {
    const wx = window.wx
    const url = window.location.href
    console.log(url.split('#')[0])
    this.$store.dispatch('getWechatSignture', encodeURIComponent(url)).then(res => {
      const params = res.data.params

      wx.config({
        debug: true,
        appId: params.appId,
        timestamp: params.timestamp,
        nonceStr: params.noncestr,
        signature: params.signature,
        jsApiList: [
          'hideAllNonBaseMenuItem'
        ]
      })

      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
      })
    })
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
