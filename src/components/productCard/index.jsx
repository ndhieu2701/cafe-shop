import { Button, Card } from "antd";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import cartState from "../../recoil/cart";
import Cookies from "js-cookie";

const { Meta } = Card;
const ProductCard = ({ product, mode }) => {
  const [isHover, setIsHover] = useState(false);
  const [productCart, setProductCart] = useRecoilState(cartState);
  const isLogin = Boolean(Cookies.get("token"));
  const isInCart = productCart.find((item) => item._id === product._id);

  const handleChangeCart = () => {
    if (!isLogin) {
      return setProductCart((prevCart) => {
        if (!isInCart) {
          return [...prevCart, { ...product, quantityItem: 1 }];
        } else {
          const newCart = prevCart.filter((item) => item._id !== product._id);
          return newCart;
        }
      });
    }
  };

  return (
    <div className="flex items-start gap-8">
      <Card
        hoverable
        cover={
          <img
            alt="product-card"
            src={product.image}
            style={{ width: "100%", height: "100%" }}
          />
        }
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`bg-[#f9f9f5] relative ${!mode ? "w-2/5 mb-6" : ""}`}
      >
        {isHover && mode && (
          <div className="absolute top-0 left-0 w-full h-full bg-second-color/40 flex items-center justify-center rounded">
            <Button
              type="primary"
              className="shadow-none w-40 h-10 bg-[#2db7f5] text-base"
              onClick={handleChangeCart}
            >
              {!isInCart ? "Add to cart" : "Remove in cart"}
            </Button>
          </div>
        )}
        {mode && (
          <Meta
            title={product.name}
            description={product.cost.toFixed(2) + "$"}
            className="font-semibold text-xl text-center"
          />
        )}
      </Card>
      {!mode && (
        <div className="max-w-[60%]">
          <h4 className="text-xl font-semibold">{product.name}</h4>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-main-color">
            ${product.cost.toFixed(2)}
          </p>
          <Button
            type="primary"
            className="shadow-none bg-second-color mt-6 min-w-[120px] h-[40px] text-base text-main-color font-bold"
            onClick={handleChangeCart}
          >
            {!isInCart ? "Add to cart" : "Remove in cart"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
