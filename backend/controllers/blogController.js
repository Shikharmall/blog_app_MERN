const Blog = require("../models/blogModel");
const Tag = require("../models/tagModel");

/*-----------add blog with multiple tags------------*/

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: "failed",
        error: "Title and description are required",
      });
    }

    const blog = new Blog({
      title: title,
      description: description,
      view: 0,
    });
    //image: req.file.filename,

    const blogData = await blog.save();

    if (blogData) {
      return res.status(201).json({
        status: "success",
        data: blogData,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};


/*-----------get all blogs(including filter, sort and pagination)------------*/

const getBlogs = async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.query;

    // Construct the query based on filter
    const query = filter ? { $text: { $search: filter } } : {};

    // Sorting logic
    const sortOptions = sort ? { [sort]: 1 } : {};

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const Blogs = await Blog.find(query)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    const totalCount = await Blog.countDocuments(query);

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

    res.status(200).json({ Blogs, pagination: paginationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*-----------update view of a blog------------*/

const updateView = async (req, res) => {
  try {
    const { blog_id } = req.body;
    const Blog = await Blog.findById({ _id: blog_id });

    let views = Blog.view;
    views = views + 1;

    const viewUpdate = await Blog.findByIdAndUpdate({_id:blog_id} , { $set:{view:views}});

    if (viewUpdate) {
      res.status(200).json({ status: "success",message: "view updated."});
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = {
  addBlog,
  updateView,
  getBlogs,
};
