const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser);


router.route('/:userId/thoughts').post(addAssignment);


router.route('/:userId/thoughts/:thoughtId').delete(removeAssignment);

module.exports = router;
