import { Button, Card, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { getMinMaxPrice } from "../../api/priceFilter";
import { useQuery } from "@tanstack/react-query";

const getMinMaxPriceProduct = async () => {
  const res = await getMinMaxPrice();
  return res;
};

const PriceFilter = () => {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(100);

  const onChange = (values) => {
    setStartValue(values[0]);
    setEndValue(values[1]);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMinMaxPrice"],
    queryFn: getMinMaxPriceProduct,
  });

  useEffect(() => {
    if (data) {
      setStartValue(data.min);
      setEndValue(data.max);
    }
  }, [data]);

  return (
    <Card className="w-full bg-transparent py-2 px-6" loading={isLoading}>
      <h5 className="font-semibold text-xl mb-2">PRICE FILTER</h5>
      {isError && <div>Something went wrong...</div>}
      {data && (
        <div>
          <Slider
            range
            defaultValue={[data.min, data.max]}
            value={[startValue, endValue]}
            min={data.min}
            max={data.max}
            onChange={onChange}
          />
          <div className="flex justify-end">
            Price: $
            <span className="text-main-color font-semibold">{startValue}</span>{" "}
            - $<span className="text-main-color font-semibold">{endValue}</span>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              className="bg-main-color shadow-none w-1/3 min-h-[40px]"
            >
              Filter
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PriceFilter;
