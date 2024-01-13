var express = require("express");
var blog_route = express();

//const auth = require("../middleware/auth");
const postController = require("../controllers/blogController");

const bodyParser = require("body-parser");
blog_route.use(bodyParser.json());
blog_route.use(bodyParser.urlencoded({ extended: true }));

/* ---------storing image---------- */

const multer = require("multer");
const path = require("path");

function randomnumber() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/image"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + randomnumber() + ".png";
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

/* ---------add blog route---------- */

blog_route.post("/addBlog", upload.single("image"), postController.addBlog);

/* ---------get all blogs route---------- */

blog_route.get("/getAllBlogs", postController.getAllBlogs);

/* ---------get blogs by  filter, sort, and pagination route---------- */

blog_route.get("/getBlogs", postController.getBlogs);

/* ---------upadte blog view route---------- */

blog_route.patch("/updateView", postController.updateView);

/* ---------search blogs by title & description route---------- */

blog_route.get("/searchBlog", postController.searchBlog);

/* ---------get a blog data---------- */

blog_route.get("/getSingleBlog", postController.getSingleBlog);

/* ---------get top three blog---------- */

blog_route.get("/topThreeBlog", postController.topThreeBlog);

/* ---------get tags of a blog---------- */

blog_route.get("/getTags", postController.getTags);

module.exports = blog_route;
