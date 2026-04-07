import Contest from '../models/contest.js';
import Submission from '../models/submission.js';
import cloudinary from '../config/cloudinary.js';

export const deleteContest = async (req, res) => {
  try {
    const { id } = req.params;

    
    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found!" });
    }

    
    const submissions = await Submission.find({ contestId: id });

    
    for (const sub of submissions) {
      if (sub.submissionType === 'UI/UX' && sub.uiUxData?.files) {
        for (const file of sub.uiUxData.files) {
          if (file.publicId) {
            await cloudinary.uploader.destroy(file.publicId);
          }
        }
      }
    }

   
    await Submission.deleteMany({ contestId: id });
    await Contest.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Contest and all related submissions deleted successfully!"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
