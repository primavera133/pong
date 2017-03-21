export const setPlayer = ({request, _id, name, email, scope}) => {
  request.cookieAuth.set({
    _id: _id,
    name: name,
    email,
    scope: scope
  })
}
