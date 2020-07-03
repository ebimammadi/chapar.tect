const state = {
  signed: false
};

const getters = {
  isSinged: state => state.signed
};

const actions = {
  setSingInStatus({ commit }, value) {
    commit("changeSingInStatus", value);
  }
};

const mutations = {
  changeSingInStatus: (state, value) => (state.signed = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};
