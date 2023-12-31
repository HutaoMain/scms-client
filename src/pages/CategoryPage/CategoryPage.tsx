import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "react-query";
import { CategoryInterface } from "../../types/Types";
import axios from "axios";
import Modal from "react-modal";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import { confirmationModalCustomStyle } from "../../ConfirmationStyle";
import AddCategory from "../../components/CategoryComponents/addCategory/AddCategory";
import UpdateCategory from "../../components/CategoryComponents/updateCategory/UpdateCategory";

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

const CategoryPage = () => {
  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["CategoryPage"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  const [paramsId, setParamsId] = useState<string>("");
  const [list, setList] = useState<CategoryInterface[]>();

  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  const [isCategoryUpdate, setIsCategoryUpdate] = useState<boolean>(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const toggleModalUpdateCategory = (id: any) => {
    console.log(id);
    setParamsId(id);
    setIsCategoryUpdate(!isCategoryUpdate);
  };

  const toggleAddCategory = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const toggleConfimationModal = (id: any) => {
    setParamsId(id);
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/category/delete/${id}`
      );

      setList(list?.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const categoryColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
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
      renderCell: (params) => {
        return (
          <div className="action-btns">
            <button
              className="action-btn edit"
              onClick={() => toggleModalUpdateCategory(params.row.id)}
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
    return item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-page">
      <h1>Category Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Category Name"
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
        <button className="add-product-btn" onClick={toggleAddCategory}>
          Add Category <Add />
        </button>
      </div>

      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={categoryColumn}
          getRowId={(row) => row.id}
        />
      </section>
      <Modal
        isOpen={isCategoryModalOpen}
        onRequestClose={toggleAddCategory}
        style={customStyles}
      >
        <AddCategory toggleCategoryModal={toggleAddCategory} />
      </Modal>
      {/* update modal */}
      <Modal
        isOpen={isCategoryUpdate}
        onRequestClose={toggleModalUpdateCategory}
        style={customStyles}
      >
        <UpdateCategory
          toggleModalUpdateCategory={toggleModalUpdateCategory}
          paramsId={paramsId}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
