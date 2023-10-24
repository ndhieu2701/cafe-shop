import { Button, Card, Slider } from "antd";
import React, { useState } from "react";

const PriceFilter = () => {
  const [startValue, setStartValue] = useState(20);
  const [endValue, setEndValue] = useState(50);

  const onChange = (values) => {
    setStartValue(values[0]);
    setEndValue(values[1]);
  };

  return (
    <Card className="w-full bg-transparent py-2 px-6">
      <h5 className="font-semibold text-xl mb-2">PRICE FILTER</h5>
      <Slider
        range
        defaultValue={[20, 50]}
        min={20}
        max={50}
        onChange={onChange}
      />
      <div className="flex justify-end">
        Price: ${startValue} - ${endValue}
      </div>
      <div className="flex justify-end mt-4">
        <Button type="primary" className="bg-main-color shadow-none w-1/3 min-h-[40px]">
          Filter
        </Button>
      </div>
    </Card>
  );
};

export default PriceFilter;
