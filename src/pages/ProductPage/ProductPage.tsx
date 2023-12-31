import "./ProductPage.css";
import Modal from "react-modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Add,
  Delete,
  ModeEdit,
  Search,
  ManageSearch,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { ProductInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import { confirmationModalCustomStyle } from "../../ConfirmationStyle";
import AddProduct from "../../components/ProductComponents/addProduct/AddProduct";
import UpdateProduct from "../../components/ProductComponents/UpdateProduct/UpdateProduct";
import ViewProduct from "../../components/ProductComponents/ViewProduct/ViewProduct";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    width: "400px",
    height: "380px",
  },
  overlay: {
    zIndex: 1000,
  },
};

const customViewProduct = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    width: "300px",
    height: "380px",
  },
  overlay: {
    zIndex: 1000,
  },
};

const ProductPage = () => {
  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["productPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  const [paramsId, setParamsId] = useState<string>("");
  const [list, setList] = useState<ProductInterface[]>();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isOpenViewProduct, setIsOpenViewProduct] = useState<boolean>(false);

  const toggleModalUpdate = (id: any) => {
    setParamsId(id);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleConfimationModal = (id: any) => {
    console.log("logging id", id);
    setParamsId(id);
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleViewProduct = (id: any) => {
    setParamsId(id);
    setIsOpenViewProduct(!isOpenViewProduct);
  };

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/product/delete/${id}`
      );

      setList(list?.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const productColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "createdDate",
      headerName: "Date Added",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 320,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            <button
              className="action-btn view"
              onClick={() => toggleViewProduct(params.row.id)}
            >
              <ManageSearch />
              View
            </button>

            <button
              className="action-btn edit"
              onClick={() => toggleModalUpdate(params.row.id)}
            >
              <ModeEdit />
              Edit
            </button>

            <button
              className="action-btn delete"
              onClick={() => toggleConfimationModal(params.row.id)}
            >
              <Delete />
              Delete
            </button>
            <Modal
              isOpen={isConfirmationOpen}
              onRequestClose={toggleConfimationModal}
              style={confirmationModalCustomStyle}
              contentLabel="My dialog"
            >
              <Confirmation
                action="delete"
                whatItem="category"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleConfimationModal}
              />
            </Modal>
            <Modal
              isOpen={isOpenViewProduct}
              onRequestClose={toggleViewProduct}
              style={customViewProduct}
            >
              <ViewProduct
                toggleViewProduct={toggleViewProduct}
                paramsId={paramsId}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: "400px",
            border: "2px solid black",
            padding: "0 20px",
          }}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
        <button className="add-product-btn" onClick={toggleProductModal}>
          Add Product <Add />
        </button>
      </div>

      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={productColumn}
          getRowId={(row) => row.id}
        />
      </section>
      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={toggleProductModal}
        style={customStyle}
      >
        <AddProduct toggleProductModal={toggleProductModal} />
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={toggleModalUpdate}
        style={customStyle}
      >
        <UpdateProduct
          toggleModalUpdate={toggleModalUpdate}
          paramsId={paramsId}
        />
      </Modal>
    </div>
  );
};

export default ProductPage;
