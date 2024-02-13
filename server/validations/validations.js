// validating email
export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// validating string that is digit only
export const containsOnlyDigits = (str) => {
  const digitRegex = /^\d+$/;
  return digitRegex.test(str);
};

// validating string that is alphabet only
export const containsOnlyAlphabets = (str) => {
  const alphabetRegex = /^[a-zA-Z]+$/;
  return alphabetRegex.test(str);
};

// validating string for a password
export const isgoodpassword = (str) => {
  return str.length >= 6;
};
