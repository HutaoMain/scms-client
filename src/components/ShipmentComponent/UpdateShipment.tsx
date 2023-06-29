import { useQuery } from "react-query";
import { OrderInterface, ShipmentInterface } from "../../types/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const UpdateShipment = ({ toggleModalUpdate, paramsId }: any) => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["addShipment"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const [shipmentInfo, setShipmentInfo] = useState<ShipmentInterface>({
    shipmentId: 0,
    email: "",
    shipmentStatus: "",
    orderId: 0,
    orderTotalPrice: 0,
    orderProductName: "",
    orderProductDescription: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/shipment/list/${paramsId}`
      );
      setShipmentInfo(res.data);
    };
    fetch();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/shipment/update/${paramsId}`,
        {
          orderId: shipmentInfo?.orderId,
          status: shipmentInfo?.shipmentStatus,
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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;

    setShipmentInfo((prevState) => ({
      ...prevState,
      [name]: name === "orderId" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Shipment</div>
      <hr style={{ marginBottom: "20px" }} />
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>ORDER ID</label>
        <select
          className="addproduct-input"
          name="orderId"
          value={shipmentInfo.orderId}
          onChange={handleSelect}
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
          name="shipmentStatus"
          value={shipmentInfo?.shipmentStatus}
          onChange={handleSelect}
        >
          <option value="">please select status</option>
          <option value="shipping">Shipping</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleModalUpdate}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateShipment;
