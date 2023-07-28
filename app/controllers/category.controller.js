const config = require("../config");
const Categories = require("../models/category.model");
const fs = require("fs");
const path = require("path");

const getCategory = async (req, res, next) => {
  try {
    let category = await Categories.find();
    return res.json(category);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const addCateagory = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/contoh/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let category = await Categories({ ...payload, image_url: filename });
          await category.save();
          return res.json(category);
        } catch (error) {
          if (error && error.name === "ValidationError") {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }
          next(error);
        }
      });
      src.on("error", async () => {
        next(err);
      });
    } else {
      let category = new Categories(payload);
      await category.save();
      return res.json(category);
    }
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const updatedCategory = async (req, res, next) => {
  try {
    let payload = req.body;
    const { id } = req.params;

    if (req.file) {
      let temp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filenanme + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/category/${filename}`
      );

      let src = fs.createReadStream(temp_path);
      let dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let category = await Categories.findById(id);
          let currentImage = `${config.rootPath}/public/images/category/${category.image_url}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          category = await Categories.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
          });
          await category.save();
          return res.json(category);
        } catch (error) {
          fs.unlinkSync(target_path);
          if (error && error.name === "ValidationError") {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }

          next(error);
        }
      });
    }
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    return res.json(category);
  } catch (error) {
    if (err & (err.name === "ValidationError")) {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  getCategory,
  addCateagory,
  updatedCategory,
  deleteCategory,
};
