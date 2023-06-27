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
import { categoriesData } from "../../Data";

const CategoryPage = () => {
  const categoryColumn: GridColDef[] = [
    {
      field: "category_id",
      headerName: "Category ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      flex: 1,
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

  const filtered = categoriesData?.filter((item) => {
    return (
      item.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-page">
      <h1>Category Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Category Name or Description"
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
          Add Category <Add />
        </button>
      </div>

      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={categoryColumn}
          getRowId={(row) => row.category_id}
        />
      </section>
    </div>
  );
};

export default CategoryPage;
