const { police_check } = require("../../middleware");
const cartController = require("./controller");
const router = require("express").Router();

// router.post("/carts", cartController.store);
router.get("/carts", police_check("read", "Cart"), cartController.index);
router.put("/carts", police_check("update", "Cart"), cartController.update);

module.exports = router;
