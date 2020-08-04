import Vue from 'vue'

class ErrorHandler {
  constructor(error, store) {
    this.errorFunc = error
    this.commit = store.commit
  }

  error(e) {
    if (this._isBan(e)) {
      this.commit('SET_IS_ERROR', true)
      this.errorFunc({ statusCode: 4011, message: e.message })
      return
    }
    if (this._isOldVersion(e)) {
      window.location.reload()
      return
    }
    if (this._isExpired(e)) {
      this.errorFunc({ statusCode: 4013 })
      return
    }
    throw e
  }

  _isBan(e) {
    return e.code === 14 && e.message.startsWith('BAN ')
  }

  _isOldVersion(e) {
    return e.code === 14 && e.message.startsWith('VERSION ')
  }

  _isExpired(e) {
    // 判定にmessageも見る必要がある
    return e.code === 16
  }
}

export default ({ error, store }, inject) => {
  const errorHandler = new ErrorHandler(error, store)
  inject('errorHandler', errorHandler)

  Vue.config.errorHandler = (err, vm, info) => {
    console.error(err)
    store.commit('SET_ERROR_MESSAGE_FOR_DEV', err)
  }

  if (process.browser) {
    window.addEventListener('error', event => {
      console.error(event.error)
      store.commit('SET_ERROR_MESSAGE_FOR_DEV', event.error)
    })

    window.addEventListener('unhandledrejection', event => {
      console.error(event.reason)
      store.commit('SET_ERROR_MESSAGE_FOR_DEV', event.reason)
    })
  }
}
