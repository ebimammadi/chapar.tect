const state = {
  routeTo: ''
}

const getters = {
  routeTo: state => state.routeTo
}

const actions = {
  setRouteTo({ commit }, value) {
    commit("changeRouteTo", value)
  }
}

const mutations = {
  changeRouteTo: (state, value) => (state.routeTo = value)
}

export default {
  state,
  getters,
  actions,
  mutations
}
