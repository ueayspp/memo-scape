import Cookies from 'js-cookie'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const accessToken = Cookies.get('accessToken')
  if (!accessToken) {
    return next({ name: 'login' })
  }
  next()
}
