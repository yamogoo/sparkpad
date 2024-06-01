export const verifyLogin = (login: string): boolean => {
  if (login && login.length >= 4) return true;
  return false;
};

export const verifyEmail = (email: string): boolean => {
  if (email && email.length >= 8) return true;
  return false;
};

export const verifyPassword = (password: string): boolean => {
  if (password && password.length >= 8) return true;
  return false;
};

export const verifyPasswordRepeat = (
  password: string,
  repeat: string
): boolean => {
  if (repeat && repeat.length >= 8) return password === repeat;
  return false;
};
