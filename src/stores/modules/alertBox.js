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
  setChangeAlert ( { commit }, message, variant) {
    commit('changeAlert', message, variant)
  }
}

const mutations = {
  changeMessage: (state, value) => (state.message = value),
  changeVariant: (state, value) => (state.variant = value),
  changeAlert: (state, message, variant) => {
    state.variant = variant;
    state.message = message;
    document.getElementsByClassName('alert-box')[0].scrollIntoView();
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
