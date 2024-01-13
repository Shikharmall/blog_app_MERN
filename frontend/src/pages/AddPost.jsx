import React, { useState } from "react";
import Header from "../components/Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addPost } from "../Api/BlogAPI";

export default function AddPost() {
  const [submitloader, setSubmitloader] = useState(false);
  const [images, setImages] = useState(null);

  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isCrop, setIsCrop] = useState(false);

  const options = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Finance", label: "Finance" },
    { value: "Travel", label: "Travel" },
    { value: "Food", label: "Food" },
    { value: "Fashion", label: "Fashion" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Parenting", label: "Parenting" },
    { value: "Fitness", label: "Fitness" },
  ];

  const animatedComponents = makeAnimated();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const handleSelectChange = (selected) => {
    const selectedValuesArray = selected.map((option) => option.value);
    setFormData({
      ...formData,
      tags: selectedValuesArray,
    });
  };

  const onChangeHandlerImage = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    setImage(e.target.files[0]);

    const file = e.target.files[0];
    console.log(e.target.files[0]);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        //setPreviewURL(event.target.result);

        img.onload = () => {
          if (img.height > img.width) {
            setIsCrop(true);
          } else {
            setIsCrop(false);
            setPreviewURL(event.target.result);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function submitHandler(e) {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tags", formData.tags);

    if (previewURL) {
      formDataToSend.append(`image`, image);
    }

    setSubmitloader(true);

    addPost(formDataToSend).then((res) => {
      if (res.status === 201) {
        setSubmitloader(false);
        setPreviewURL(null);
        setImages(null);

        setFormData({
          title: "",
          description: "",
          tags: [],
        });
      } else {
        setSubmitloader(false);
        console.log(res);
      }
    });
  }

  return (
    <>
      <Header />
      <div className="relative overflow-x-auto  sm:rounded-lg p-3" id="movetop">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start p-4 rounded-t dark:border-gray-600">
                <div className="m-2">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                    Add Post
                  </h3>
                </div>
              </div>

              <div className="p-4 pt-1 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block p-3 pr-8 text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border" //border-none
                      placeholder="Add title of your post"
                      //required="true"
                      required
                      onChange={onChangeHandler}
                      value={formData.title}
                      //autoFocus={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="block p-3 pr-8 text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border" //border-none
                      placeholder="Write something about post"
                      //required="true"
                      required
                      onChange={onChangeHandler}
                      value={formData.description}
                      rows={4}
                      style={{ resize: "none" }}
                      //autoFocus={true}
                    />
                    <br />
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <Select
                      styles={{
                        // Add the styles object to set padding
                        control: (provided) => ({
                          ...provided,
                          padding: "5px", // Adjust the padding value as needed
                        }),
                      }}
                      placeholder="Select Tags"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={options}
                      value={options.filter((option) =>
                        formData.tags.includes(option.value)
                      )}
                      onChange={handleSelectChange}
                    />
                  </div>
                </div>

                {previewURL ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="w-full h-full rounded"
                    />
                    <div
                      className="absolute top-2 right-2 bg-black p-3 rounded-full opacity-50 backdrop-blur-xl cursor-pointer"
                      onClick={() => {
                        //setSelectedFile(null);
                        setPreviewURL(null);
                        setImage(null);
                      }}
                    >
                      <svg
                        fill="#ffffff"
                        className="w-4 h-4"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <label htmlFor="image">
                      <div className="bg-gray-200 p-4 m-1 rounded-full cursor-pointer">
                        <svg
                          fill="#505050"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,18a1,1,0,0,1-1-1V14.58l3.3-3.29a1,1,0,0,1,1.4,0L15.41,18Zm15-1a1,1,0,0,1-1,1h-.77l-3.81-3.83.88-.88a1,1,0,0,1,1.4,0L20,16.58Zm0-3.24-1.88-1.87a3.06,3.06,0,0,0-4.24,0l-.88.88L10.12,9.89a3.06,3.06,0,0,0-4.24,0L4,11.76V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1Z" />
                        </svg>

                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="shadow-sm bg-gray-50 hidden border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          //required="true"
                          //required
                          accept=".png, .jpeg, .jpg"
                          onChange={onChangeHandlerImage}
                          value={images ? images.name : ""}
                          //multiple="true"
                        />
                      </div>
                    </label>

                    {isCrop ? (
                      <p className="text-red-500 flex justify-center items-center">
                        Please add horizontal image.
                      </p>
                    ) : null}

                    {/*<div className="bg-gray-200 p-4 m-1 rounded-full cursor-pointer">
                            <svg
                              fill="#505050"
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z" />
                            </svg>
                          </div>*/}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                {submitloader ? (
                  <button
                    disabled=""
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Publishing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submitHandler}
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
