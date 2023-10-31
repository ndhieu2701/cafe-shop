import { useLocation } from "react-router-dom";
import ContainerFilter from "../../components/containerFilter";
import ContainerProduct from "../../components/containerProduct";
import CustomLayout from "../../components/customLayout";
import ScrollToTop from "../../components/scrollToTop";
import { useEffect } from "react";
import { scrollTop } from "../../function/scrollTop";

const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    scrollTop();
  }, [location.pathname]);

  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full flex items-start ">
        <ContainerFilter />
        <ContainerProduct />
      </div>
      <ScrollToTop />
    </CustomLayout>
  );
};

export default Home;
