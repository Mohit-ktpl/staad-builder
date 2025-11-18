// Validation
export const EmailValidate = ({ email }) => {
  let valid = true;
  const newErrors = { email: "" };

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    newErrors.email = "Email is required";
    valid = false;
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email address";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

// Validation
export const PasswordValidate = ({ password }) => {
  let valid = true;
  const newErrors = { password: "" };

  // Password
  if (!password) {
    newErrors.password = "Password is required.";
    valid = false;
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters.";
    valid = false;
  } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    newErrors.password = "Password must include letters and numbers.";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};
