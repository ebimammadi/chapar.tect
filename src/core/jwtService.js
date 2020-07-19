//this service for accessing the jwt and refresh token
const parseToken = token => {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )
  return JSON.parse(jsonPayload)
}

const getToken = () => window.localStorage.getItem("token")
const getRefreshToken = () => window.localStorage.getItem("refresh-token")
const setToken = token => window.localStorage.setItem("token", token)
const setRefreshToken = token =>
  window.localStorage.setItem("refresh-token", token)
const deleteToken = () => window.localStorage.removeItem("token")
const deleteRefreshToken = () =>
  window.localStorage.removeItem("refresh-token")

const decodeToken = () => parseToken(getToken())

const isValidToken = () => {
  if (!getToken()) return false
  try {
    const decodedToken = decodeToken()
    const exp = decodedToken.exp
    const now = parseInt(new Date().getTime() / 1000)
    if (now > exp) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export default {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  deleteToken,
  deleteRefreshToken,
  isValidToken,
  decodeToken
}
