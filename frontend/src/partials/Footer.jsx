import React from "react";

function Footer() {
  return (
    <footer className="text-slate-500">
      <div className="py-4 text-sm border-t border-slate-300 bg-slate-200">
        <div className="container px-6 mx-auto">
          <div className="flex items-center justify-center">
            <a
              id="WindUI-5-logo-sub"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center col-span-1 gap-2 text-base font-medium leading-6 whitespace-nowrap focus:outline-none md:col-span-4 lg:col-span-6 text-gray-450"
            >
              Analytics © {new Date().getFullYear()}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
