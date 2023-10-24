import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MyBreadcrumb = ({ pathName }) => {
  const items = [
    {
      key: "Shop",
      title: "Shop",
    },
  ];
  return <Breadcrumb items={items} className="pb-20" />;
};

const CustomBreadCrumb = () => {
  const location = useLocation();
  const pathName = location.pathname.slice(1);

  return (
    <div className="w-full bg-coffee-bg-breadcrumb bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-semibold pt-9 pb-8">
        {pathName === "" ? "SHOP" : pathName.toUpperCase()}
      </h1>
      <MyBreadcrumb pathName={pathName} />
    </div>
  );
};

export default CustomBreadCrumb;
