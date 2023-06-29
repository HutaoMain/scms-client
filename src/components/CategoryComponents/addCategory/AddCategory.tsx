import "./AddCategory.css";
import React from "react";
import { Close, Check } from "@mui/icons-material";
import { useState } from "react";
import { CategoryInterface } from "../../../types/Types";
import axios from "axios";
import { toast } from "react-toastify";

interface props {
  toggleCategoryModal: () => void;
}

const AddCategory = ({ toggleCategoryModal }: props) => {
  const [categoryState, setCategoryState] = useState<CategoryInterface>({
    id: 0,
    name: "",
    description: "",
    createdDate: new Date(),
    products: [{}],
  });

  const categoryNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setCategoryState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/category/create`,
      {
        name: categoryState.name,
        description: categoryState.description,
      }
    );
    toast.success("Sucessfully added category!", {
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
    <div style={{ backgroundColor: "#ffff" }}>
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Category</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addcategory-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list">
          <label>Category Name</label>
          <input
            className="addcategory-input"
            style={{ width: "95%" }}
            type="text"
            name="name"
            value={categoryState.name}
            onChange={categoryNameChangeHandler}
          />
        </div>
        <div className="addproduct-item-list">
          <label>Description</label>
          <input
            className="addcategory-input"
            style={{ width: "95%" }}
            type="text"
            name="description"
            value={categoryState.description}
            onChange={categoryNameChangeHandler}
          />
        </div>
      </section>
      <div className="addcategory-btn-container">
        <button className="addproduct-btn close" onClick={toggleCategoryModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
