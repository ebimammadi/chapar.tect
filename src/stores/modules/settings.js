import APP_SETTINGS from  '@/core/settings.js';

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