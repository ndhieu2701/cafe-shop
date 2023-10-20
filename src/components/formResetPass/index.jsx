import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailReset } from "../../api/auth";
import showMessage from "../showMessage";

const FormResetPass = ({ isInputEmail, setIsInputEmail }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  }, []);

  const submitForm = async (value) => {
    console.log("heheh");
    try {
      if (isInputEmail) {
        const res = await sendEmailReset(value);
        if (res.status === 201) {
          setIsInputEmail(false);
          showMessage("success", "Send email success!");
        }
      }
      //   if (!isInputEmail) {

      //   }
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  const customValidator = (rule, value) => {
    if (!value) {
      return Promise.reject("Please input your email!");
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
    >
      {isInputEmail && (
        <Form.Item
          initialValue=""
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
      {!isInputEmail && (
        <Form.Item initialValue="">
          <Input />
        </Form.Item>
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
