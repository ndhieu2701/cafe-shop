import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getUserCart } from "../api/cart";
import { useRecoilValue } from "recoil";
import userAtom from "../recoil/user";

const getCart = async (userID) => {
  const res = await getUserCart({userID});
  return res;
};

const useCart = () => {
  const isLogin = Cookies.get("token");
  const user = useRecoilValue(userAtom)
  if(!isLogin) return;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserCart", user._id],
    queryFn: () => getCart(user._id)
  });
  const newData = data?.cart?.products?.map((product) => ({...product.product, quantityItem: product.quantityItem}))
  return { data: newData, isLoading, isError, error };
};

export default useCart
