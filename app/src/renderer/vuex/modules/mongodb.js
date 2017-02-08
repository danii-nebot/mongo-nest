import { MongoClient } from 'mongodb'
import * as types from '../mutation-types'
import secret from '../../../../secret.json'

const state = {
  connected: false,
  collections: []
}

const mutations = {
  [types.DB_CONNECTED](state) {
    state.connected = true
  },
  [types.DB_DISCONNECTED](state) {
    state.connected = false
  },
  [types.DB_RECONNECTED](state) {
    state.connected = true
  },
  [types.SET_COLLECTIONS](state, cols) {
    state.collections = cols
  }
}

const actions = {
  connect: ({ commit }) => {
    const host = encodeURIComponent(secret.host)
    const port = encodeURIComponent(secret.port)
    const user = encodeURIComponent(secret.user)
    const password = encodeURIComponent(secret.password)
    const dbName = encodeURIComponent(secret.dbName)
    const authSource = encodeURIComponent(secret.authSource)
    // const authMechanism = 'DEFAULT'

    const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`
    // Use connect method to connect to the Server
    MongoClient.connect(url)
      .then((db) => {
        console.log('db connected to server')
        commit(types.DB_CONNECTED)

        db.on('close', (ev) => {
          console.log('db closed')
          commit(types.DB_DISCONNECTED)
        })

        db.on('reconnect', (ev) => {
          console.log('db reconnected')
          commit(types.DB_RECONNECTED)
        })

        db.listCollections().toArray()
          .then((collections) => {
            commit(types.SET_COLLECTIONS, collections)
          })
      })
      .catch((err) => {
        console.log('error, yo', err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
