export const normalizeEmail = (value) => String(value ?? '').trim().toLowerCase();

export const isAcceptedEmail = (value) => {
  const email = normalizeEmail(value);

  return /^[^\s@]+@[^\s@]+\.com$/.test(email);
};

export const emailValidationMessage =
  'Please enter a valid .com email address, such as name@gmail.com, name@yahoo.com, or name@hotmail.com.';

