import React, { useEffect, useState } from "react";
import CustomLayout from "../../components/customLayout";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import cartState from "../../recoil/cart";
import { Button, InputNumber, Modal, Table } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { scrollTop } from "../../function/scrollTop";
import selectedProducts from "../../recoil/selectedProduct";
import Cookies from "js-cookie";
import { updateUserCart } from "../../api/cart";
import userAtom from "../../recoil/user";

const Cart = () => {
  const [productCart, setProductCart] = useRecoilState(cartState);
  const [productsChange, setProductsChange] = useState(
    productCart.map((product) => product.quantityItem)
  );
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(productCart.map((item) => false));
  const [selectedProduct, setSelectedProductID] =
    useRecoilState(selectedProducts);
  const navigate = useNavigate();
  const isLogin = Cookies.get("token");
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    scrollTop();
  }, []);

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
  const saveValueChange = async (index, productID) => {
    const newProductCart = [...productCart];
    newProductCart[index] = {
      ...newProductCart[index],
      quantityItem: productsChange[index],
    };
    if (!isLogin) {
      setProductCart(newProductCart);
    } else {
      try {
        const updateProductCart = newProductCart.map((product) => ({
          product: product._id,
          quantityItem: product.quantityItem,
        }));
        const newLoading = [...isLoading];
        newLoading[index] = true;
        setIsLoading(newLoading);
        const res = await updateUserCart({
          userID: user._id,
          products: updateProductCart,
        });
        if (res.status === 201) {
          const newData = res.cart.products.map((product) => ({
            ...product.product,
            quantityItem: product.quantityItem,
          }));
          setProductCart(newData);
          newLoading[index] = false;
          setIsLoading(newLoading);
        }
      } catch (error) {
        newLoading[index] = false;
        setIsLoading(newLoading);
        console.log(error.message);
      }
    }
  };

  const handleCheckout = () => {
    // setSelectedProductID(selectedRowKeys);
    navigate("/checkout");
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedProductID(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedProduct,
    onChange: onSelectChange,
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
              size="large"
              disabled={
                productCart[index].quantityItem === productsChange[index]
              }
              onClick={() => saveValueChange(index, record._id)}
              loading={isLoading[index]}
            />
            <Button
              icon={<DeleteOutlined />}
              size="large"
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
            rowSelection={{ type: "checkbox", ...rowSelection }}
          />
          <Modal
            title="Are you sure removing this product?"
            open={openModalConfirm}
            onOk={() => handleDeleteProduct(selectedID)}
            onCancel={handleChangeOpenModal}
            okButtonProps={{
              className: "bg-main-color shadow-none text-white",
            }}
            centered
          />
          <div className="sticky bottom-0 w-full py-8 pr-4 flex justify-end bg-white border-dashed border-4 rounded-lg z-30">
            <Button
              className="mr-4 shadow-none text-base bg-white"
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
            <Button
              type="primary"
              size="large"
              className="bg-main-color shadow-none text-base"
              onClick={() => handleCheckout()}
              disabled={!selectedProduct.length > 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Cart;
