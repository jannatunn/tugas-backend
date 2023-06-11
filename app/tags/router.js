const router = require("express").Router();
const { police_check } = require("../../middleware");
const tagsController = require("./controller");

router.get("/tags", tagsController.index);
router.get("/tags/:category", tagsController.showTagsByCategory);
router.post("/tags", police_check("create", "Tag"), tagsController.store);
router.put("/tags/:id", police_check("update", "Tag"), tagsController.update);
router.delete(
  "/tags/:id",
  police_check("delete", "Tag"),
  tagsController.destroy
);

module.exports = router;
