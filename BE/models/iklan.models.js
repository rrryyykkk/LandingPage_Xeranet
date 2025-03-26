import mongoose from "mongoose";

const iklanSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  iklanImage: {
    type: String,
  },
});

export default mongoose.model("Iklan", iklanSchema);
