import { useQuery } from "react-query";
import { ProductInterface, UserInterface } from "../../../types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewProduct.css";
import { Check, Close } from "@mui/icons-material";
import { toast } from "react-toastify";

interface Props {
  toggleViewProduct: any;
  paramsId: any;
}

const ViewProduct = ({ toggleViewProduct, paramsId }: Props) => {
  const { data } = useQuery<UserInterface[]>({
    queryKey: ["ViewProduct"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  const [userEmail, setUserEmail] = useState<string>("");
  const [productInfo, setProductInfo] = useState<ProductInterface>();
  const [productQuantity, setProductQuantity] = useState<number>(1);

  console.log(productInfo);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/product/list/${paramsId}`
      );
      setProductInfo(res.data);
    };
    fetch();
  }, [productQuantity]);

  const handleOrderProduct = async () => {
    if (userEmail === "") {
      return alert("please select email");
    }

    if (productInfo && productInfo.quantity) {
      if (productQuantity > productInfo?.quantity) {
        return alert("your quantity is greater than the quantity in stock");
      }
    }

    const totalPrice =
      productInfo?.price && productQuantity
        ? productInfo.price * productQuantity
        : null;

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/order/${userEmail}/create`,
        {
          productName: productInfo?.name,
          productId: paramsId,
          productDescription: productInfo?.description,
          productPrice: productInfo?.price,
          email: userEmail,
          totalPrice: totalPrice,
          quantity: productQuantity,
          products: [
            {
              productId: paramsId,
              quantity: productQuantity,
            },
          ],
        }
      );
      toast.success("Sucessfully ordered!", {
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

  console.log(userEmail);

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Order Product</div>
      <hr style={{ marginBottom: "20px" }} />

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <select
          className="addproduct-input"
          name="email"
          onChange={(e) => setUserEmail(e.target.value)}
          style={{ width: "95%", fontSize: "16px" }}
        >
          <option value="">Select Email based on database</option>
          {data?.map((user) => (
            <option value={user.email}>{user.email}</option>
          ))}
        </select>
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Product Name</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="name"
          value={productInfo?.name}
          disabled
        />
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Product Description</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="description"
          value={productInfo?.description}
          disabled
        />
      </div>
      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Price</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="price"
            value={productInfo?.price}
            disabled
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Quantity</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(parseInt(e.target.value))}
          />
        </div>
      </section>
      <div className="view-product-btn">
        <button className="action-btn view" onClick={handleOrderProduct}>
          <Check />
          Order
        </button>
        <button className="action-btn delete" onClick={toggleViewProduct}>
          <Close /> Close
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
