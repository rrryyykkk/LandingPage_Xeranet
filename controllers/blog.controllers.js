import blogModels from "../models/blog.models.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getAllBlogs = async (req, res) => {
  try {
    let { page = 1, limit = 10, search } = req.query;

    // konversi page dan limit ke integer
    page = parseInt(page);
    limit = parseInt(limit);

    const filters = {};
    if (search) filters.title = { $regex: search, $options: "i" };

    // hitung total blog yg ada
    const totalBlogs = await blogModels.countDocuments(filters);

    const blogs = await blogModels
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPage: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    console.log("Error getAllBlogs", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    const blog = await blogModels.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let blogImage = null;

    if (req.file?.blogImage) {
      blogImage = await uploadToCloudinary(
        req.file.blogImage[0].buffer,
        "blog",
        req.file.blogImage[0].mimetype
      );
    }

    const newBlog = await blogModels.create({
      title,
      content,
      author,
      blogImage,
    });

    await newBlog.save();

    res.status(200).json({ message: "Blog created", new: newBlog });
  } catch (error) {
    console.log("Error cretaBlog", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // validasi data
    let updateFields = {};

    // cek ad field yg diisi, dan masukan ke updateFields
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    // edit image
    if (req.file?.blogImage) {
      updateFields.blogImage = await uploadToCloudinary(
        req.file.blogImage[0].buffer,
        "blog",
        req.file.blogImage[0].mimetype
      );
    }

    if (Object.keys(updateFields).length === 0) {
      {
        return res
          .status(400)
          .json({ message: "No data to update", success: false });
      }
    }

    const updatedBlog = await blogModels.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Blog updated", success: true, blog: updatedBlog });
  } catch (error) {
    console.log("Error updateBlog", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleteBlog = await blogModels.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    res.status(200).json({ message: "Blog deleted", success: true });
  } catch (error) {
    console.log("Error deleteBlog", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
