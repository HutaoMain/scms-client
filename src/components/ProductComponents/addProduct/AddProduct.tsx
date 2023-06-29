import axios from "axios";
import { CategoryInterface, ProductInterface } from "../../../types/Types";
import "./AddProduct.css";
import { Close, Check } from "@mui/icons-material";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface props {
  toggleProductModal: () => void;
}

const AddProduct = ({ toggleProductModal }: props) => {
  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["addProduct"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  const [addProductInfo, setAddProductInfo] = useState<ProductInterface>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
    quantity: 0,
    price: 0,
    createdDate: new Date(),
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAddProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/product/${
          addProductInfo.categoryId
        }/create`,
        { ...addProductInfo }
      );
      toast.success("Sucessfully added product!", {
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

  console.log(addProductInfo);

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Product</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Name</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="name"
            value={addProductInfo.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category</label>
          <select
            className="addproduct-input"
            name="category"
            value={addProductInfo.categoryId}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                categoryId: parseInt(e.target.value),
              }));
            }}
          >
            <option value="">please select category</option>
            {data?.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Description</label>
        <input
          className="addproduct-input"
          type="text"
          name="description"
          value={addProductInfo.description}
          onChange={onChangeHandler}
        />
      </section>

      <section
        className="addproduct-item-section"
        style={{ width: "100%", gap: "15px" }}
      >
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Qty</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="quantity"
            value={addProductInfo.quantity}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                quantity: parseInt(e.target.value),
              }));
            }}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="price"
            value={addProductInfo.price}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                price: parseInt(e.target.value),
              }));
            }}
          />
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleProductModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
