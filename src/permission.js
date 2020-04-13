import Vue from 'vue'
import store from './store'
import router from './router'
import { Message } from 'element-ui'
import { getStorage } from './utils/auth'
import { ACCESS_TOKEN } from './utils/constant'
import getPageTitle from './utils/get-page-title'

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    const hasToken = getStorage(ACCESS_TOKEN)

    if (hasToken) {
        if (to.path === '/user/login') {
            next({ path: '/' })
        }
    } else {
        if (whiteList.includes(to.name)) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login`)
        }
    }
    // to and from are both route objects. must call `next`.
})
