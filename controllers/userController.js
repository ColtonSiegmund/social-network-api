const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

async getUsers(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async getSingleUser(req, res) {
  try {
    const singleUser = await User.findOne({_id: req.params.userId})
    .select('-__v')
    .lean()

    if (!singleUser) {
      return res.status(404).json({ message: "No user with that ID"});
    }
    res.json(singleUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async createUser(req,res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
},

async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({_id: req.params.userId});

    if(!)
  }
}

}