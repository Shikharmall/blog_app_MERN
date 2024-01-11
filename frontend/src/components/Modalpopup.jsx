import React, { useRef, useEffect } from "react";
import Transition from "../utils/Transition";

function ModalSearch({ id, modalOpen, setModalOpen, imgcontent }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  //useEffect(() => {
  //  document.querySelector("html").style.scrollBehavior = "auto";
  //  window.scroll({ top: 0 });
  //  document.querySelector("html").style.scrollBehavior = "";
  //}, [imgcontent]); // triggered on route change

  //useEffect(() => {
  //  const myDiv = document.getElementById("movetop");
  //  myDiv.style.overflowX = "auto";
  //  myDiv.scrollTop = 0;
  //  myDiv.style.overflowX = "";
  //}, []);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <div className="py-4 px-2 w-full h-full" id="movetop">
            <img
              className="h-full w-full rounded border border-black-500"
              src={imgcontent}
              alt="image description"
              ref={searchInput}
            />
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
