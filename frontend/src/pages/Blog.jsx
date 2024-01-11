import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../Api/BlogAPI";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = mergedData.slice(indexOfFirstPost,indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterhoadata = (e) => {
    setSearch(e.target.value);
  };

  const getPostsFunc = () => {
    try {
      getBlogs().then((res) => {
        if (res.status === 200) {
          setPosts(res?.data);
          //setData(res.data);
          //setLoader(false);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const filteredPostsData = posts
    .filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getPostsFunc();
  }, []);

  return (
    <>
      <div className="bg-white pb-5 pt-5 dark:bg-dark lg:pb-5">
        <div className="mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Blogs
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Recent News
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          <div className="col-span-3 md:col-span-1">
            <div className="relative p-2">
              <div>
                <label className="sr-only">End Year:</label>
                <select
                  //value={endYearFilter}
                  //onChange={(e) => applyFilters(e.target.value)}
                  className="block p-3 pr-8  text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border"
                >
                  <option value="">Select Category</option>

                  {/*years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))*/}
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2">
            <div className="relative p-2 box-border">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-3 pl-10 text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border"
                placeholder="Search"
                value={search}
                onChange={filterhoadata}
              />
            </div>
          </div>
        </div>

        <div class="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          {filteredPostsData && filteredPostsData.length > 0 ? (
            <>
              {filteredPostsData.map((item, index) => (
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
        {filteredPostsData && filteredPostsData.length > 0 ? null : (
          <div className="bg-white flex justify-center w-full">
            <h1 className="p-3">No Blog Found..</h1>
          </div>
        )}

        <div
          className="flex flex-row justify-center p-2 bg-white dark:bg-gray-800 rounded-bl-lg rounded-br-lg"
        >

          {posts.length > 0 ? (
            <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {currentPage} of {Math.ceil((posts.length) / postsPerPage)}
            </a>
          ) : (
            <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              0 of 0
            </a>
          )}

          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                {posts.length > 0 ? (
                  <>
                    {currentPage === 1 ? (
                      <a
                        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                        onClick={() =>
                          paginate(Math.ceil((posts.length) / postsPerPage))
                        }
                      >
                        Previous
                      </a>
                    ) : (
                      <a
                        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        Previous
                      </a>
                    )}
                  </>
                ) : (
                  <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer">
                    Previous
                  </a>
                )}
              </li>

              <li>
                {posts.length > 0 ? (
                  <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                    {currentPage}
                  </a>
                ) : (
                  <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                    0
                  </a>
                )}
              </li>

              <li>
                {posts.length > 0 ? (
                  <>
                    {currentPage === Math.ceil((posts.length) / postsPerPage) ? (
                      <a
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                        onClick={() => paginate(1)}
                      >
                        Next
                      </a>
                    ) : (
                      <a
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Next
                      </a>
                    )}
                  </>
                ) : (
                  <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer">
                    Next
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Blog;
