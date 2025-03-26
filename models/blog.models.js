import monggoose from "mongoose";

const blogSchema = new monggoose.Schema(
  {
    blogId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    blogImage: {
      type: String,
    },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", content: "text" });
blogSchema.index({ blogId: 1 });

export default monggoose.model("Blog", blogSchema);