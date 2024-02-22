const Tour = require('../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour Data from Collection
  const tours = await Tour.find();
  // 2) Build Template
  // 3) Render that template using the tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data for the requested tour (includind reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour
  });
});
