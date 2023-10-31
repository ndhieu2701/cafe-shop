import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getAllTags } from "../../api/tags";
import { getAllCategories } from "../../api/categories";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct } from "../../api/product";
import showMessage from "../../components/showMessage";

const FormAddProduct = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const submitForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("cost", values.cost);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      images.forEach((image) => {
        formData.append("image", image);
      });
      values.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
      values.categories.forEach((category) => {
        formData.append("categories", category);
      });
      const res = await createProduct(formData);
      if (res.status === 201) {
        showMessage("success", res.message);
        form.resetFields();
        setImages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //call api get categories and tags
  const getTags = async () => {
    const res = await getAllTags();
    const formatTags = res.tags.map((tag) => ({
      label: tag.name,
      value: tag._id,
    }));
    setTags(formatTags);
  };

  const getCategories = async () => {
    const res = await getAllCategories();
    const formatCategories = res.categories.map((category) => ({
      label: category.title,
      value: category._id,
    }));
    setCategories(formatCategories);
  };

  useEffect(() => {
    getTags();
    getCategories();
  }, []);

  const props = {
    onRemove: (file) => {
      const index = images.indexOf(file);
      const newFileList = images.slice();
      newFileList.splice(index, 1);
      setImages(newFileList);
    },
    beforeUpload: (file) => {
      setImages([...images, file]);
      return false;
    },
    fileList: images,
    maxCount: 1,
  };

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
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select mode="multiple" allowClear options={tags} />
        </Form.Item>
        <Form.Item label="Categories" name="categories">
          <Select mode="multiple" allowClear options={categories} />
        </Form.Item>
        <Form.Item label="Button submit">
          <button type="submit" className="border p-2 bg-main-color text-white">
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAddProduct;
