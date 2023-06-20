const router = require("express").Router();
const { police_check } = require("../../middleware");
const provinsiController = require("./controller");

router.get("/provinsi", provinsiController.index);
router.post(
  "/provinsi",
  police_check("create", "category"),
  provinsiController.store
);
router.put(
  "/provinsi/:id",
  police_check("update", "category"),
  provinsiController.update
);
router.delete(
  "/provinsi/:id",
  police_check("delete", "category"),
  provinsiController.destroy
);

module.exports = router;
