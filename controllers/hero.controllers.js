import heroModels from "../models/hero.models.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getHero = async (req, res) => {
  try {
    const hero = await heroModels.find({}).sort({ createdAt: -1 });
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    res.status(200).json({ hero, success: true });
  } catch (error) {
    res.status(500).json(console.log("Error getHero", error), {
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const createHero = async (req, res) => {
  try {
    const { title } = req.body;

    let heroImage = null;

    if (req.file?.heroImage) {
      heroImage = await uploadToCloudinary(
        req.file.heroImage[0].buffer,
        "hero",
        req.file.heroImage[0].mimetype
      );
    }

    const newHero = await heroModels.create({
      title,
      heroImage,
    });

    await newHero.save();
    res
      .status(200)
      .json({ message: "Hero created", hero: newHero, success: true });
  } catch (error) {
    console.log("Error createHero", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateHero = async (req, res) => {
  try {
    const { title } = req.body;

    let updateFields = {};

    if (title) updateFields.title = title;

    if (req.file?.heroImage) {
      updateFields.heroImage = await uploadToCloudinary(
        req.file.heroImage[0].buffer,
        "hero",
        req.file.heroImage[0].mimetype
      );
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update", success: false });
    }

    const updatedHero = await heroModels.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedHero) {
      return res
        .status(404)
        .json({ message: "Hero not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Hero updated", hero: updatedHero, success: true });
  } catch (error) {
    console.log("Error updateHero", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteHero = async (req, res) => {
  try {
    const deleteHero = await heroModels.findByIdAndDelete(req.params.id);
    if (!deleteHero) {
      return res
        .status(404)
        .json({ message: "Hero not found", success: false });
    }
    res.status(200).json({ message: "Hero deleted", success: true });
  } catch (error) {
    console.log("Error deleteHero", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
