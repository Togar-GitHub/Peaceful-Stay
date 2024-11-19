const router = require('express').Router();

const { restoreUser, requireAuth } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null


const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const spotImageRouter = require('./spotImages.js');
const reviewImageRouter = require('./reviewImages.js');

router.use(restoreUser);

router.use('/session', sessionRouter);    // to login and logout into the session
router.use('/users', usersRouter);
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/spot-images', spotImageRouter);
router.use('/review-images', reviewImageRouter);

router.get('/test', requireAuth, (req, res) => {
  res.json ({ message: 'success' })
});

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;