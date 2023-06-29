import { Check, Close } from "@mui/icons-material";
import { OrderInterface, ReturnRequestInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateRequest = ({ toggleModalUpdate, paramsId }: any) => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["AddRequest"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const [orderId, setOderId] = useState<number>(1);
  const [returnRequestInfo, setReturnRequestInfo] =
    useState<ReturnRequestInterface>({
      id: 0,
      productId: 0,
      productName: "",
      productQuantity: 0,
      productPrice: 0,
      reason: "",
      email: "",
    });

  console.log(returnRequestInfo);

  useEffect(() => {
    if (!orderId) return;

    const fetch = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/returnRequest/list/${paramsId}`
        );
        setReturnRequestInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [orderId]);

  const handleSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/returnRequest/create`,
      {
        productName: returnRequestInfo?.productName,
        orderId: returnRequestInfo?.id,
        productId: returnRequestInfo?.productId,
        productPrice: returnRequestInfo?.productPrice,
        productQuantity: returnRequestInfo?.productQuantity,
        reason: returnRequestInfo?.reason,
        email: returnRequestInfo?.email,
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

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setReturnRequestInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          value={returnRequestInfo?.productName}
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
            value={returnRequestInfo?.productPrice}
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
            value={returnRequestInfo?.productQuantity}
            onChange={handleOnChange}
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
          value={returnRequestInfo?.email}
          disabled
        />
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Reason</label>
        <textarea
          className="addproduct-input"
          style={{ width: "95%" }}
          name="reason"
          value={returnRequestInfo.reason}
          onChange={handleOnChange}
        />
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

export default UpdateRequest;
