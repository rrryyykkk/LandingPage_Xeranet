import testimoniModels from "../models/testimoni.models.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getAllTestimoni = async (req, res) => {
  try {
    let { page = 1, limit = 10, search } = req.query;

    // Konversi page dan limit ke integer & validasi
    page = Math.max(parseInt(page), 1);
    limit = Math.max(parseInt(limit), 1);

    const filters = {};
    if (search) filters.author = { $regex: search, $options: "i" };

    // Hitung total testimoni
    const totalTestimoni = await testimoniModels.countDocuments(filters);

    // Query testimoni
    const testimoni = await testimoniModels
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      testimoni,
      currentPage: page,
      totalPage: Math.ceil(totalTestimoni / limit),
      totalTestimoni: totalTestimoni,
    });
  } catch (error) {
    console.error("Error getTestimoni", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTestimoni = async (req, res) => {
  try {
    const { author, content, rating } = req.body;

    let testimoniImage = null;

    if (req.file?.testimoniImage) {
      testimoniImage = await uploadToCloudinary(
        req.file.testimoniImage[0].buffer,
        "testimoni",
        req.file.testimoniImage[0].mimetype
      );
    }

    const newTestimoni = await testimoniModels.create({
      author,
      content,
      testimoniImage,
      rating,
    });

    await newTestimoni.save();
    res
      .status(200)
      .json({
        message: "Testimoni created",
        testimoni: newTestimoni,
        success: true,
      });
  } catch (error) {
    console.log("Error createTestimoni", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateTestimoni = async (req, res) => {
  try {
    const { author, content, rating } = req.body;

    // validasi data
    let updateFields = {};

    // cek ad field yg diisi, dan masukan ke updateFields
    if (author) updateFields.author = author;
    if (content) updateFields.content = content;
    if (rating) updateFields.rating = rating;

    // edit image
    if (req.file?.testimoniImage) {
      updateFields.testimoniImage = await uploadToCloudinary(
        req.file.testimoniImage[0].buffer,
        "testimoni",
        req.file.testimoniImage[0].mimetype
      );
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update", success: false });
    }

    const updatedTestimoni = await testimoniModels.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedTestimoni) {
      return res
        .status(404)
        .json({ message: "Testimoni not found", success: false });
    }

    res
      .status(200)
      .json({
        message: "Testimoni updated",
        testimoni: updatedTestimoni,
        success: true,
      });
  } catch (error) {
    console.log("Error updateTestimoni", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteTestimoni = async (req, res) => {
  try {
    const deleteTestimoni = await testimoniModels.findByIdAndDelete(
      req.params.id
    );
    if (!deleteTestimoni) {
      return res
        .status(404)
        .json({ message: "Testimoni not found", success: false });
    }
    res.status(200).json({ message: "Testimoni deleted", success: true });
  } catch (error) {
    console.log("Error deleteTestimoni", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
