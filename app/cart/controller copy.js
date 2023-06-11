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

    const productIds = items.map((item) => item.map((i) => i._id));
    console.log("productIds ===>", productIds);

    const products = await Product.find({ _id: { $in: productIds } });
    console.log(" products ===> ", products);

    let cartItems = items.map((item) => {
      console.log(" cartItems ===> ", cartItems);
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
    console.log(" cartItems ===> ", cartItems);
    console.log(" deleteCartItem ==> ", deleteCartItem);

    await CartItem.deleteMany({ user: req.user._id });
    // const deleteCartItem = Cartitem.deleteMany({ ... })
    console.log(" deleteCartItem ==> ", deleteCartItem);
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
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
