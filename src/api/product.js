import { sendGet, sendPost } from "./axios";

export const createProduct = (payload) => sendPost("/product", payload);
export const getAllProduct = (payload) => sendGet("/product", payload);
export const getProduct = (params) => sendGet(`/product/${params}`);
