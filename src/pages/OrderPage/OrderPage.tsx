import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { orderData } from "../../Data";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Add, Search, ManageSearch } from "@mui/icons-material";

const OrderPage = () => {
  const orderColumn: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Products",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => {
        const products = params.row.products;
        return (
          <div>
            {products.map((item: any, key: any) => (
              <div key={key}>
                <span>productId: {item.productId}</span>
                <span>productQuantity: {item.quantity}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
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
          </div>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = orderData?.filter((item) => {
    return item.orderDate.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Order Date"
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
        <button className="add-product-btn">
          Add Product <Add />
        </button>
      </div>

      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={orderColumn}
          getRowId={(row) => row.orderId}
        />
      </section>
    </div>
  );
};

export default OrderPage;
