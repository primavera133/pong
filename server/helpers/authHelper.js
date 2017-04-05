import forge from 'node-forge';

export const setPlayer = ({request, _id, name, email, scope}) => {
  request.cookieAuth.set({
    _id: _id,
    name: name,
    email,
    scope: scope
  })
}

export const hashPwd = (pwd, salt1, salt2) => {
  const md = forge.md.sha512.create();
  md.update(`${salt1}-${pwd}-${salt2}`);
  return md.digest().toHex();
}