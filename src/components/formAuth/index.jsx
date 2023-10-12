import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { login, register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import showMessage from "../showMessage";

const initialValues = {
  email: "",
  password: "",
};

const registerInitValues = {
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  phoneNumber: "",
  username: "",
};

const FormAuth = ({ isLogin, setIsLogin }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submitForm = async (values) => {
    try {
      if (!isLogin) {
        const { confirmPassword, ...payload } = values;
        const res = await register(payload);
        if (res.status === 201) {
          setIsLogin(true);
          showMessage("success", "Register success!");
        }
      } else {
        const res = await login(values);
        if (res.status === 200) {
          Cookies.set("token", res.token);
          showMessage("success", "Login success!");
          navigate("/");
        }
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [isLogin]);

  return (
    <div className="w-full flex-1 px-10">
      <Form
        name="auth-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18, offset: 0 }}
        initialValues={isLogin ? initialValues : registerInitValues}
        labelAlign="left"
        labelWrap
        form={form}
        onFinish={submitForm}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input the right email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Please input your password at least 8 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              {
                min: 8,
                message: "Please input your password at least 8 characters!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
        {!isLogin && (
          <>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Phone number" name="phoneNumber">
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button
            className="w-1/2 rounded-md p-2 border-2 text-center text-xl mx-2 cursor-pointer bg-main-color text-white"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAuth;
