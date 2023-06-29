import axios from "axios";
import { ShipmentInterface } from "../../types/Types";
import { useQuery } from "react-query";

const TotalShipmentCount = () => {
  const { data } = useQuery<ShipmentInterface[]>({
    queryKey: ["TotalShipmentCount"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/shipment/list`)
        .then((res) => res.data),
  });

  return (
    <div className="box">
      <h3>Shipments</h3>
      <p>{data?.length}</p>
    </div>
  );
};

export default TotalShipmentCount;
