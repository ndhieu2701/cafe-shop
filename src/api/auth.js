import { sendPost } from "./axios";
export const register = (payload) => sendPost("/user/register", payload);
export const login = (payload) => sendPost("/user/login", payload);
export const sendEmailReset = (payload) =>
  sendPost("/user/emailReset", payload);
export const sendCode = (payload) => sendPost("/user/resetCode", payload);
export const sendPass = (payload) => sendPost("/user/resetPass", payload);
