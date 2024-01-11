var express = require('express');
var user_route = express();

const auth = require('../middleware/auth');
const articleController = require('../controllers/newsArticleController');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.get('/analyticsdata', /*auth.islogin ,*/ articleController.getanalyticsdata);
user_route.post('/login', articleController.loginUser); 

user_route.post('/userPortfolioMessage', articleController.validateForm, articleController.userPortfolioMessage); 
user_route.get('/getcredentials', articleController.getCredentials); 


module.exports = user_route;



