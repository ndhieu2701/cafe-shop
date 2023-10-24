import ContainerFilter from "../../components/containerFilter";
import CustomLayout from "../../components/customLayout";

const Home = () => {
  return (
    <CustomLayout>
      <div className="py-[7.2rem] w-full">
        <ContainerFilter />
      </div>
    </CustomLayout>
  );
};

export default Home;
