export default function ({ store, route, redirect }) {
  if (!Object.keys(store.state.user).length) {
    let { fullPath } = route
    fullPath = encodeURIComponent(fullPath.substr(1))
    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
  console.log(store.state.user,'wechatMiddleware')
}
