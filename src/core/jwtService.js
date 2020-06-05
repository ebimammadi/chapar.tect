const getToken = () => window.localStorage.getItem('token')
const setToken = (token) => window.localStorage.setItem('token', token)

const deleteToken = () => window.localStorage.removeItem('token')

export default { setToken, getToken, deleteToken }