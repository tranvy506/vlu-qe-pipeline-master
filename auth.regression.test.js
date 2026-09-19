const { login } = require('./auth');

describe('Regression Test - Kiểm tra toàn diện các trường hợp ngoại lệ', () => {
  
  describe('Sai thông tin xác thực', () => {
    test('Trả về false khi sai mật khẩu', () => {
      expect(login('admin', 'wrongpass')).toBe(false);
      expect(login('admin', '1234')).toBe(false);
    });

    test('Trả về false khi sai tên đăng nhập', () => {
      expect(login('wrong_user', '123')).toBe(false);
    });

    test('Trả về false khi sai cả tên đăng nhập và mật khẩu', () => {
      expect(login('user123', 'abc@123')).toBe(false);
    });
  });

  describe('Dữ liệu rỗng và khoảng trắng', () => {
    test('Trả về false khi username rỗng hoặc chỉ có khoảng trắng', () => {
      expect(login('', '123')).toBe(false);
      expect(login('   ', '123')).toBe(false);
    });

    test('Trả về false khi password rỗng hoặc chỉ có khoảng trắng', () => {
      expect(login('admin', '')).toBe(false);
      expect(login('admin', '   ')).toBe(false);
    });

    test('Trả về false khi cả hai đều rỗng', () => {
      expect(login('', '')).toBe(false);
    });
  });

  describe('Ký tự đặc biệt, SQL injection pattern, và Unicode', () => {
    test('Trả về false khi mật khẩu chứa ký tự đặc biệt không trùng khớp', () => {
      expect(login('admin', '123!@#$%^&*()_+')).toBe(false);
    });

    test('Trả về false khi truyền chuỗi injection', () => {
      expect(login("' OR '1'='1", "' OR '1'='1")).toBe(false);
      expect(login('admin', "' OR 1=1--")).toBe(false);
    });

    test('Trả về false khi tên đăng nhập chứa ký tự đặc biệt hoặc emoji', () => {
      expect(login('admin!@#', '123')).toBe(false);
      expect(login('admin😊', '123')).toBe(false);
    });
  });

  describe('Tài khoản bị khóa', () => {
    test('Trả về false khi tài khoản nằm trong danh sách bị khóa', () => {
      expect(login('locked_user', '123')).toBe(false);
      expect(login('banned_user', '123')).toBe(false);
    });
  });

  describe('Kiểu dữ liệu đầu vào không hợp lệ', () => {
    test('Trả về false khi tham số là null hoặc undefined', () => {
      expect(login(null, '123')).toBe(false);
      expect(login('admin', undefined)).toBe(false);
      expect(login(undefined, undefined)).toBe(false);
    });

    test('Trả về false khi tham số không phải là chuỗi (số, boolean, object)', () => {
      expect(login(123, 123)).toBe(false);
      expect(login('admin', 123)).toBe(false);
      expect(login({}, {})).toBe(false);
    });
  });

});
