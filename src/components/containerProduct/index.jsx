import { Button, Pagination, Select, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ProductCard from "../productCart";
import { scrollTop } from "../../function/scrollTop";
import { customPagination } from "../../function/pagination";
import useProduct from "../../customHook/useProduct.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { minMaxPriceAtom, productAtom } from "../../recoil/product";
import { useLocation } from "react-router-dom";

const options = [
  { label: "Default sorting", value: 0 },
  { label: "Sort by popularity", value: 1 },
  { label: "Sort by average rating", value: 2 },
  { label: "Sort by latest", value: 3 },
  { label: "Sort by price: low to high", value: 4 },
  { label: "Sort by price: high to low", value: 5 },
];

const ContainerProduct = () => {
  const [mode, setMode] = useState(true);
  const [productState, setProductState] = useRecoilState(productAtom);
  const setMinMaxPrice = useSetRecoilState(minMaxPriceAtom);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [showTotal, setShowTotal] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const isHavePriceQuery = Boolean(searchParams.get("minPrice"));

  const handleShowTotal = (total, range) => {
    setShowTotal(`${range[0]}-${range[1]} of ${total} items`);
  };

  const handleChangeMode = () => {
    setMode(!mode);
  };

  const { data, isLoading, isError, error } = useProduct();

  const handleChangePage = (page) => {
    setPage(page);
    setProductState(customPagination(page, pageSize, data.products));
  };

  useEffect(() => {
    setProductState([]);
    if (data) {
      if (!isHavePriceQuery) {
        setMinMaxPrice({ min: data.minPrice, max: data.maxPrice });
      }
      setProductState(customPagination(page, pageSize, data.products));
    }
  }, [data]);

  useEffect(() => {
    scrollTop();
  }, [page, data]);

  return (
    <div className="w-2/3 ml-8">
      {/* change show mode and filter control */}
      <div className="flex w-full justify-between items-center">
        {/* change show mode */}
        <div className="flex items-center">
          <Button
            icon={<AppstoreOutlined />}
            size="large"
            className={`mr-2 shadow-none ${mode ? "bg-main-color" : ""}`}
            type={mode ? "primary" : "default"}
            onClick={handleChangeMode}
          />
          <Button
            icon={<BarsOutlined />}
            size="large"
            className={`ml-2 shadow-none ${!mode ? "bg-main-color" : ""}`}
            type={!mode ? "primary" : "default"}
            onClick={handleChangeMode}
          />
          <div className="ml-6">Show {showTotal}</div>
        </div>
        {/* filter control */}
        <div className="w-56">
          <Select
            style={{ width: "100%", height: 40 }}
            options={options}
            defaultValue={options[0].value}
          />
        </div>
      </div>
      {/* show product */}
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spin size="large" />
        </div>
      )}
      {isError && <div>Something went wrong</div>}
      <div className={`mt-8 w-full ${mode ? "grid grid-cols-2 gap-4" : ""}`}>
        {productState.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} mode={mode} />
          </div>
        ))}
      </div>
      {data && (
        <div className="my-10 w-full text-center">
          <Pagination
            defaultCurrent={1}
            total={data.products.length}
            defaultPageSize={pageSize}
            current={page}
            onChange={handleChangePage}
            showTotal={(total, range) => handleShowTotal(total, range)}
          />
        </div>
      )}
    </div>
  );
};

export default ContainerProduct;
