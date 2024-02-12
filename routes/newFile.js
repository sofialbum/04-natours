const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const { router } = require('./tourRoutes');

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authConroller.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
