import React, { useEffect, useState } from "react";
import { getSingleBlog, topThreeBlogAPI, updateViewAPI } from "../Api/BlogAPI";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import loaderimage from "../image/loader.gif";
import { API_URL_BASE } from "../utils/apiURL";

function BlogPage() {
  const [blogPage, setBlogPage] = useState("");
  const [loader, setLoader] = useState(false);
  const [topThreeBlog, setTopThreeBlog] = useState("");
  const [arr1, setArr1] = useState([]);

  const updateViewFunc = (blog_id) => {
    try {
      updateViewAPI(blog_id).then((res) => {
        if (res.status === 200) {
          //console.log("View Updated!");
        } else {
          console.log(res);
        }
      });
    } catch (error) {}
  };

  const getBlogPageFunc = (id) => {
    setLoader(true);
    try {
      getSingleBlog(id).then((res) => {
        if (res.status === 200) {
          setBlogPage(res?.data?.data);
          updateViewFunc(res?.data?.data?._id);
          setArr1(JSON.parse(res?.data?.data?.tags_id?.tags));
          setLoader(false);
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

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBlogPageFunc(id);
    }
  }, [id]);


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
  return (
    <>
      <Header />

      {loader ? (
        <div className="w-full h-full">
          <div className="flex justify-center p-30  pt-10 pb-10 bg-white dark:bg-gray-800">
            <img src={loaderimage} alt="loader" className="w-20 h-20" />
          </div>
        </div>
      ) : (
        <>
          <main>
            <article>
              <header className="mx-auto max-w-screen-xl pt-28 text-center">
                <p className="text-gray-500">
                  Published {formatDateTime(blogPage?.createdAt)} <span className="text-blue-500"> ({blogPage?.view} views) </span> 
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
                  {arr1 && arr1?.length > 0 ? (
                    <>
                      {arr1?.map((item, index) => (
                        <button
                          className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                          key={index}
                        >
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
                <strong className="text-2xl font-medium">
                  {blogPage?.title}
                </strong>
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

            <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
              {topThreeBlog && topThreeBlog.length > 0 ? (
                <>
                  {topThreeBlog.map((item, index) => (
                    <article
                      className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
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
      )}
    </>
  );
}

export default BlogPage;
