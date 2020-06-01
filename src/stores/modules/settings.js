import APP_SETTINGS from  '@/core/settings';

const state = {
  settings: APP_SETTINGS
}

const getters = {
  appSettingsGet: state => state.settings
}

export default {
  state,
  getters
}