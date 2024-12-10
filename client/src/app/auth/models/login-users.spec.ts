import { LoginUsers } from './login-users';

describe('LoginUsers', () => {
  it('should create an instance with provided values', () => {
    const loginObj = {
      email: 'test@example.com',
      password: 'password123'
    };

    const user = new LoginUsers(loginObj);

    // Provjera da li je instanca klase ispravno inicijalizovana
    expect(user).toBeTruthy();
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
  });
});
