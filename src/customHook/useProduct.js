import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../api/product";
import { useLocation } from "react-router-dom";

// const getAllProduct = async () => {
//   const res = await getAllProducts();
//   return res.products;
// };

const getProducts = async (payload) => {
  const res = await getAllProduct(payload);
  return res;
};

const useProduct = () => {
  const location = useLocation();
  const filterWith = location.pathname.split("/")[1];
  const filterID = location.pathname.split("/")[2];
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get('sort')

  const payload = new Object();
  payload[filterWith] = filterID;
  if (maxPrice && minPrice) {
    payload.minPrice = minPrice;
    payload.maxPrice = maxPrice;
  }
  if(sort){
    payload.sort = sort
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getFilterProductQuery", filterID, filterWith, minPrice, maxPrice, sort],
    queryFn: () => getProducts(payload),
  });
  return { data, isLoading, isError, error };
};

export default useProduct;
