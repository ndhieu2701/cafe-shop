import { sendPost } from "./axios";
export const register = (payload) => sendPost("/user/register", payload);
export const login = (payload) => sendPost("/user/login", payload);
