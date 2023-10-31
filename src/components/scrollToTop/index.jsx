import { UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useScroll } from "../../customHook/useScroll";

const ScrollToTop = () => {
  const isScroll = useScroll();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`fixed z-[1000] bottom-16 right-16 w-10 h-10 bg-main-color rounded flex items-center justify-center text-white text-xl cursor-pointer ${
        isScroll ? "block" : "hidden"
      }`}
      onClick={scrollTop}
    >
      <UpOutlined />
    </div>
  );
};

export default ScrollToTop;
