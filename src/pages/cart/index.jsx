import React, { useState } from "react";
import CustomLayout from "../../components/customLayout";
import { useRecoilState } from "recoil";
import cartState from "../../recoil/cart";
import { Button, InputNumber, Modal, Table } from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const [productCart, setProductCart] = useRecoilState(cartState);
  const [productsChange, setProductsChange] = useState(
    productCart.map((product) => product.quantityItem)
  );
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [selectedID, setSelectedID] = useState("");

  const handleChangeOpenModal = () => {
    setOpenModalConfirm(!openModalConfirm);
  };

  //   change this function to async await when login
  const handleDeleteProduct = (productID) => {
    //local cart
    const newProductCart = productCart.filter(
      (product) => product._id !== productID
    );
    setProductCart(newProductCart);
    handleChangeOpenModal();
    //global setState
    setSelectedID("");
  };

  const handleIncreaseQuantity = (index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] += 1;
    setProductsChange(newProductsChange);
  };

  const handleDecreaseQuantity = (index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] -= 1;
    setProductsChange(newProductsChange);
  };

  const handleChangeValue = (value, index) => {
    const newProductsChange = [...productsChange];
    newProductsChange[index] = value;
    setProductsChange(newProductsChange);
  };

  //   change this function to async await when login
  const saveValueChange = (index) => {
    const newProductCart = [...productCart];
    newProductCart[index] = {
      ...newProductCart[index],
      quantityItem: productsChange[index],
    };
    setProductCart(newProductCart);
  };

  const products = productCart.map((product) => ({
    key: product._id,
    ...product,
  }));

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      with: 200,
      render: (text, record) => (
        <Link className="hover:text-main-color">{text}</Link>
      ),
    },
    {
      key: "image",
      title: "Image",
      align: "center",
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
        return (
          <div className="flex items-center">
            <Button
              icon={<MinusOutlined />}
              onClick={() => handleDecreaseQuantity(index)}
            />
            <InputNumber
              controls={false}
              value={productsChange[index]}
              onChange={(value) => handleChangeValue(value, index)}
              className="mx-2"
              min={0}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleIncreaseQuantity(index)}
            />
          </div>
        );
      },
    },
    {
      key: "totalPrice",
      title: "Total price",
      align: "center",
      render: (text, record, index) => (
        <p>${(record.cost * productsChange[index]).toFixed(2)}</p>
      ),
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="flex items-center">
            <Button
              icon={<SaveOutlined />}
              className="mr-2"
              disabled={
                productCart[index].quantityItem === productsChange[index]
              }
              onClick={() => saveValueChange(index)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => (
                setSelectedID(record._id), handleChangeOpenModal()
              )}
            />
          </div>
        );
      },
    },
  ];

  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        <h2 className="text-2xl font-semibold text-main-color">
          Products in your cart
        </h2>
        {/* cart container */}
        <div className="pt-10 w-full">
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
            rowSelection={{}}
          />
          <Modal
            title="Are you sure removing this product?"
            open={openModalConfirm}
            onOk={() => handleDeleteProduct(selectedID)}
            onCancel={handleChangeOpenModal}
            okButtonProps={{
              className: "bg-main-color shadow-none text-white",
            }}
          />
        </div>
      </div>
    </CustomLayout>
  );
};

export default Cart;
