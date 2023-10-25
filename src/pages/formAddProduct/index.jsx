import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

const FormAddProduct = () => {
  const [form] = Form.useForm();
  const submitForm = async (values) => {

  }

  //call api get categories and tags
  
  return (
    <div className="max-w-[1180px] w-full mx-auto mt-20">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18, offset: 0 }}
        form={form}
        labelAlign="left"
        labelWrap
        onFinish={submitForm}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Cost" name="cost">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <input type="file" />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Input />
        </Form.Item>
        <Form.Item label="Categories" name="categories">
          <Input />
        </Form.Item>
        <Form.Item label="Button submit">
          <button type="submit" className="border p-2 bg-main-color text-white">Submit</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAddProduct;
