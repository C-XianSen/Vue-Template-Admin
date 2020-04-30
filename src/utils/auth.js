export function getParams(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let param = window.location.search.substr(1).match(reg)
    if (param !== null) {
        return decodeURI(param[2])
    }
}

export function setCookie(name, value, expiresDay = 7) {
    let d = new Date()
    d.setTime(d.getTime() + expiresDay * 86400000 /* 24 * 60 * 60 * 1000 */)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires
}

export function getCookie(name) {
    let $name = name + '='
    let cookies = document.cookie.split(';')
    console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim()
        if (cookie.indexOf($name) === 0) {
            console.log(cookie.substring($name.length, cookie.length))
            return cookie.substring($name.length, cookie.length)
        }
    }
    return ''
}

export function removeCookie(name) {
    setCookie(name, '', -1)
}

export function setStorage(name, val) {
    localStorage.setItem(name, JSON.stringify(val))
}

export function getStorage(name) {
    return JSON.parse(localStorage.getItem(name))
}

export function removeStorage(name) {
    localStorage.removeItem(name)
}
