const Blog = require("../models/blogModel");
const Tag = require("../models/tagModel");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const s3 = new aws.S3();

/*-----------add blog with multiple tags------------*/

const addBlog = async (req, res) => {
  const { title, description, tags } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res.status(400).json({
      status: "failed",
      error: "Title and description are required",
    });
  }

  if (!tags || tags === '[]') {
    return res.status(400).json({
      status: "failed",
      error: "Tags are required",
    });
  }

  if (!file) {
    return res.status(400).json({
      status: "failed",
      error: "Image required",
    });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    if (data) {
      const tagsData = new Tag({
        tags: tags,
      });

      const tagsSavedData = await tagsData.save();

      if (tagsSavedData) {
        const blog = new Blog({
          title: title,
          description: description,
          view: 0,
          image: data.Location,
          tags_id: tagsSavedData._id,
        });

        const blogData = await blog.save();

        if (blogData) {
          return res.status(201).json({
            status: "success",
            data: blogData,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Error uploading file to S3" });
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
      .limit(parseInt(limit, 10))
      .populate("tags_id");

    res.status(200).json({ status: "success", data: paginatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*-----------update view of a blog------------*/

const updateView = async (req, res) => {
  try {
    const { blog_id } = req.query;
    const blog = await Blog.findById({ _id: blog_id });

    let views = blog.view;
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

    const blogData = await Blog.findById({ _id: blog_id }).populate("tags_id");

    res.status(200).json({ status: "success", data: blogData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*-----------get top three blogs------------*/

const topThreeBlog = async (req, res) => {
  try {
    const topThreeViewedPosts = await Blog.find()
      .sort({ view: -1 })
      .populate("tags_id")
      .limit(3);

    res.status(200).json({ status: "success", data: topThreeViewedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*-----------get blog Tags------------*/

const getTags = async (req, res) => {
  try {
    const { blog_id } = req.query;
    const getBlogTags = await Tag.find({ blog_id: blog_id });

    res.status(200).json({ status: "success", data: getBlogTags });
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
  getSingleBlog,
  topThreeBlog,
  getTags,
};
