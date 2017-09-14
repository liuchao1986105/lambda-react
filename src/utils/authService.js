import cookie from 'react-cookie'
import { CookieDomain } from '../config'
let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }    ////path:'/',maxAge:365*24*60*60
}

export function saveCookie(name,value) {
  //cookie.save(name, value)
  cookie.save(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  //cookie.remove(name)
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
  cookie.remove('returnUrl', cookieConfig)
  cookie.remove('username', cookieConfig)
}

export function isLogin() {
  return !!cookie.load('token')
}

export function redirectToBack(nextState, replace) {
  //已经登录则不进入
  if (isLogin()) {
    replace('/')
  }
}
export function redirectToLogin(nextState,replace) {
  if (!isLogin()) {
    replace('/login')
  }
}