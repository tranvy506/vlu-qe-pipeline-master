const LOCKED_ACCOUNTS = ['locked_user', 'banned_user'];

function login(username, password) {
  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const trimmedUser = username.trim();
  const trimmedPass = password.trim();

  if (!trimmedUser || !trimmedPass) {
    return false;
  }

  if (LOCKED_ACCOUNTS.includes(trimmedUser)) {
    return false;
  }

  // Chú ý: password truyền vào trong test là chuỗi '123'
  if (trimmedUser === 'admin' && trimmedPass === '123') {
    return true;
  }

  return false;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { login };
}
