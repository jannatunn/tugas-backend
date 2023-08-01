const router = require("express").Router();
const multer = require("multer");
const os = require("os");

const productController = require("./app/controllers/product.controller");
const categoryController = require("./app/controllers/category.controller");
const cartItemsController = require("./app/controllers/cart-items.controller");
const orderController = require("./app/controllers/order.controller");
const invoiceController = require("./app/controllers/invoice.controller");
const deliveryAddressController = require("./app/controllers/deliveryAddress.controller");
const authController = require("./app/controllers/auth.controller");

const { police_check } = require("./middleware/index.js");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

// ===> auth <===
passport.use(
  new LocalStrategy({ usernameField: "email" }, authController.localStrategy)
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.me);

// ===> product <===
router.get("/products", productController.getProduct);
router.post(
  "/product",
  multer({ dest: os.tmpdir() }).single("image"),
  productController.addProduct
);
router.put(
  "/product/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("update", "product"),
  productController.updateProduct
);
router.delete(
  "/product/:id",
  police_check("delete", "product"),
  productController.deleteProduct
);

// ===> category <===
router.get("/categories", categoryController.getCategory);
router.post(
  "/category",
  police_check("create", "category"),
  multer({ dest: os.tmpdir() }).single("image"),
  categoryController.addCateagory
);
router.put(
  "/category/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  categoryController.updatedCategory
);
router.delete("/category/:id", categoryController.deleteCategory);

// ===> cart <===
router.get(
  "/carts",
  police_check("read", "Cart"),
  cartItemsController.getCartItems
);
router.put(
  "/carts",
  police_check("update", "Cart"),
  cartItemsController.updateCartItems
);

// ===> delivery address <===
router.post(
  "/delivery-addresses",
  police_check("create", "DeliveryAddress"),
  deliveryAddressController.store
);
router.put("/delivery-address/:id", deliveryAddressController.update);
router.delete("/delivery-address/:id", deliveryAddressController.destroy);
router.get(
  "/delivery-address",
  police_check("view", "DeliveryAddress"),
  deliveryAddressController.index
);

// ===> order <===
router.get("/orders", police_check("view", "Order"), orderController.getOrder);
router.post(
  "/orders",
  police_check("create", "Order"),
  orderController.addOrder
);

// ===> invoice <===
router.get("/invoices/:order_id", invoiceController.show);

module.exports = router;
