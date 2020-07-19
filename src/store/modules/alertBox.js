const state = {
  message: "",
  variant: "warning"
}

const getters = {
  getMessage: state => state.message,
  getVariant: state => state.variant
}

const actions = {
  setAlert({ commit }, payload) {
    commit("changeAlert", payload)
  }
}

const mutations = {
  changeAlert: (state, payload) => {
    if (payload.response_type) payload.variant = payload.response_type
    payload.variant = payload.variant ?? "warning"
    state.message = payload.message
    state.variant = payload.variant
    if (document.getElementsByClassName("alert-box").length > 0)
      document.getElementsByClassName("alert-box")[0].scrollIntoView()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
