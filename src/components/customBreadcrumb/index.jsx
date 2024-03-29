import React from "react";
import { useLocation } from "react-router-dom";

const CustomBreadCrumb = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split('?')[1])
  const name = decodeURIComponent(searchParams.get('name'))
  const paths = location.pathname.split("/")
  const pathFirst = paths[1][0]?.toUpperCase() + paths[1].slice(1)

  return (
    <div className="w-full min-h-[200px] bg-coffee-bg-breadcrumb bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-semibold pt-9 pb-8 italic">
        ~ {name === 'null' ? paths[1] === "" ? "Coffee Luck" : pathFirst : paths[1] === 'tag' ? `Tag: ${name}`: name} ~
      </h1>
    </div>
  );
};

export default CustomBreadCrumb;
