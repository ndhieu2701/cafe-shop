import { Layout } from "antd";
import React from "react";
import CustomHeader from "../../components/header";

const layoutStyle = {
  minHeight: "1000vh"
}
const Home = () => {
  return (
    <Layout style={layoutStyle}>
      <CustomHeader />
    </Layout>
  );
};

export default Home;
