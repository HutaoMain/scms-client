import { useQuery } from "react-query";
import { OrderInterface } from "../../types/Types";
import axios from "axios";
import { useEffect, useState } from "react";

const TotalSalesCount = () => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["totalSalesCount"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const [totalSales, setTotalSales] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const completedOrders = data.filter(
        (item) => item.status === "completed"
      );
      const totalPriceSum = completedOrders.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      setTotalSales(totalPriceSum);
    }
  }, [data]);

  return (
    <div className="box">
      <h3>Sales</h3>
      <p>₱{totalSales}</p>
    </div>
  );
};

export default TotalSalesCount;
