import { useQuery } from "react-query";
import { CategoryInterface, ProductInterface } from "../../../types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Close, Check } from "@mui/icons-material";

interface props {
  toggleModalUpdate: any;
  paramsId: string;
}

const UpdateProduct = ({ toggleModalUpdate, paramsId }: props) => {
  const [categoryList, setCategoryList] = useState<CategoryInterface[]>();

  const { data } = useQuery<ProductInterface>({
    queryKey: ["updateProduct"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list/${paramsId}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/category/list`
        );
        setCategoryList(res.data);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [productInfo, setProductInfo] = useState<ProductInterface>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
    quantity: 0,
    price: 0,
    createdDate: new Date(),
  });

  console.log(data);

  useEffect(() => {
    setProductInfo({
      id: data?.id || 0,
      name: data?.name || "",
      description: data?.description || "",
      quantity: data?.quantity || 0,
      categoryId: data?.categoryId || 0,
      price: data?.price || 0,
      createdDate: data?.createdDate || new Date(),
    });
  }, [paramsId, data]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/product/update/${paramsId}`,
        { ...productInfo }
      );
      toast.success("Sucessfully updated product!", {
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
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Edit Product</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Name</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="name"
            value={productInfo.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category</label>
          <select
            className="addproduct-input"
            name="category"
            value={productInfo.categoryId}
            onChange={onChangeHandler}
          >
            <option value="">please select category</option>
            {categoryList?.map((item, index) => (
              <option value={item.name} key={index}>
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
          value={productInfo.description}
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
            value={productInfo.quantity}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="price"
            value={productInfo.price}
            onChange={onChangeHandler}
          />
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
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

export default UpdateProduct;
