import { sendGet } from "./axios";

export const getAllCategories = () => sendGet('/categories')