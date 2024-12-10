import { CreateUsers } from './create-users';

describe('CreateUsers', () => {
  it('should create an instance with provided values', () => {
    const userObj = {
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    };

    const user = new CreateUsers(userObj);

    // Provjera da li je instanca klase ispravno inicijalizovana
    expect(user).toBeTruthy();
    expect(user.email).toBe('test@example.com');
    expect(user.username).toBe('testuser');
    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.password).toBe('password123');
  });
});
