export const verifyLogin = (login: string): boolean => {
  if (login && login.length >= 4) return true;
  return false;
};

export const verifyEmail = (email: string): boolean => {
  const pattern = /^[A-Z-a-z-0-9.-]+@[A-Z-a-z-0-9]+\.+[a-z]+$/;
  return pattern.test(email);
};

export const verifyPassword = (password: string): boolean => {
  if (password && password.length >= 8) return true;
  return false;
};

export const verifyPasswordRepeat = (
  password: string,
  repeat: string
): boolean => {
  return password === repeat;
};
