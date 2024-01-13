import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
  const [arr1, setArr1] = useState([]);

  useEffect(() => {
    setArr1(JSON.parse(item?.tags_id?.tags));
  }, [item]);

  return (
    <>
      <Link to={`/blog/page/${item._id}`}>
        <img
          /*src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"*/
          src={item.image}
          className="h-56 w-full object-cover"
          alt="img-blog"
        />
        <div className="flex-auto px-6 py-5">
          {/*<span className="mb-2 flex items-center text-sm font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
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
          </span>*/}
          {/*<div className="flex">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-2"
              viewBox="0 0 52 52"
              enable-background="new 0 0 52 52"
              xml:space="preserve"
            >
              <path
                d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2
	c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1
	c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2
	S19.4,2,26,2z"
              />
            </svg>

            <p className="text-base font-light m-2">Abhay Kumar</p>
          </div>*/}
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-label="Tags"
          >
            {arr1 && arr1?.length > 0 ? (
              <>
                {arr1?.map((item, index) => (
                  <p
                    className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </>
            ) : null}
          </div>
          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
            {item?.title?.substring(0, 10)}...
          </h3>
          <p className="mb-4 text-base font-light">
            {item?.description?.substring(0, 50)}...
          </p>
          <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
            Read Now
          </span>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
