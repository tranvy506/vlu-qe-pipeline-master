/**
 * Danh sách tài khoản giả lập bị khóa
 */
const LOCKED_ACCOUNTS = ['locked_user', 'banned_user'];

/**
 * Kiểm tra đăng nhập
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
function login(username, password) {
  // Ngoại lệ: username hoặc password rỗng/không phải chuỗi
  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const trimmedUser = username.trim();
  const trimmedPass = password.trim();

  if (!trimmedUser || !trimmedPass) {
    return false;
  }

  // Ngoại lệ: tài khoản bị khóa
  if (LOCKED_ACCOUNTS.includes(trimmedUser)) {
    return false;
  }

  // Đăng nhập hợp lệ: admin / 123
  if (trimmedUser === 'admin' && trimmedPass === '12345') {
    return true;
  }

  return false;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { login };
}
