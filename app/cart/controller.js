const Product = require("../product/model");
const CartItem = require("../cart-item/model");

const store = async (req, res, next) => {
  try {
    const { items } = req.body;
    const productIds = items.map((item) => item.Product._id);
    console.log("productsIds ===>", productIds);
    const products = await Product.find({ _id: { $in: productIds } });
    let cartItems = items.map((item) => {
      let relatedProduct = products.find(
        (product) => product._id.toString === item.product._id
      );
      return {
        product: relatedProduct._id,
        price: relatedProduct.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.user._id,
        qty: item.qty,
      };
    });

    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { items } = req.body;
    console.log("items ===>", items);

    const productIds = items.map((item) => item._id);
    console.log("productIds ===>", productIds);

    const products = await Product.find({ _id: { $in: productIds } });
    console.log(" products ===> ", products);

    let cartItems = items.map((item) => {
      console.log("item ===>", item);
      let relatedProduct = products.find(
        (product) => product._id.toString() === item._id
      );
      console.log(" relatedProduct ===> ", relatedProduct);
      return {
        product: relatedProduct._id,
        price: relatedProduct.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.user._id,
        qty: 0,
      };
    });
    console.log(" cartItems ===> ", cartItems);

    await CartItem.deleteMany({ user: req.user._id });
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        console.log("item ===>", item.product);
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
    console.log("cartitems tearkhir ===>", cartItems);
    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "validationError") {
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
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    return res.json(items);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { update, index, store };
