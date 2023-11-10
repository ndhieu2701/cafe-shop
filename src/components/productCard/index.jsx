import { Button, Card } from "antd";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cartState from "../../recoil/cart";
import userAtom from "../../recoil/user";
import Cookies from "js-cookie";
import { updateUserCart } from "../../api/cart";
import { useQuery } from "@tanstack/react-query";
import showMessage from "../showMessage";
import { useNavigate } from "react-router";

const { Meta } = Card;

const updateCart = async (userID, products) => {
  const res = await updateUserCart({ userID, products });
  return res;
};

const ProductCard = ({ product, mode }) => {
  const [isHover, setIsHover] = useState(false);
  const [productCart, setProductCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userAtom);
  const isLogin = Boolean(Cookies.get("token"));
  const isInCart = productCart.find((item) => item._id === product._id);
  const navigate = useNavigate();

  const handleChangeCart = async (e) => {
    e.stopPropagation()
    let newProductCart;
    let payloadCart = productCart.map((product) => ({
      product: product._id,
      quantityItem: product.quantityItem,
    }));
    if (!isInCart) {
      newProductCart = [...productCart, { ...product, quantityItem: 1 }];
      payloadCart = [...payloadCart, { product: product._id, quantityItem: 1 }];
    } else {
      newProductCart = productCart.filter((item) => item._id !== product._id);
      payloadCart = payloadCart.filter((item) => item.product !== product._id);
    }
    if (!isLogin) {
      setProductCart(newProductCart);
    } else {
      try {
        setLoading(true);
        const res = await updateCart(user._id, payloadCart);
        if (res.status === 201) {
          const newData = res.cart.products.map((product) => ({
            ...product.product,
            quantityItem: product.quantityItem,
          }));
          setProductCart(newData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
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
        onClick={handleNavigate}
      >
        {isHover && mode && (
          <div className="absolute top-0 left-0 w-full h-full bg-second-color/40 flex items-center justify-center rounded">
            <Button
              type="primary"
              className="shadow-none w-40 h-10 bg-[#2db7f5] text-base"
              onClick={(e) => handleChangeCart(e)}
              loading={loading}
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
