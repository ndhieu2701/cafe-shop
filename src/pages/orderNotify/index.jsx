import { Button, Result } from "antd";
import React from "react";
import { useSetRecoilState } from "recoil";
import selectedProducts from "../../recoil/selectedProduct";
import { useLocation, useNavigate } from "react-router-dom";

const OrderNotify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setSelected = useSetRecoilState(selectedProducts);
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const id = searchParams.get("id")

  const handleClick = () => {
    setSelected([]);
    navigate("/");
  };

  return (
    <Result
      status="success"
      title="Successfully purchased product in our shop!"
      subTitle={`Your order id: ${id}. Thank you very much!`}
      extra={[
        <Button type="primary" size="large" onClick={handleClick} className="bg-main-color shadow-none font-semibold">
          Continue shopping
        </Button>,
      ]}
    />
  );
};

export default OrderNotify;
