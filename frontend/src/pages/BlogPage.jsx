import React, { useEffect, useState } from "react";
import { getBlogTagsAPI, getSingleBlog, topThreeBlogAPI } from "../Api/BlogAPI";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const [blogPage, setBlogPage] = useState("");
  const [topThreeBlog, setTopThreeBlog] = useState("");
  const [blogTags, setBlogTags] = useState("");

  const [formData, setFormData] = useState({
    blog_id: "",
  });

  const getBlogPageFunc = (id) => {
    try {
      getSingleBlog(id).then((res) => {
        if (res.status === 200) {
          setBlogPage(res?.data?.data);
          //setData(res.data);
          //setLoader(false);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const topThreeBlogFunc = () => {
    try {
      topThreeBlogAPI(id).then((res) => {
        if (res.status === 200) {
          setTopThreeBlog(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const getBlogTagsFunc = () => {
    try {
      getBlogTagsAPI(id).then((res) => {
        if (res.status === 200) {
          setBlogTags(res?.data?.data[0]?.tags);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const { id } = useParams();

  /*const updateViewFunc = (id) => {
    console.log(id);
    setFormData({
      blog_id: id,
    });
    try {
      updateViewFunc(formData).then((res) => {
        if (res.status === 200) {
          //setTopThreeBlog(res?.data?.data);
          console.log("View Updated!");
        } else {
          console.log("Failed!");
        }
      });
    } catch (error) {}
  };*/

  useEffect(() => {
    if (id) {
      getBlogPageFunc(id);
      getBlogTagsFunc(id);
      //updateViewFunc(id);
    }
  }, [id]);

  //console.log(formData);

  useEffect(() => {
    topThreeBlogFunc();
  }, []);

  function formatDateTime(timestamp) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      //hour: "numeric",
      //minute: "numeric",
      //second: "numeric",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }

  console.log(blogTags);
  return (
    <>
      <Header />

      <main>
        <article>
          <header className="mx-auto max-w-screen-xl pt-28 text-center">
            <p className="text-gray-500">
              Published {formatDateTime(blogPage?.createdAt)}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
              {blogPage?.title}
            </h1>
            {/*<p className="mt-6 text-lg text-gray-700">
              You're doing marketing the wrong way
  </p>*/}
            <div
              className="mt-6 flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              {blogPage?.tags_id?.tags && blogPage?.tags_id?.tags?.length > 0 ? (
                <>
                  {blogPage?.tags_id?.tags?.map((item, index) => (
                    <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200" key={index}>
                      {item}
                    </button>
                  ))}
                </>
              ) : null}
            </div>
            <img
              className="sm:h-[34rem] mt-10 w-full object-contain"
              src={blogPage.image}
              alt="Featured Image"
            />
          </header>

          <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
            <strong className="text-2xl font-medium">{blogPage?.title}</strong>
            <p className="text-justify">{blogPage?.description}</p>
          </div>
        </article>
      </main>

      <div className="w-fit mx-auto mt-10 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <aside
        aria-label="Related Articles"
        className="mx-auto mt-10 max-w-screen-xl py-20"
      >
        <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
          Top Viewed Post
        </h2>

        <div class="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          {topThreeBlog && topThreeBlog.length > 0 ? (
            <>
              {topThreeBlog.map((item, index) => (
                <article
                  class="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
                  key={index}
                >
                  <BlogCard item={item} />
                </article>
              ))}
            </>
          ) : null}
        </div>
      </aside>
    </>
  );
}

export default BlogPage;
