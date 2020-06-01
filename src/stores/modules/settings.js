import APP_SETTINGS from  '@/SETTINGS.js';

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