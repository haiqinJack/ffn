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
    const url = window.location.href

    this.$store.dispatch('getUserInfoByOAuth', encodeURIComponent(url)).then(res => {
      const params = res.data
      console.log(params)
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
