
import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  contestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contest', 
    required: true,
    index: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  submissionType: { 
    type: String, 
    enum: ['MERN', 'UI/UX'], 
    required: true 
  },

  
  mernData: {
    gitRepoUrl: { type: String, trim: true },
    liveLink: { type: String, trim: true }
  },

  
  uiUxData: {
    files: [{
      url: { type: String }, 
      publicId: { type: String }, 
      fileType: { type: String } 
    }]
  },

  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'winner', 'rejected'], 
    default: 'pending' 
  },
  feedback: { type: String } 
}, { timestamps: true });


SubmissionSchema.index({ contestId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
