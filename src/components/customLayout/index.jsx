import { Layout } from "antd";
import React from "react";
import CustomHeader from "../header";
import CustomBreadCrumb from "../customBreadcrumb";

const CustomLayout = ({ children }) => {
  return (
    <Layout>
      <CustomHeader />
      <CustomBreadCrumb />
      <div className="w-full flex bg-white">
        <div className="max-w-[1180px] mx-auto w-full">{children}</div>
      </div>
    </Layout>
  );
};

export default CustomLayout;
