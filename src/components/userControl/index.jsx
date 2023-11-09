import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import userAtom from "../../recoil/user";
import cartState from "../../recoil/cart";
import selectedProducts from "../../recoil/selectedProduct";

const UserControl = () => {
  const setUser = useSetRecoilState(userAtom);
  const setCart = useSetRecoilState(cartState);
  const setSeletected = useSetRecoilState(selectedProducts);
  const isAuth = Cookies.get("token");

  const handleLogout = () => {
    setCart([]);
    setSeletected([]);
    Cookies.remove("token");
    Cookies.remove("cart-id")
    setUser({
      _id: "",
      address: "",
      email: "",
      isAdmin: false,
      phoneNumber: "",
      username: "",
    });
  };

  const items = [
    {
      key: "1",
      label: <Link to="/account">My Account</Link>,
    },
    {
      key: "2",
      label: <Link to="/purchase">My purchase</Link>,
    },
    {
      key: "3",
      label: (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];
  return (
    <div>
      {!isAuth && (
        <div className="text-base ml-4">
          <Link to="/auth" className="hover:text-[#fbc65f] font-semibold mr-2">
            Login
          </Link>
          <Link
            to="/auth?register=true"
            className="hover:text-[#fbc65f] font-semibold"
          >
            Register
          </Link>
        </div>
      )}
      {isAuth && (
        <Dropdown menu={{ items }}>
          <Avatar
            icon={<UserOutlined />}
            className="bg-main-color cursor-pointer"
          />
        </Dropdown>
      )}
    </div>
  );
};

export default UserControl;
