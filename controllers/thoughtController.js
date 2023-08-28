const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

async getThought(req, res) {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async getSingleThought(req, res) {
  try {
    const singleThought = await Thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .lean()

    if (!singleThought) {
      return res.status(404).json({ message: "No thought with that ID"});
    }
    res.json(singleThought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async createThought(req,res) {
  try {
    const newThought = await Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    res.json(newThought);
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
},

async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

    if(!thought){
      return res.status(404).json({ message: 'No such thought exists' })
    }
    res.json({message: 'Thought deleted!'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
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