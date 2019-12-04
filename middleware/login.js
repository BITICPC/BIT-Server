export default function ({ store, route, redirect }) {
  if (!store.getters.isLogin) {
    return redirect(302, '/login', { polygon: route.name.includes('polygon'), back: route.fullPath })
  }
}
