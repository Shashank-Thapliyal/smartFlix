const emailRegex =
  /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateAuth = (email, password) => {
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid Email Format" };
  }
  if (!passwordRegex.test(password)) {
    return { valid: false, message: "Invalid password Format" };
  }
  return { valid: true };
};
