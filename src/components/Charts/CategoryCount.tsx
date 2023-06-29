import { useQuery } from "react-query";
import { CategoryInterface } from "../../types/Types";
import axios from "axios";

const CategoryCount = () => {
  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["CategoryCount"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  return (
    <div className="box">
      <h3>Categories</h3>
      <p>{data?.length}</p>
    </div>
  );
};

export default CategoryCount;
