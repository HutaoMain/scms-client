import { Check, Close } from "@mui/icons-material";
import { OrderInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddRequest = ({ toggleOpenReturnRequest }: any) => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["AddRequest"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const [orderId, setOderId] = useState<number>(1);
  const [orderInfo, setOrderInfo] = useState<OrderInterface>();
  const [reason, setReason] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  console.log(orderInfo);

  useEffect(() => {
    if (!orderId) return;

    const fetch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/order/list/${orderId}`
        );
        setOrderInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [orderId]);

  const handleSubmit = async () => {
    if (quantity <= 0) {
      return alert("Please put the quantity");
    }
    if (reason === "") {
      return alert("Please put your reason of return");
    }

    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/returnRequest/create`,
      {
        productName: orderInfo?.productName,
        orderId: orderInfo?.id,
        productId: orderInfo?.productId,
        productPrice: orderInfo?.productPrice,
        productQuantity: quantity,
        reason: reason,
        email: orderInfo?.email,
      }
    );
    toast.success("Sucessfully create a return request!", {
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
  };

  return (
    <div className="addproduct">
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>ORDER ID</label>
        <select
          className="addproduct-input"
          name="orderId"
          value={orderId}
          onChange={(e) => setOderId(parseInt(e.target.value))}
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
        <label>Product Name</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="productName"
          value={orderInfo?.productName}
          disabled
        />
      </div>

      <section
        className="addproduct-item-section"
        style={{ width: "100%", gap: "15px" }}
      >
        <div className="addproduct-item-list" style={{ width: "45%" }}>
          <label>Product Price</label>
          <input
            className="addproduct-input"
            style={{ width: "100%" }}
            type="text"
            name="productPrice"
            value={orderInfo?.productPrice}
            disabled
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "45%" }}>
          <label>Quantity</label>
          <input
            className="addproduct-input"
            style={{ width: "100%" }}
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </section>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Email</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="email"
          value={orderInfo?.email}
          disabled
        />
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Reason</label>
        <textarea
          className="addproduct-input"
          style={{ width: "95%" }}
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="addproduct-btn-container">
        <button
          className="addproduct-btn close"
          onClick={toggleOpenReturnRequest}
        >
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddRequest;
