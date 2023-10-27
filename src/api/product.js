import { sendGet, sendPost } from "./axios";

export const createProduct = (payload) => sendPost("/product", payload);
export const getAllProducts = () => sendGet("/product")
