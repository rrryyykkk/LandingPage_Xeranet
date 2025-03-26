import mongoose from "mongoose";

const logoPTSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  logoPTImage: {
    type: String,
  },
});

export default mongoose.model("LogoPT", logoPTSchema);
