import { sendGet } from "./axios";

export const getMinMaxPrice = () => sendGet("/product/price");
