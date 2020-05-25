const setToken = (token) => window.localStorage.setItem('token', token)
const getToken = () => window.localStorage.getItem('token')
const deleteToken = () => window.localStorage.removeItem('token')

export default { setToken, getToken, deleteToken }