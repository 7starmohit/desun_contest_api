const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    unique: true 
  },
  contestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contest', 
    required: true 
  },
  leader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
  }],
  submissionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Submission' 
  }
}, { timestamps: true });


TeamSchema.index({ name: 1, contestId: 1 }, { unique: true });

module.exports = mongoose.model('Team', TeamSchema);
