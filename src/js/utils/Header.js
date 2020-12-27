export const headersGenerator = (token = '') => {
  if (token) return {
    "Content-Type": "application/json",
    "authorization": `Token ${token}`
  }
  return {
    "Content-Type": "application/json"
  }
}
