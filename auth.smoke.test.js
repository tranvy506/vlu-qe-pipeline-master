const { login } = require('./auth');

describe('Smoke Test - Xác thực luồng đăng nhập chính', () => {
  test('Đăng nhập thành công với tài khoản hợp lệ (admin / 123) -> trả về true', () => {
    expect(login('admin', '123')).toBe(true);
  });
});
