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

async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate (
      {_id: req.params.thoughId},
      {$set: req.body},
      {runValidators: true, new: true}
      );

      if (!thought) {
        return res.status(404).json({message: 'No thought with that ID exists'})
      }

      res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

async addReaction (req, res) {
  try {
    const reaction = await Thought.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {reactions: req.body}},
      {runValidators: true, new: true}
      );
      if (!reaction) {
        return res.status(404)
        .json({message: "No thought friend with that ID"})
      }
      res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteReaction (req, res) {
  try {
    const reaction = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: {reactions: { reactionId: req.params.friendId}}},
      {runValidators: true, new: true}
    );
    if (!reaction) {
      return res.status(404).jsaon({message: 'No thought found that that ID'});
    }
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
}

}