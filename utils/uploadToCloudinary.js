import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import axios from "axios";

// upload file ke cloudinary
export const uploadToCloudinary = async (fileBuffer, file, folder) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("File buffer is empty"));
    }
    const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";

    if (!resourceType) return reject(new Error("Invalid file type"));

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) {
          console.log("upload error:", error);
          return reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

//  valid url
export const isValidImageUrl = (url) => {
  return /^https:\/\/(res\.cloudinary\.com|images\.unsplash\.com|cdn\.example\.com)\//.test(
    url
  );
};

// donwoload dan upload ke cloudinary
export const donwloadAndUpload = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const mimetype = response.headers["content-type"];
    if (!mimetype.startsWith("image/")) {
      throw new Error("invalid image format");
    }

    return await uploadToCloudinary(Buffer.from(response.data), "profile", {
      mimetype,
    });
  } catch (error) {
    console.log("Error downloading image", error);
    throw new Error("Error downloading image");
  }
};
