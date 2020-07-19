const state = {
  signed: false,
  userInfo: {}
}

const getters = {
  isSinged: state => state.signed,
  userInfo: state => state.userInfo
}

const actions = {
  setSingInStatus({ commit }, value) { commit("changeSingInStatus", value) },
  setUserInfo( { commit }, value ){ commit("changeUserInfo", value) }
}

const mutations = {
  changeSingInStatus: (state, value) => (state.signed = value),
  changeUserInfo: (state, value) => (state.userInfo = value)
}

export default {
  state,
  getters,
  actions,
  mutations
}
