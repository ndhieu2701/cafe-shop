import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const ProductCartItem = ({ product }) => {
  return (
    <div className="flex items-center mt-4 ml-2 flex-1 justify-between">
      <div className="w-4/5">
        <h5 className="font-semibold">{product.name}</h5>
        <p className="text-main-color font-semibold">${product.cost}</p>
      </div>
      <div className="mx-4 flex items-center">
        <CloseOutlined />
        <p className="ml-4 text-xl">{product.quantityItem}</p>
      </div>
    </div>
  );
};

export default ProductCartItem;
