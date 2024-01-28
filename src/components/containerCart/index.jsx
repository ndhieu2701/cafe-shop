import { Card } from "antd";
import React from "react";
import { ProductItemWrap } from "../productCart";

const ContainerCart = () => {
  return (
    <Card className="w-full bg-transparent py-2 px-6">
      <h5 className="font-semibold text-xl mb-2">SHOPPING CART</h5>
      <ProductItemWrap />
    </Card>
  );
};

export default ContainerCart;
