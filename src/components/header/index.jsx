import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import UserControl from "../userControl";
import { useScroll } from "../../customHook/useScroll";
import { Link } from "react-router-dom";
const { Header } = Layout;

const CustomHeader = () => {
  const isScroll = useScroll();

  const headerStyle = {
    backgroundColor: "#fff",
    color: "#895a42",
    boxShadow: isScroll ? "0px 0px 4px rgba(0, 0, 0, 0.4)" : "none",
    display: "flex",
    minHeight: "auto",
    padding: "50px 16px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  return (
    <Header style={headerStyle}>
      <div className="flex justify-between items-center max-w-[1180px] mx-auto w-full">
        <Link to="/" className="w-[244px] flex items-center justify-center">
          <div className="bg-coffee-logo max-h-[100px] h-[68px] w-full bg-no-repeat bg-center bg-cover"></div>
        </Link>
        <div className="flex items-center text-base">
          {/* card item */}
          <div className="flex items-center font-semibold cursor-pointer mr-3">
            <div className="min-w-[20px] border-main-color border text-center flex items-center h-5 px-3 py-4 rounded bg-main-color text-white mr-2">
              0
            </div>
            Cart: <p className="hover:text-[#fbc65f] ml-2">$0.00</p>
          </div>
          {/* account */}
          <UserControl />
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
