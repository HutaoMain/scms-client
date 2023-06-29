import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit, Search } from "@mui/icons-material";
import { ShipmentInterface } from "../../types/Types";
import { IconButton, InputBase } from "@mui/material";
import Modal from "react-modal";
import AddShipment from "../../components/ShipmentComponent/AddShipment";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import { confirmationModalCustomStyle } from "../../ConfirmationStyle";
import UpdateShipment from "../../components/ShipmentComponent/UpdateShipment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    padding: "20px",
  },
  overlay: {
    zIndex: 1000,
  },
};

const Shipment = () => {
  const { data } = useQuery<ShipmentInterface[]>({
    queryKey: ["Shipment"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/shipment/list`)
        .then((res) => res.data),
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [list, setList] = useState<ShipmentInterface[]>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const toggleOpenShipment = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleConfimationModal = (id: any) => {
    console.log("logging id", id);
    setParamsId(id);
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleModalUpdate = (id: any) => {
    setParamsId(id);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/shipment/delete/${id}`
      );

      setList(list?.filter((item) => item.shipmentId !== id));
      window.location.reload();
    } catch (err) {}
  };

  const productColumn: GridColDef[] = [
    {
      field: "shipmentId",
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
      field: "shipmentStatus",
      headerName: "Shipment Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "orderId",
      headerName: "Order ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "orderTotalPrice",
      headerName: "Order Total Price",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "orderProductName",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "orderProductDescription",
      headerName: "Product Desc",
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
              onClick={() => toggleModalUpdate(params.row.shipmentId)}
            >
              <ModeEdit />
              Edit
            </button>

            <button
              className="action-btn delete"
              onClick={() => toggleConfimationModal(params.row.shipmentId)}
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
              style={customStyles}
            >
              <UpdateShipment
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
      item?.orderProductName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-page">
      <h1>Shipment Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Product Ordered or Email"
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
        <button className="add-product-btn" onClick={toggleOpenShipment}>
          Add Shipment <Add />
        </button>
      </div>
      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={productColumn}
          getRowId={(row) => row.shipmentId}
        />
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleOpenShipment}
        style={customStyles}
      >
        <AddShipment toggleOpenShipment={toggleOpenShipment} />
      </Modal>
    </div>
  );
};

export default Shipment;
