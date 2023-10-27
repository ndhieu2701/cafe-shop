import { Button, Card } from "antd";
import { getAllTags } from "../../api/tags";
import { useQuery } from "@tanstack/react-query";

const getTags = async () => {
  const res = await getAllTags();
  return res.tags;
};

const Tags = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return (
    <Card className="w-full bg-transparent py-2 px-6" loading={isLoading}>
      <h5 className="font-semibold text-xl mb-2">TAGS</h5>
      {isError && <div className="text-base">Something went wrong</div>}
      <div className="flex flex-wrap">
        {data &&
          data.map((tag) => (
            <div className="p-1" key={tag._id}>
              <Button type="primary bg-white text-main-color shadow-none ">
                {tag.name}
              </Button>
              {/* todo: click tag and call api filter by tag */}
            </div>
          ))}
      </div>
    </Card>
  );
};

export default Tags;
