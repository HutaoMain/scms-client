import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Search } from "@mui/icons-material";
import { OrderInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";

const OrderPage = () => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["OrderPage"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const orderColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "productName",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "productDescription",
      headerName: "Product Desc",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "productPrice",
      headerName: "Product Price",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Date Ordered",
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
      renderCell: (params) => {
        const handleStatusChange = (event: any) => {
          const newStatus = event.target.value;
          axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/order/updateStatus/${
              params.row.id
            }`,
            {
              status: newStatus,
            }
          );
        };

        return (
          <select
            defaultValue={params.row.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return (
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-page">
      <h1>Order Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Email or Status"
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
      </div>

      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={orderColumn}
          getRowId={(row) => row.id}
        />
      </section>
    </div>
  );
};

export default OrderPage;
