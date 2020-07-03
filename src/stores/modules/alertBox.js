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
  setChangeAlert ( { commit }, payload) {
    commit('changeAlert', payload)
  }
}

const mutations = {
  changeMessage: (state, value) => (state.message = value),
  changeVariant: (state, value) => (state.variant = value),
  changeAlert: (state, payload) => {
    console.log(`payload`,payload);
    state.variant = payload.variant;
    state.message = payload.message;
    document.getElementsByClassName('alert-box')[0].scrollIntoView();
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
