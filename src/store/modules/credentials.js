const state = {
  signed: false,
  userInfo: {},
  profilePhotoUrl: window.localStorage.getItem("profilePhotoUrl")
}

const getters = {
  isSinged: state => state.signed,
  userInfo: state => state.userInfo,
  // profilePhotoUrl: state => state.profilePhotoUrl
  profilePhotoUrl: state => {
    console.log(`yes from getter function`,state.profilePhotoUrl)
    return state.profilePhotoUrl//window.localStorage.getItem("profilePhotoUrl")
  }
}

const actions = {
  setSingInStatus({ commit }, value) { commit("changeSingInStatus", value) },
  setUserInfo( { commit }, value) { commit("changeUserInfo", value) },
  SetProfilePhotoUrl( { commit }, value ) { commit("changeProfilePhotoUrl", value )}
}

const mutations = {
  changeSingInStatus: (state, value) => (state.signed = value),
  changeUserInfo: (state, value) => (state.userInfo = value),
  changeProfilePhotoUrl: (state, value) => {
    console.log(`we are mutating!!!!!!!`)
    window.localStorage.setItem("profilePhotoUrl", value)
    state.profilePhotoUrl = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
