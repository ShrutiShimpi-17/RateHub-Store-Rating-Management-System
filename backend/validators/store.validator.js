const validateStoreInput = (req, res, next) => {
  const { name, address, ownerId } = req.body;
  const errors = {};

  if (!name || name.trim().length === 0) {
    errors.name = "Store name is required.";
  }

  if (!address || address.trim().length === 0) {
    errors.address = "Store address is required.";
  } else if (address.trim().length > 400) {
    errors.address = "Store address cannot exceed 400 characters.";
  }

  if (ownerId && isNaN(Number(ownerId))) {
    errors.ownerId = "Owner ID must be a valid number.";
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
  validateStoreInput
};
