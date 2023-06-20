const Provinces = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let provinsi = Provinces(payload);
    await provinsi.save();
    return res.json(provinsi);
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
    let provinsi = await Provinces.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(provinsi);
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

const destroy = async (req, res, next) => {
  try {
    let provinsi = await Provinces.findByIdAndDelete(req.params.id);
    return res.json(provinsi);
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
    let provinsi = await Provinces.find();
    return res.json(provinsi);
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
