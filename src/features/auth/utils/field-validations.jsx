// Validations

//-----------password validations--------------
export const NameValidate = (fullname) => {
  const fullnameErrors = {};

  if (!fullname.trim()) {
    fullnameErrors.fullname = "FullName is required.";
  } else if (fullname.length < 3) {
    fullnameErrors.fullname = "FullName must be at least 3 characters.";
  }

  return fullnameErrors;
};

//-------email validations---------------
export const EmailValidate = (email) => {
  const emailErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email?.trim()) {
    emailErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    emailErrors.email = "Enter a valid email address";
  }

  return emailErrors;
};

//-----------password validations--------------
export const PasswordValidate = (password) => {
  const passwordErrors = {};

  if (!password.trim()) {
    passwordErrors.password = "Password is required.";
  } else if (password.length < 8) {
    passwordErrors.password = "Password must be at least 8 characters.";
  } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    passwordErrors.password = "Password must include letters and numbers.";
  }

  return passwordErrors;
};
