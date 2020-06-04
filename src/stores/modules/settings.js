import APP_SETTINGS from  '@/core/settings';

const state = {
  settings: APP_SETTINGS
}

const getters = {
  settings: state => state.settings
}

export default {
  state,
  getters
}