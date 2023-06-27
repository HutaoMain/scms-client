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
import { useState } from "react";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { productsData } from "../../Data";

Modal.setAppElement("#root");

const ProductPage = () => {
  const productColumn: GridColDef[] = [
    {
      field: "product_id",
      headerName: "Product ID",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "category_id",
      headerName: "Category ID",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "date_added",
      headerName: "Date Added",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => {
        return (
          <div className="action-btns">
            <button className="action-btn view">
              <ManageSearch />
              View
            </button>

            <button className="action-btn edit">
              <ModeEdit />
              Edit
            </button>

            <button className="action-btn delete">
              <Delete />
              Delete
            </button>
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

  const filtered = productsData?.filter((item) => {
    return (
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Product Name or Description"
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
          getRowId={(row) => row.product_id}
        />
      </section>
    </div>
  );
};

export default ProductPage;
