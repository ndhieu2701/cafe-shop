import ContainerFilter from "../../components/containerFilter";
import ContainerProduct from "../../components/containerProduct";
import CustomLayout from "../../components/customLayout";
import ScrollToTop from "../../components/scrollToTop";

const Home = () => {
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
