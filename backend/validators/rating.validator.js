const validateRatingInput = (req, res, next) => {
  const { rating, storeId } = req.body;
  const errors = {};

  const ratingNum = Number(rating);
  if (rating === undefined || rating === null) {
    errors.rating = "Rating value is required.";
  } else if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5 || !Number.isInteger(ratingNum)) {
    errors.rating = "Rating must be an integer between 1 and 5.";
  }

  if (!storeId) {
    errors.storeId = "Store ID is required.";
  } else if (isNaN(Number(storeId))) {
    errors.storeId = "Store ID must be a valid number.";
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
  validateRatingInput
};
