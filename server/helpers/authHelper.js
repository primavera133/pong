export const setPlayer = ({request, email, scope}) => {
  request.cookieAuth.set({
    email,
    scope: scope
  })
}
