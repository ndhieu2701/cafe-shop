import { sendGet } from "./axios";


export const getAllTags = () => sendGet('/tags')