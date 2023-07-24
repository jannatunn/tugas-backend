const Categories = require("./model");
const path = require("path");
const config = require("../config");
const fs = require("fs");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.file) {
      console.log("req.file =>", req.file);
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/category/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let category = new Categories({ ...payload, image_url: filename });
          await category.save();
          return res.json(category);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }

          next(err);
        }
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let category = new Categories(payload);
      await category.save();
      console.log("category =>", category);
      return res.json(category);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        err: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let { id } = req.params;
    console.log("req.body =>", req.body);
    console.log("req.file =>", req.file);
    console.log("req.params =>", req.params);

    if (req.file) {
      console.log(req.file);
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/category/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let category = await Categories.findByid(id);
          let currentImage = `${config.rootPath}/public/images/category/${product.image_url}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          category = await Categories.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
          });
          await category.save();
          return res.json(category);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }

          next(err);
        }
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let category = await Categories.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
      return res.json(category);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        err: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let category = await Categories.findByIdAndDelete(req.params.id);
    return res.json(category);
  } catch (err) {
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

const index = async (req, res, next) => {
  try {
    let category = await Categories.find();
    return res.json(category);
  } catch (err) {
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
  store,
  update,
  index,
  destroy,
};
