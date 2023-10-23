import React, { useEffect, useRef, useState } from "react";
import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const CustomHeader = () => {
  const [isScroll, setIsScroll] = useState(false);
  const headerRef = useRef(null);

  const handleScroll = () => {
    if (headerRef.current) {
      if (window.scrollY > 200) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle = {
    backgroundColor: "#fff",
    color: "#895a42",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)",
    minHeight: !isScroll ? "154px" : "80px",
    display: "flex",
    position: "sticky",
    top: "0",
  };

  return (
    <Header style={headerStyle} ref={headerRef}>
      <div className="flex justify-between items-center max-w-[1180px] mx-auto w-full">
        <div className="w-[244px] flex items-center justify-center">
          <div className="bg-coffee-logo max-h-[100px] h-[68px] w-full bg-no-repeat bg-center bg-cover"></div>
        </div>
        <div className="flex items-center">
          {/* card item */}
          <div className="flex items-center font-semibold cursor-pointer mr-3">
            <div className="min-w-[20px] border-main-color border text-center flex items-center h-5 px-3 py-4 rounded bg-main-color text-white mr-2">
              0
            </div>
            Cart: <p className="hover:text-[#fbc65f] ml-2">$0.00</p>
          </div>
          {/* account */}
          <Avatar icon={<UserOutlined />} className="bg-main-color cursor-pointer"/>
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
