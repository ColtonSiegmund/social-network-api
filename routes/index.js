// importing the router and routes
const router = require('express').Router();
const apiRoutes = require('./api');

// telling the router to use apiRoutes if request is to /api
router.use('/api', apiRoutes);

// a response if the route is incorrect
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
