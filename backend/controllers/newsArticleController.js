const newsArticle = require("../models/newsArticleModel");
const User = require("../models/userModel");
const Contact = require("../models/portfolioContactModel");
const { body, validationResult } = require("express-validator");

const validateForm = [
  //body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body("email").isEmail().withMessage("Invalid email address"),
  //body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const getanalyticsdata = async (req, res) => {
  try {
    const examples = await newsArticle.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCredentials = async (req, res) => {
  try {
    const examples = await User.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check the password
    const user1 = await User.findOne({ password });

    if (!user1) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userPortfolioMessage = async (req, res) => {
  try {
    //const { name, email, message } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const newData = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      // Add other fields as needed
    });

    // Save the data to MongoDB
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getanalyticsdata,
  getCredentials,
  loginUser,
  userPortfolioMessage,
  validateForm,
};
