import { Button, Checkbox, Form, Input, Rate } from "antd";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import userAtom from "../../recoil/user";
import { useState } from "react";
import { createReview } from "../../api/reviews";
import { useLocation } from "react-router-dom";

const FormReview = ({ product, reviews, setReviews }) => {
  const isAuth = Cookies.get("token");
  const user = useRecoilValue(userAtom);
  const [form] = Form.useForm();
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const productID = location.pathname.split("/")[2];

  const changeCheck = () => {
    setCheck(!check);
  };

  const initialState = {
    name: isAuth ? user.username : "",
    email: isAuth ? user.email : "",
    rating: null,
    review: "",
  };

  const submitForm = async (values) => {
    try {
      const payload = { ...values, userID: user._id, productID };
      const res = await createReview(payload);
      if (res.status === 201) {
        setReviews([...reviews, res.review]);
        form.resetFields()
        setCheck(false)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-10 py-10 bg-dart-img border border-t-0 rounded">
      <h1 className="uppercase text-2xl mb-4">Reviews</h1>
      {reviews.length === 0 && (
        <div className="text-base">
          <p className="mb-4">There are no reviews yet.</p>
          <p>
            Be the first to review "
            <span className="lowercase">{product.name}</span>"
          </p>
        </div>
      )}
      <div className="w-full max-h-[300px] overflow-y-auto">
        {reviews.map((review) => (
          <div className="pl-4 my-4" key={review._id}>
            <p className="font-semibold">{review.userID.username}</p>
            <Rate disabled defaultValue={review.rating} />
            <p>{review.review}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 w-full">
        <p className="mb-4 text-base">
          Your email address will not be published. Required fields are marked *
        </p>
        <Form
          name="review-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18, offset: 0 }}
          labelAlign="left"
          labelWrap
          form={form}
          onFinish={submitForm}
          initialValues={initialState}
        >
          <Form.Item
            label="Name"
            name="name"
            className="w-3/5"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input spellCheck="false" allowClear />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="w-3/5"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please input your right email" },
            ]}
          >
            <Input spellCheck={"false"} allowClear />
          </Form.Item>
          <Form.Item
            label="Your rating"
            name="rating"
            className="w-3/5"
            rules={[{ required: true, message: "Please rating this product" }]}
          >
            <Rate allowClear={false} id="review-form_rating" />
          </Form.Item>
          <Form.Item
            label="Your review"
            name="review"
            className="w-3/5"
            rules={[
              {
                required: true,
                message: "Please write a review for this product",
              },
            ]}
          >
            <Input.TextArea
              spellCheck="false"
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
          <div className="w-full my-4 flex items-baseline">
            <Checkbox checked={check} onChange={changeCheck} />
            <p className="ml-2 text-sm">
              I agree that my submitted data is being collected and stored. For
              further details on handling user data, see our{" "}
              {
                <a
                  target="_blank"
                  href="/404"
                  className="underline hover:text-main-color hover:underline"
                >
                  Privacy Policy
                </a>
              }
            </p>
          </div>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-main-color shadow-none font-semibold text-base"
              size="large"
              disabled={!check}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormReview;
