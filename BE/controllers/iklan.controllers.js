import iklanModels from "../models/iklan.models.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";


export const getIklan = async (req, res) => {
    try {
        const iklan = await iklanModels.find({}).sort({ createdAt: -1 });
        if (!iklan) {
            return res.status(404).json({ message: "Iklan not found" });
        }
        res.status(200).json({ iklan, success: true });
    } catch (error) {
        console.log("Error getIklan", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createIklan = async (req, res) => {
    try {
        const { title } = req.body;

        let iklanImage = null;

        if (req.file?.iklanImage) {
            iklanImage = await uploadToCloudinary(
                req.file.iklanImage[0].buffer,
                "iklan",
                req.file.iklanImage[0].mimetype
            );
        }

        const newIklan = await iklanModels.create({
            title,
            iklanImage,
        }); 

        await newIklan.save();
        res.status(200).json({ message: "Iklan created", iklan: newIklan,success:true });
    } catch (error) {
        console.log("Error createIklan", error);
        res.status(500).json({ message: "Internal server error",success:false, error: error.message });
    }
}

export const updateIklan = async (req, res) => {
    try {
        const { title } = req.body;

        let updateFields = {};

        if (title) updateFields.title = title;

        if (req.file?.iklanImage) {
            updateFields.iklanImage = await uploadToCloudinary(
                req.file.iklanImage[0].buffer,  
                "iklan",
                req.file.iklanImage[0].mimetype
            );
        }

        if (Object.keys(updateFields).length === 0) {
            return res
                .status(400)
                .json({ message: "No data to update", success: false });
        }

        const updatedIklan = await iklanModels.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedIklan) {
            return res
                .status(404)
                .json({ message: "Iklan not found", success: false });
        }
        res.status(200).json({ message: "Iklan updated", iklan: updatedIklan,success:true });
        
    } catch (error) {
        console.log("Error updateIklan", error);
        res.status(500).json({ message: "Internal server error",success:false, error: error.message });
    }
}

export const deleteIklan = async (req, res) => {
    try {
        const deleteIklan = await iklanModels.findByIdAndDelete(req.params.id);
        if (!deleteIklan) {
            return res
                .status(404)
                .json({ message: "Iklan not found", success: false });
        }
        res.status(200).json({ message: "Iklan deleted", success: true });
    } catch (error) {
        console.log("Error deleteIklan", error);
        res.status(500).json({ message: "Internal server error",success:false });
    }
}