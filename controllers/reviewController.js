const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});
