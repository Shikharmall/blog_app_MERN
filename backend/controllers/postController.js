const Post = require("../models/postModel");
const Tag = require("../models/tagModel");
const { body, validationResult } = require("express-validator");

const validateForm = [
  //body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body("email").isEmail().withMessage("Invalid email address"),
  //body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const getPosts = async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.query;

    // Construct the query based on filter
    const query = filter ? { $text: { $search: filter } } : {};

    // Sorting logic
    const sortOptions = sort ? { [sort]: 1 } : {};

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const posts = await Post.find(query)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    const totalCount = await Post.countDocuments(query);

    // Pagination result
    const paginationResult = {};
    if (endIndex < totalCount) {
      paginationResult.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginationResult.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.json({ posts, pagination: paginationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  validateForm,
};
