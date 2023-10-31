import { Button, Card } from "antd";
import { getAllTags } from "../../api/tags";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const getTags = async () => {
  const res = await getAllTags();
  return res.tags;
};

const Tags = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const location = useLocation();
  const paths = location.pathname.split("/");

  return (
    <Card className="w-full bg-transparent py-2 px-6" loading={isLoading}>
      <h5 className="font-semibold text-xl mb-2">TAGS</h5>
      {isError && <div className="text-base">Something went wrong</div>}
      <div className="flex flex-wrap">
        {data &&
          data.map((tag) => (
            <div className="p-1" key={tag._id}>
              <Button
                type="primary"
                className={`${
                  paths[1] === "tag" && paths[2] === tag._id
                    ? "bg-main-color text-white"
                    : "bg-white text-main-color"
                } shadow-none`}
                onClick={() => navigate(`/tag/${tag._id}?tag-name=${tag.name}`)}
              >
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
