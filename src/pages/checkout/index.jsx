import React, { useEffect, useState } from "react";
import CustomLayout from "../../components/customLayout";
import { Button, Input, Table } from "antd";
import { useRecoilValue } from "recoil";
import selectedProducts from "../../recoil/selectedProduct";
import cartState from "../../recoil/cart";
import { filterProductByID } from "../../function/filterProductByID";
import { calculatePrice } from "../../function/calculatePrice";
import userAtom from "../../recoil/user";
import ScrollToTop from "../../components/scrollToTop";

const Checkout = () => {
  const user = useRecoilValue(userAtom)
  const [deliveryValue, setDeliveryValue] = useState(user.address);
  const selectedProduct = useRecoilValue(selectedProducts);
  const productCart = useRecoilValue(cartState);
  const [checkout, setCheckout] = useState([]);
  const filterProducts = filterProductByID(productCart, selectedProduct);

  useEffect(() => {
    setCheckout(filterProducts);
  }, []);

  const columns = [
    {
      key: "name",
      title: "Product Name",
      dataIndex: "name",
      with: 200,
      render: (text, record) => (
        <h2 className="hover:text-main-color">{text}</h2>
      ),
    },
    {
      key: "image",
      title: "Image",
      align: "center",
      width: 100,
      dataIndex: "image",
      render: (text, record, index) => (
        <div className="w-[160px]">
          <img src={record.image} alt={record.name} />
        </div>
      ),
    },
    {
      key: "cost",
      title: "Price",
      dataIndex: "cost",
      align: "center",
      render: (text, record, index) => <p>${text.toFixed(2)}</p>,
    },
    {
      key: "quantity",
      title: "Quantity",
      align: "center",
      dataIndex: "quantityItem",
      render: (text, record, index) => {
        return <p>{text}</p>;
      },
    },
    {
      key: "subTotal",
      title: "Subtotal price",
      align: "center",
      render: (text, record, index) => (
        <p>${(record.cost * record.quantityItem).toFixed(2)}</p>
      ),
    },
  ];

  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        <div>
          <h2 className="text-2xl font-semibold text-main-color mb-4">
            Delivery
          </h2>
          <Input
            value={deliveryValue}
            onChange={(e) => setDeliveryValue(e.target.value)}
            placeholder="Please enter where you picked up your order"
            size="large"
            spellCheck={false}
            allowClear
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-main-color mb-4 mt-8">
            Your order
          </h2>
          <div className="w-full">
            <Table columns={columns} dataSource={checkout} pagination={false} />
          </div>
          <div className="w-full flex justify-end text-xl mt-6">
            <p>
              Total price:
              <span className="text-main-color ml-10">
                ${calculatePrice(checkout)}
              </span>
            </p>
          </div>
          <div className="w-full flex justify-end mt-8">
            <Button
              type="primary"
              size="large"
              className="bg-main-color shadow-none min-w-[200px] min-h-[48px]"
            >
              Place order
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </CustomLayout>
  );
};

export default Checkout;
