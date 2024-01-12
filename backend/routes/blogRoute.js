var express = require('express');
var blog_route = express();

const auth = require('../middleware/auth');
const postController = require('../controllers/blogController');

const bodyParser = require('body-parser');
blog_route.use(bodyParser.json());
blog_route.use(bodyParser.urlencoded({extended:true}));

//user_route.get('/analyticsdata', /*auth.islogin ,*/ articleController.getanalyticsdata);
//router.post('/', upload.single('image'), postController.createPost);


/* ---------add blog route---------- */

blog_route.post('/addblog',postController.addBlog);


/* ---------get blogs route---------- */

blog_route.patch('/getBlogs',postController.updateView);


/* ---------upadte blog view route---------- */

blog_route.patch('/updateView',postController.updateView);


module.exports = blog_route;



