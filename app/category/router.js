const router = require("express").Router();
const multer = require("multer");
const { police_check } = require("../../middleware");
const os = require("os");

const categoryController = require("./controller");

router.get("/categories", categoryController.index);
router.post(
  "/categories",
  police_check("create", "category"),
  multer({ dest: os.tmpdir() }).single("image"),
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
