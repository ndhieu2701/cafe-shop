import ContainerFilter from "../../components/containerFilter";
import CustomLayout from "../../components/customLayout";
import ScrollToTop from "../../components/scrollToTop";

const Home = () => {
  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        <ContainerFilter />
      </div>
      <ScrollToTop />
    </CustomLayout>
  );
};

export default Home;
