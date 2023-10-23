import { message } from "antd";

const showMessage = (type, content) => {
  message[type](content);
};

export default showMessage;
