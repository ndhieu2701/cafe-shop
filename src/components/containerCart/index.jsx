import { Card } from "antd";
import React from "react";

const ContainerCart = () => {
  return (
    <Card className="w-full bg-transparent py-2 px-6">
      <h5 className="font-semibold text-xl mb-2">SHOPPING CART</h5>
      <p>No products in the cart.</p>
    </Card>
  );
};

export default ContainerCart;
