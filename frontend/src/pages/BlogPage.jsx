import React, { useEffect, useState } from "react";
import { getBlogPage } from "../Api/BlogAPI";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function BlogPage() {
  const [blogPage, setBlogPage] = useState("");

  const getBlogPageFunc = (id) => {
    try {
      getBlogPage(id).then((res) => {
        if (res.status === 200) {
          setBlogPage(res?.data);
          //setData(res.data);
          //setLoader(false);
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
  console.log(blogPage);
  return (
    <>
      <Header />

      <main>
        <article>
          <header class="mx-auto max-w-screen-xl pt-28 text-center">
            <p class="text-gray-500">Published April 4, 2022</p>
            <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
              7 rules of effective marketing
            </h1>
            <p class="mt-6 text-lg text-gray-700">
              You're doing marketing the wrong way
            </p>
            <div
              class="mt-6 flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Marketing
              </button>
              <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Branding
              </button>
              <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Digital
              </button>
              <button class="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Identity
              </button>
            </div>
            <img
              class="sm:h-[34rem] mt-10 w-full object-contain"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Featured Image"
            />
          </header>

          <div class="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
            <strong class="text-2xl font-medium">{blogPage?.title}</strong>
            <p>{blogPage?.description}</p>
          </div>
        </article>
      </main>

      <div class="w-fit mx-auto mt-10 flex space-x-2">
        <div class="h-0.5 w-2 bg-gray-600"></div>
        <div class="h-0.5 w-32 bg-gray-600"></div>
        <div class="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <aside
        aria-label="Related Articles"
        class="mx-auto mt-10 max-w-screen-xl py-20"
      >
        <h2 class="mb-8 text-center text-5xl font-bold text-gray-900">
          More Blogs
        </h2>

        <div class="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          <article class="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                class="h-56 w-full object-cover"
                alt=""
              />
              <div class="flex-auto px-6 py-5">
                <span class="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Branding
                </span>
                <h3 class="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  How to perform NPS Surveys
                </h3>
                <p class="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>

          <article class="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                class="h-56 w-full object-cover"
                alt=""
              />
              <div class="flex-auto px-6 py-5">
                <span class="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Public Relations
                </span>
                <h3 class="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  Understanding Public Relations
                </h3>
                <p class="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>

          <article class="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                class="h-56 w-full object-cover"
                alt=""
              />
              <div class="flex-auto px-6 py-5">
                <span class="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Marketing
                </span>
                <h3 class="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  Marketing is looking for untapped opportunities
                </h3>
                <p class="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>
        </div>
      </aside>
    </>
  );
}

export default BlogPage;
