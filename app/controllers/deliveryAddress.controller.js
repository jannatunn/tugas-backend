const { subject } = require("@casl/ability");
const { policyFor } = require("../../utils");
const DeliveryAddress = require("../models/deliveryAddress.model");

const addAddress = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let address = new DeliveryAddress({ ...payload, user: user._id });
    await address.save();
    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.messsage,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    let payload = req.body;
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectaddres = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);
    if (!policy.can("update", subjectaddres)) {
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }
    address = await DeliveryAddress.findByIdAndUpdate(id, payload, {
      new: true,
    });
    console.log("address", address);
    res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectaddres = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);
    if (!policy.can("delete", subjectaddres)) {
      return res.json({
        error: 1,
        message: `You're not allowed to delete this resource`,
      });
    }
    address = await DeliveryAddress.findByIdAndDelete(id);
    res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationnError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const getAddress = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocuments();
    let address = await DeliveryAddress.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");

    return res.json({ data: address, count });
  } catch (err) {
    if (err && err.name === "ValidationError") {
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
  addAddress,
  deleteAddress,
  updateAddress,
  getAddress,
};
