const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//Upload Profile Picture
const uploadImageWithCloudinary = async (req, res, next) => {
  try {
    const foldering = `my-asset/${req.file.mimetype.split("/")[0]}`;
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: foldering,
    });
    fs.unlinkSync(req.file.path);
    req.body.profile_picture_url = uploadResult.secure_url;
    req.body.profile_picture_url_publicid = uploadResult.public_id;
    next();
  } catch (error) {
    fs.unlinkSync(req.file.path);
  }
};

//Upload Product Picture
const cloudinaryImageUploadMethodProfile = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        folder: `my-asset/image`,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        }
        resolve({
          res: res.secure_url,
          public_id: res.public_id,
        });
        fs.unlinkSync(file);
      }
    );
  });
};

//Upload Product Picture
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        folder: `my-asset/products`,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        }
        resolve({
          res: res.secure_url,
          public_id: res.public_id,
        });
        fs.unlinkSync(file);
      }
    );
  });
};

const cloudinaryImageDeleteMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(file, (err, res) => {
      if (err) {
        console.log(err);
      }
      resolve({});
    });
  });
};

module.exports = {
  uploadImageWithCloudinary,
  cloudinaryImageUploadMethod,
  cloudinaryImageDeleteMethod,
  cloudinaryImageUploadMethodProfile,
};
