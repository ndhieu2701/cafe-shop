import { Card } from "antd";
import React from "react";
import { getAllCategories } from "../../api/categories";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

const getCategories = async () => {
  const res = await getAllCategories();
  return res.categories;
};

const Categories = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const location = useLocation();
  const paths = location.pathname.split("/");

  return (
    <Card className="w-full bg-transparent py-2 px-6" loading={isLoading}>
      <h5 className="font-semibold text-xl mb-2">CATEGORIES</h5>
      {isError && <div className="text-base">Something went wrong</div>}
      {data &&
        data.map((category) => (
          <div key={category._id} className="flex items-center py-1">
            <span className="w-4 h-4 inline-block border-8 border-transparent border-l-second-color"></span>
            {/* todo: click link => go to link with name and data is id of category */}
            <Link
              to={`/category/${category._id}?name=${encodeURIComponent(
                category.title
              )}`}
              className={`hover:text-second-color text-base ${
                paths[1] === "category" && paths[2] === category._id
                  ? "text-main-color font-bold"
                  : ""
              }`}
            >
              {category.title}
            </Link>
          </div>
        ))}
    </Card>
  );
};

export default Categories;
