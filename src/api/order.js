import { sendPost } from "./axios";

export const createOrder = (payload) => sendPost("/order/create", payload)