import { sendGet, sendPut } from "./axios";

export const getUserCart = (payload) => sendGet("/cart", payload)
export const updateUserCart = (payload) => sendPut("/cart/update", payload)