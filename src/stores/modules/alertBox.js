const state = {
  message: '',
  variant: 'warning'
}

const getters = {
  getMessage: state => state.message,
  getVariant: state => state.variant,
}

const actions = {
  setMessage({ commit }, value) {
    commit('changeMessage', value)
  },
  setVariant ({ commit }, value) {
    commit('changeVariant', value)
  },
}

const mutations = {
  changeMessage: (state, value) => (state.message = value),
  changeVariant: (state, value) => (state.variant = value)
}

export default {
  state,
  getters,
  actions,
  mutations
}