import { Add, Delete, ModeEdit, Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { ReturnRequestInterface } from "../../types/Types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import AddRequest from "../../components/ReturnRequestComponent/AddRequest";
import Modal from "react-modal";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import UpdateRequest from "../../components/ReturnRequestComponent/UpdateRequest";
import { confirmationModalCustomStyle } from "../../ConfirmationStyle";

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
    height: "500px",
  },
  overlay: {
    zIndex: 1000,
  },
};

const ReturnRequestPage = () => {
  const { data } = useQuery<ReturnRequestInterface[]>({
    queryKey: ["ReturnRequestPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/returnRequest/list`)
        .then((res) => res.data),
  });

  const [isCreateReturnRequest, setIsCreateReturnRequest] =
    useState<boolean>(false);

  const [paramsId, setParamsId] = useState<string>("");
  const [list, setList] = useState<ReturnRequestInterface[]>();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const toggleModalUpdate = (id: any) => {
    setParamsId(id);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleOpenReturnRequest = () => {
    setIsCreateReturnRequest(!isCreateReturnRequest);
  };

  const toggleConfimationModal = (id: any) => {
    console.log("logging id", id);
    setParamsId(id);
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/returnRequest/delete/${id}`
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
      field: "productId",
      headerName: "Product ID",
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
      field: "productQuantity",
      headerName: "Product Quantity",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "productPrice",
      headerName: "Product Price",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "reason",
      headerName: "Reason",
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
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 320,
      renderCell: (params) => {
        return (
          <div className="action-btns">
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
              isOpen={isUpdateModalOpen}
              onRequestClose={toggleModalUpdate}
              style={customStyle}
            >
              <UpdateRequest
                toggleModalUpdate={toggleModalUpdate}
                paramsId={paramsId}
              />
            </Modal>
          </div>
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
      item?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-page">
      <h1>Return Request Page</h1>
      <div className="product-search-btn">
        <InputBase
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
        <button className="add-product-btn" onClick={toggleOpenReturnRequest}>
          Create a Return Request <Add />
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
        isOpen={isCreateReturnRequest}
        onRequestClose={toggleOpenReturnRequest}
        style={customStyle}
      >
        <AddRequest toggleOpenReturnRequest={toggleOpenReturnRequest} />
      </Modal>
    </div>
  );
};

export default ReturnRequestPage;
