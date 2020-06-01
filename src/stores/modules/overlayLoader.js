const state = {
  overlayShow: false,
}

const getters = {
  overlayShow: state => state.overlayShow
}

const actions = {
  setOverlayShow({ commit }, value) {
    commit('changeOverlayShow', value)
  } 
}

const mutations = {
  changeOverlayShow: (state, value) => (state.overlayShow = value)
}

export default {
  state,
  getters,
  actions,
  mutations
}