import { Button, Card, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { getMinMaxPrice } from "../../api/priceFilter";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { minMaxPriceAtom } from "../../recoil/product";
import { useLocation, useNavigate } from "react-router-dom";
import showMessage from "../showMessage";

// const getMinMaxPriceProduct = async () => {
//   const res = await getMinMaxPrice();
//   return res;
// };

const PriceFilter = () => {
  const minMaxState = useRecoilValue(minMaxPriceAtom);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const isHavePriceSearch = searchParams.get("minPrice");
  const navigate = useNavigate();

  useEffect(() => {
    setEndValue(minMaxState.max);
    setStartValue(minMaxState.min);
  }, [minMaxState.max, minMaxState.min]);

  const onChange = (values) => {
    setStartValue(values[0]);
    setEndValue(values[1]);
  };

  const handleFilter = () => {
    const updateSearchParams = new URLSearchParams(searchParams);
    updateSearchParams.set("minPrice", startValue);
    updateSearchParams.set("maxPrice", endValue);
    navigate(`${location.pathname}?${updateSearchParams.toString()}`);
  };
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["getMinMaxPrice"],
  //   queryFn: getMinMaxPriceProduct,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setStartValue(data.min);
  //     setEndValue(data.max);
  //   }
  // }, [data]);

  return (
    <Card className="w-full bg-transparent py-2 px-6">
      <h5 className="font-semibold text-xl mb-2">PRICE FILTER</h5>
      <div>
        <Slider
          range
          defaultValue={[minMaxState.min, minMaxState.max]}
          value={[startValue, endValue]}
          min={minMaxState.min}
          max={minMaxState.max}
          onChange={onChange}
        />
        <div className="flex justify-end">
          Price: $
          <span className="text-main-color font-semibold">{startValue}</span> -
          $<span className="text-main-color font-semibold">{endValue}</span>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            className="bg-main-color shadow-none w-1/3 min-h-[40px]"
            onClick={handleFilter}
          >
            Filter
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PriceFilter;
