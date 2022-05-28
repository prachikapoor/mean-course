const express = require("express");

const PostController=require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const router = express.Router();

//i m excepting single file and will pass images as argument
router.post(
  "",
  checkAuth,//not extract image if its not authenticate
  extractFile,
  PostController.createPost
);

router.put(
  "/:id",
  checkAuth,
  extractFile,
PostController.updatePost
);

router.get("", PostController.getPosts);

router.get("/:id",PostController.getPost );

router.delete("/:id", checkAuth,PostController.deletePost );

module.exports = router;//exporting router to make express aware of it
