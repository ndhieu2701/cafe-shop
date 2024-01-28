import CustomLayout from "../../components/customLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, InputNumber, Spin, Tabs } from "antd";
import FormReview from "../../components/formReview";
import ScrollToTop from "../../components/scrollToTop";
import { useEffect, useState } from "react";

const getProductDetail = async (productID) => {
  const res = await getProduct(productID);
  return res.product;
};

const ProductDetails = () => {
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProductDetail", productID],
    queryFn: () => getProductDetail(productID),
  });

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

  if (isError) return navigate("/error");

  const items = [
    {
      label: "Description",
      key: "description",
      children: (
        <div className="text-base px-4 py-10 border border-t-0 bg-dart-img rounded">
          {data?.description}
        </div>
      ),
    },
    {
      label: `Reviews(${reviews.length})`,
      key: "reviews",
      children: (
        <FormReview product={data} reviews={reviews} setReviews={setReviews} />
      ),
    },
  ];

  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spin size="large" />
          </div>
        )}
        {data && (
          <>
            <div className="flex items-start">
              <div className="w-3/10 rounded min-w-[200px]">
                <Image
                  width={"100%"}
                  src={data.image}
                  className="bg-main-color/20 rounded-lg"
                />
              </div>
              <div className="flex-1 ml-10">
                <h2 className="text-2xl font-semibold mb-2 text-black/80">
                  {data.name}
                </h2>
                <p className="text-xl font-semibold text-black/50 mb-6">
                  $ {data.cost}
                </p>
                <p className="text-base mb-6">{data.description}</p>
                <div className="flex">
                  <InputNumber
                    size="large"
                    className="w-1/5 text-base"
                    defaultValue={1}
                    min={1}
                  />
                  <Button
                    size="large"
                    type="primary"
                    className="font-semibold ml-4 bg-main-color shadow-none text-white"
                  >
                    Add to cart
                  </Button>
                </div>
                <div className="mt-8 text-base">
                  <span className="text-second-color font-semibold text-xl italic mr-2">
                    Categories:
                  </span>
                  {data.categories.map((category) => (
                    <Button
                      key={category._id}
                      type="text"
                      className="text-base"
                      onClick={() =>
                        navigate(
                          `/category/${category._id}?name=${encodeURIComponent(
                            category.title
                          )}`
                        )
                      }
                    >
                      {category.title}
                    </Button>
                  ))}
                </div>
                <div className="mt-2 text-base">
                  <span className="text-second-color font-semibold text-xl italic mr-2">
                    Tags:
                  </span>
                  {data.tags.map((tag) => (
                    <Button
                      key={tag._id}
                      type="text"
                      className="text-base"
                      onClick={() =>
                        navigate(
                          `/tag/${tag._id}?name=${encodeURIComponent(tag.name)}`
                        )
                      }
                    >
                      {tag.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="py-10 w-full mt-20">
              <Tabs type="card" items={items} size="large" />
            </div>
          </>
        )}
      </div>
      <ScrollToTop />
    </CustomLayout>
  );
};

export default ProductDetails;
