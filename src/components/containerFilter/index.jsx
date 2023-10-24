import { Card, Divider, Slider } from "antd";
import React from "react";
import ContainerCart from "../containerCart";
import PriceFilter from "../priceFilter";
import Categories from "../categories";
import Tags from "../tags";

const ContainerFilter = () => {
  return (
    <div className="bg-dart-img w-1/3 bg-no-repeat bg-center bg-cover rounded">
      {/* shopping cart */}
      <ContainerCart />
      <Divider />
      {/* price filter */}
      <PriceFilter />
      <Divider />
      {/* categories */}
      <Categories />
      <Divider />
      {/* tags */}
      <Tags />
    </div>
  );
};

export default ContainerFilter;
