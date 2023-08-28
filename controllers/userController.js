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

    if(!user){
      return res.status(404).json({ message: 'No such user exists' })
    }
    res.json({message: 'User deleted!'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
},

async updateUser (req, res) {
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({message: 'No user with that ID'});
      }
      res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

async addFriend (req, res) {
  try {
    const friend = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends: req.body}},
      {runValidators: true, new: true}
      );
      if (!user) {
        return res.status(404)
        .json({message: "No User friend with that ID"})
      }
      res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteFriend (req, res) {
  try {
    const friend = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: { friendId: req.params.friendId}}},
      {runValidators: true, new: true}
    );
    if (!friend) {
      return res.status(404).jsaon({message: 'No user fround that that ID'});
    }
    res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
}

}