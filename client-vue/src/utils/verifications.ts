export const verifyLogin = (login: string, length = 4): boolean => {
  if (login && login.length >= length) return true;
  return false;
};

export const verifyEmail = (email: string): boolean => {
  const pattern = /^[A-Z-a-z-0-9.-]+@[A-Z-a-z-0-9]+\.+[a-z]+$/;
  return pattern.test(email);
};

export const verifyPassword = (password: string, length = 6): boolean => {
  if (password && password.length >= length) return true;
  return false;
};

export const verifyPasswordRepeat = (
  password: string,
  repeat: string
): boolean => {
  return password === repeat;
};
