export const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY

export const login = (token, id) => {
  sessionStorage.setItem(TOKEN_KEY, token)
  sessionStorage.setItem('userID', id)
}

export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => sessionStorage.getItem(TOKEN_KEY)

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem('userID')
}