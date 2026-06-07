const validateRegistration = (req, res, next) => {
  const { name, email, password, address, role } = req.body;
  const errors = {};

  if (!name || name.trim().length < 20 || name.trim().length > 60) {
    errors.name = "Name must be between 20 and 60 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (address && address.trim().length > 400) {
    errors.address = "Address must not exceed 400 characters.";
  }

  // Password: 8-16 chars, one uppercase, one special char
  // Regex: 8 to 16 characters, containing at least one uppercase letter, and one special character from the list: [!@#$%^&*(),.?":{}|<>]
  const hasUppercase = /[A-Z]/.test(password || '');
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password || '');
  const isCorrectLength = password && password.length >= 8 && password.length <= 16;

  if (!isCorrectLength || !hasUppercase || !hasSpecial) {
    errors.password = "Password must be 8-16 characters and contain at least one uppercase letter and one special character.";
  }

  // Optional role validation - role can only be ADMIN, USER, or STORE_OWNER
  if (role && !['ADMIN', 'USER', 'STORE_OWNER'].includes(role)) {
    errors.role = "Invalid user role specified.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email) {
    errors.email = "Email is required.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }
  next();
};

const validatePasswordChange = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = {};

  if (!currentPassword) {
    errors.currentPassword = "Current password is required.";
  }

  const hasUppercase = /[A-Z]/.test(newPassword || '');
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword || '');
  const isCorrectLength = newPassword && newPassword.length >= 8 && newPassword.length <= 16;

  if (!isCorrectLength || !hasUppercase || !hasSpecial) {
    errors.newPassword = "New password must be 8-16 characters and contain at least one uppercase letter and one special character.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordChange
};
