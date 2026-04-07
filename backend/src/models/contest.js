import mongoose from 'mongoose'

const ContestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['MERN', 'UI/UX','DIGITAL MARKETING'], 
    required: true 
  },
  startDate: { type: Date, required: true }, 
  deadline: { type: Date, required: true },
  contestlevel:{
    type:String,
    enum:["Easy","Medium","Hard"],
    required:true
  },
  prizePool: { type: String }
}, { 
  timestamps: true,
  
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


ContestSchema.virtual('status').get(function() {
  const now = new Date();

  if (now < this.startDate) {
    return 'upcoming';
  } else if (now >= this.startDate && now <= this.deadline) {
    return 'active';
  } else {
    return 'closed';
  }
});

export const Contest = mongoose.model('Contest', ContestSchema);
