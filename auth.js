/**
 * Danh sách tài khoản giả lập bị khóa
 */
const LOCKED_ACCOUNTS = ['locked_user', 'banned_user'];

/**
 * Kiểm tra thông tin đăng nhập
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
function login(username, password) {
  // Kiểm tra kiểu dữ liệu đầu vào
  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const trimmedUser = username.trim();
  const trimmedPass = password.trim();

  // Không được để trống
  if (!trimmedUser || !trimmedPass) {
    return false;
  }

  // Tài khoản bị khóa
  if (LOCKED_ACCOUNTS.includes(trimmedUser)) {
    return false;
  }

  // So khớp tài khoản và mật khẩu hợp lệ (lưu ý '123' là chuỗi)
  if (trimmedUser === 'admin' && trimmedPass === '1234') {
    return true;
  }

  return false;
}

// Xuất hàm để Jest nhận diện khi chạy test
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { login };
}
