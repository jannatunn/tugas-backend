const router = require("express").Router();
const { police_check } = require("../../middleware");
const categoryController = require("./controller");

router.get("/categories", categoryController.index);
router.post(
  "/categories",
  police_check("create", "category"),
  categoryController.store
);
router.put(
  "/categories/:id",
  police_check("update", "category"),
  categoryController.update
);
router.delete(
  "/categories/:id",
  police_check("delete", "category"),
  categoryController.destroy
);

module.exports = router;
