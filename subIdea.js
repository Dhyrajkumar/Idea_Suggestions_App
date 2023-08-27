const mongoose = require('mongoose');

const subIdeaSchema = new mongoose.Schema({
  text: String,
  parentIdea: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('SubIdea', subIdeaSchema);
