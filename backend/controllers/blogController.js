const Blog = require("../models/blogModel");
const Tag = require("../models/tagModel");

/*-----------add blog with multiple tags------------*/

const addBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

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
      /* ------adding array of tags-------- */

      /*const tags = new Tag({
        blog_id: blogData._id,
        tags: req.body.tags,
      });

      const tagsData = await tags.save();

      if (tagsData) {*/
      return res.status(201).json({
        status: "success",
        data: blogData,
      });
      //}
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};

/*-----------get all blogs------------*/

const getAllBlogs = async (req, res) => {
  try {
    const alldata = await Blog.find();

    res.status(200).json({ status: "success", data: alldata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*-----------get blogs by filter, sort, and pagination------------*/

const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      filterdata,
    } = req.query;

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Calculate the skip value for pagination
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const paginatedData = await Blog.find({
      $or: [
        { title: { $regex: filterdata, $options: "i" } }, // Case-insensitive search for name
        { description: { $regex: filterdata, $options: "i" } }, // Case-insensitive search for description
      ],
    })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit, 10));

    res.status(200).json({ status: "success", data: paginatedData });
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

    const viewUpdate = await Blog.findByIdAndUpdate(
      { _id: blog_id },
      { $set: { view: views } }
    );

    if (viewUpdate) {
      res.status(200).json({ status: "success", message: "view updated." });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};

/*-----------searching blogs by title and description------------*/

const searchBlog = async (req, res) => {
  const query = req.query.titleDescriptionFilter;

  try {
    const data = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search for name
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search for description
      ],
    });

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
};

/*-----------get blogs by filter, sort, and pagination------------*/

const getSingleBlog = async (req, res) => {
  try {
    const { blog_id } = req.query;

    const blogData = await Blog.findById({ _id: blog_id });

    res.status(200).json({ status: "success", data: blogData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBlog,
  updateView,
  getBlogs,
  searchBlog,
  getAllBlogs,
  getSingleBlog
};
