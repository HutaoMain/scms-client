import { useQuery } from "react-query";
import { ProductInterface } from "../../types/Types";
import axios from "axios";

const ProductCount = () => {
  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["ProductCount"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  return (
    <div className="box">
      <h3>Products</h3>
      <p>{data?.length}</p>
    </div>
  );
};

export default ProductCount;
