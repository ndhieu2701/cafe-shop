import React, { useEffect, useState } from "react";
import CustomLayout from "../../components/customLayout";
import { Button, Input, Select, Table } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import selectedProducts from "../../recoil/selectedProduct";
import cartState from "../../recoil/cart";
import { filterProductByID } from "../../function/filterProductByID";
import { calculatePrice } from "../../function/calculatePrice";
import userAtom from "../../recoil/user";
import ScrollToTop from "../../components/scrollToTop";
import { createOrder as createOrderApi } from "../../api/order";
import orderPaypalState from "../../recoil/orderPaypal";
import { PayPalButtons } from "@paypal/react-paypal-js";
import showMessage from "../../components/showMessage";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { scrollTop } from "../../function/scrollTop";

const Checkout = () => {
  const user = useRecoilValue(userAtom);
  const isAuth = Cookies.get("token");
  const [deliveryValue, setDeliveryValue] = useState(
    isAuth ? user.address : ""
  );
  const [fullname, setFullname] = useState(isAuth ? user.username : "");
  const [phoneNumber, setPhoneNumber] = useState(
    isAuth ? user.phoneNumber : ""
  );
  const selectedProduct = useRecoilValue(selectedProducts);
  const productCart = useRecoilValue(cartState);
  const [checkout, setCheckout] = useState([]);
  const filterProducts = filterProductByID(productCart, selectedProduct);
  const [selectValue, setSelectValue] = useState("shipcode");
  const [success, setSuccess] = useState(false);
  const setOrderPaypalID = useSetRecoilState(orderPaypalState);
  const orderID = useRecoilValue(orderPaypalState);
  const navigate = useNavigate();

  useEffect(() => {
    setCheckout(filterProducts.map((product) => ({...product, key: product._id})));
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

  const handleChange = (value) => {
    setSelectValue(value);
  };

  const createOrderPaypal = async (data, actions) => {
    const orderID = await actions.order.create({
      purchase_units: [
        {
          items: filterProducts.map((product) => ({
            name: product.name,
            description: product.name,
            sku: product._id,
            quantity: product.quantityItem,
            unit_amount: {
              currency_code: "USD",
              value: product.cost,
            },
          })),
          amount: {
            currency_code: "USD",
            value: calculatePrice(filterProducts),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: calculatePrice(filterProducts),
              },
            },
          },
          description: "Buy in Coffee shop",
        },
      ],
    });
    setOrderPaypalID(orderID);
    return orderID;
  };

  const createOrder = async () => {
    if (phoneNumber === "" || fullname === "" || deliveryValue === "") {
      scrollTop()
      return showMessage("error", "Please filled the the required field!");
    }
    const payload = {
      userID: user._id,
      cartID: Cookies.get("cart-id"),
      fullname,
      phoneNumber,
      address: deliveryValue,
      products: filterProducts.map((product) => ({
        product: product._id,
        quantityItem: product.quantityItem,
      })),
      totalPrice: calculatePrice(filterProducts),
      payment: {
        id: orderID,
        method: selectValue,
        status: selectValue === "shipcode" ? "unpaid" : "paid",
      },
    };

    const res = await createOrderApi(payload);
    if (res.status === 201) {
      setSuccess(false);
      navigate(`/success?id=${res.newOrder._id}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      setSuccess(true);
      return details;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      showMessage("success", "Payment success!");
      createOrder();
    }
  }, [success]);

  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        <div>
          <h2 className="text-2xl font-semibold text-main-color mb-4">
            Delivery
          </h2>
          <label htmlFor="name-input" className="text-base text-main-color">
            Full name
          </label>
          <Input
            id="name-input"
            value={fullname}
            size="large"
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Please enter your full name"
            spellCheck={false}
            allowClear
            className="mb-2"
          />
          <label htmlFor="Address-input" className="text-base text-main-color">
            Address
          </label>
          <Input
            value={deliveryValue}
            onChange={(e) => setDeliveryValue(e.target.value)}
            placeholder="Please enter where you picked up your order"
            size="large"
            spellCheck={false}
            allowClear
            id="Address-input"
            className="mb-2"
          />
          <label htmlFor="phone-number" className="text-base text-main-color">
            Phone number
          </label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Please input your phone number"
            size="large"
            spellCheck={false}
            allowClear
            id="phone-number"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-main-color mb-4 mt-8">
            Your order
          </h2>
          <div className="w-full">
            <Table columns={columns} dataSource={checkout} pagination={false} />
          </div>
          <div className="w-full flex justify-between items-center text-xl mt-6">
            <div className="flex items-center">
              <p className="mr-4">Payment method: </p>
              <Select
                style={{ width: 120 }}
                value={selectValue}
                options={[
                  { value: "shipcode", label: "Ship code" },
                  { value: "paypal", label: "Paypal" },
                ]}
                onChange={handleChange}
              />
            </div>
            <p>
              Total price:
              <span className="text-main-color ml-10">
                ${calculatePrice(checkout)}
              </span>
            </p>
          </div>
          {selectValue === "paypal" && (
            <div className="w-full flex justify-end mt-4">
              <PayPalButtons
                createOrder={createOrderPaypal}
                onApprove={onApprove}
              />
            </div>
          )}
          {selectValue === "shipcode" && (
            <div className="w-full flex justify-end mt-4">
              <Button
                type="primary"
                size="large"
                className="bg-main-color shadow-none min-w-[200px] min-h-[48px]"
                onClick={createOrder}
              >
                Place order
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </CustomLayout>
  );
};

export default Checkout;
