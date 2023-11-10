import { sendPost } from "./axios";

export const createReview = (payload) => sendPost("/product/review", payload)