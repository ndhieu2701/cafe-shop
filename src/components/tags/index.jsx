import { Button, Card } from "antd";
import { getAllTags } from "../../api/tags";
import { useQuery } from "@tanstack/react-query";

const getTags = async () => {
  const res = await getAllTags();
  return res.tags;
};

const Tags = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "tags",
    queryFn: getTags,
  });

  return (
    <Card className="w-full bg-transparent py-2 px-6" loading={isLoading}>
      <h5 className="font-semibold text-xl mb-2">TAGS</h5>
      {isError && <div className="text-base">Something went wrong</div>}
      {data &&
        data.map((tag) => (
          <div className="w-full py-1">
            <Button type="primary bg-white text-main-color shadow-none ">
              {tag.name}
            </Button>
            {/* todo: click tag and call api filter by tag */}
          </div>
        ))}
    </Card>
  );
};

export default Tags;
