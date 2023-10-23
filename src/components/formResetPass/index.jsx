import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendCode, sendEmailReset, sendPass } from "../../api/auth";
import showMessage from "../showMessage";

const initialValues = {
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
};

const FormResetPass = ({ isInputEmail, setIsInputEmail }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [sendedEmail, setSendedEmail] = useState("");
  const [tokenChangePass, setTokenChangePass] = useState("");

  useEffect(() => {
    form.resetFields();
  }, []);

  const submitForm = async (values) => {
    try {
      switch (isInputEmail) {
        case 0:
          const response = await sendEmailReset(values);
          if (response.status === 201) {
            setIsInputEmail(1);
            setSendedEmail(values.email);
            showMessage("success", "Send email success!");
          }
          break;
        case 1:
          const res = await sendCode({ ...values, email: sendedEmail });
          if (res.status === 200) {
            console.log(res);
            setTokenChangePass(res.token);
            setIsInputEmail(2);
            showMessage("success", "Verify code success!");
          }
          break;
        case 2:
          const response2 = await sendPass({
            token: tokenChangePass,
            password: values.password,
          });
          if (response2.status === 200) {
            navigate("/auth");
            showMessage("success", "Change password success!");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      showMessage(
        "error",
        error.response.data ? error.response.data.message : error.message
      );
    }
  };

  const customValidator = (rule, value) => {
    if (!value) {
      return Promise.reject("Please input this field!");
    }
    return Promise.resolve();
  };

  return (
    <Form
      name="form-reset-pass"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18, offset: 0 }}
      labelAlign="left"
      labelWrap
      form={form}
      onFinish={submitForm}
      initialValues={initialValues}
    >
      {isInputEmail === 0 && (
        <Form.Item
          label="Email"
          name="email"
          validateTrigger={["onChange"]}
          rules={[
            { type: "email", message: "Please input your right email!" },
            { validator: customValidator },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      {isInputEmail === 1 && (
        <Form.Item
          label="Code"
          name="code"
          validateTrigger={["onChange"]}
          rules={[{ validator: customValidator }]}
        >
          <Input />
        </Form.Item>
      )}
      {isInputEmail === 2 && (
        <>
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
        </>
      )}
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <button
          className="w-1/2 rounded-md p-1 text-base mx-2 min-w-[100px] cursor-pointer bg-main-color text-white"
          type="submit"
        >
          Send
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormResetPass;
