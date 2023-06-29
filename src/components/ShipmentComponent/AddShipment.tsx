import { useQuery } from "react-query";
import { OrderInterface } from "../../types/Types";
import axios from "axios";
import { useState } from "react";
import { Check, Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const AddShipment = ({ toggleOpenShipment }: any) => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["addShipment"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const [orderId, setOrderId] = useState<number>();
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/shipment/create`,
        {
          orderId: orderId,
          status: status,
        }
      );
      toast.success("Sucessfully added shipment!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Shipment</div>
      <hr style={{ marginBottom: "20px" }} />
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>ORDER ID</label>
        <select
          className="addproduct-input"
          value={orderId}
          onChange={(e) => setOrderId(parseInt(e.target.value))}
        >
          <option value="">please select order ID</option>
          {data?.map((item, index) => (
            <option value={item.id} key={index}>
              {item.id}
            </option>
          ))}
        </select>
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Status</label>
        <select
          className="addproduct-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">please select staus</option>
          <option value="shipped">Shipping</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleOpenShipment}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddShipment;
