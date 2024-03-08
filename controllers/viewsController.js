const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
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

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  // codigo original, como lo hizo jonas.
  // res.status(200).render('login', {
  //   title: 'Log into your account'
  // });
  // yo lo cambio porque si no no me funciona axios con cdn.
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'Log into your account'
    });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
