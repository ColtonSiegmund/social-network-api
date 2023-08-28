// requiring router and our routes to use
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

// telling the router which routes to use
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// exporting the router
module.exports = router;
