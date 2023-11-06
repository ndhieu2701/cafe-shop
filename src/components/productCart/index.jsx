import React from "react";
import { useRecoilValue } from "recoil";
import cartState from "../../recoil/cart";
import { calculatePrice } from "../../function/calculatePrice";
import { Button, Divider, Popover } from "antd";
import ProductCartItem from "../productCartItem";
import { useNavigate } from "react-router-dom";

export const ProductItemWrap = () => {
  const productCart = useRecoilValue(cartState);
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-w-[280px] max-h-[400px] overflow-y-auto">
        {productCart.length === 0 && <p>No product in your cart.</p>}
        {productCart.map((product, index) => (
          <div key={product._id}>
            <ProductCartItem product={product} />
            {index !== productCart.length - 1 && <Divider />}
          </div>
        ))}
      </div>
      <Divider />
      <Button
        type="primary"
        className="bg-main-color font-semibold shadow-none"
        onClick={() => navigate("/cart")}
      >
        View card
      </Button>
    </div>
  );
};

const ProductCart = () => {
  const productCart = useRecoilValue(cartState);

  return (
    <Popover content={<ProductItemWrap />}>
      <div className="flex items-center font-semibold cursor-pointer mr-3">
        <div className="min-w-[20px] border-main-color border text-center flex items-center h-5 px-3 py-4 rounded bg-main-color text-white mr-2">
          {productCart.length}
        </div>
        Cart:
        <p className="hover:text-[#fbc65f] ml-2">
          ${calculatePrice(productCart)}
        </p>
      </div>
    </Popover>
  );
};

export default ProductCart;
