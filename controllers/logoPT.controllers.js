import logoPTModels from "../models/logoPT.models.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getLogoPT = async (req, res) => {
  try {
    const logoPT = await logoPTModels.find({}).sort({ createdAt: -1 });
    if (!logoPT) {
      return res.status(404).json({ message: "LogoPT not found" });
    }
    res.status(200).json({ logoPT, success: true });
  } catch (error) {
    console.log("Error getLogoPT", error);
    res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
  }
};

export const createLogoPT = async (req, res) => {
  try {
    const { title } = req.body;

    let logoPTImage = null;

    if (req.file?.logoPTImage) {
      logoPTImage = await uploadToCloudinary(
        req.file.logoPTImage[0].buffer,
        "logoPT",
        req.file.logoPTImage[0].mimetype
      );
    }

    const newLogoPT = await logoPTModels.create({
      title,
      logoPTImage,
    });

    await newLogoPT.save();
    res
      .status(200)
      .json({ message: "LogoPT created", logoPT: newLogoPT, success: true });
  } catch (error) {
    console.log("Error createLogoPT", error);
    res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
  }
};

export const updateLogoPT = async (req, res) => {
  try {
    const { title } = req.body;

    let updateFields = {};

    if (title) updateFields.title = title;

    if (req.file?.logoPTImage) {
      updateFields.logoPTImage = await uploadToCloudinary(
        req.file.logoPTImage[0].buffer,
        "logoPT",
        req.file.logoPTImage[0].mimetype
      );
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update", success: false });
    }

    const updatedLogoPT = await logoPTModels.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedLogoPT) {
      return res
        .status(404)
        .json({ message: "LogoPT not found", success: false });
    }
    res
      .status(200)
      .json({
        message: "LogoPT updated",
        logoPT: updatedLogoPT,
        success: true,
      });
  } catch (error) {
    console.log("Error updateLogoPT", error);
    res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
  }
};

export const deleteLogoPT = async (req, res) => {
  try {
    const deleteLogoPT = await logoPTModels.findByIdAndDelete(req.params.id);
    if (!deleteLogoPT) {
      return res
        .status(404)
        .json({ message: "LogoPT not found", success: false });
    }
    res.status(200).json({ message: "LogoPT deleted", success: true });
  } catch (error) {
    console.log("Error deleteLogoPT", error);
    res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
  }
};
