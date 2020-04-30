import API from '@/api/request'
import { LOGIN, LOGOUT, CURRENT } from '@/api'
import { setStorage, getStorage, removeStorage } from '@/utils/auth'
import { ACCESS_TOKEN } from '@/utils/constant'

const state = {
    token: getStorage(ACCESS_TOKEN),
    roles: [],
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            API.post(LOGIN, {
                username,
                password,
            })
                .then(response => {
                    const { data } = response
                    commit('SET_TOKEN', data.token)
                    setStorage(ACCESS_TOKEN, data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            API.delete(LOGOUT)
                .then(response => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeStorage(ACCESS_TOKEN)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            API.get(CURRENT, {
                params: state.token
            })
                .then(response => {
                    const { data } = response
                    commit('SET_ROLES', data.roles)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
