import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { Person } from "@mui/icons-material";
// import Modal from "react-modal";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
//     zIndex: 99999,
//   },
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     border: "none",
//     borderRadius: "8px",
//     padding: "20px",
//   },
// };

// Modal.setAppElement("#root");

const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top-admin">
        <Person sx={{ fontSize: "40px" }} />
        Admin
      </div>
      <div className="sidebar-top-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="sidebar-logo">ZAB Digital Prints</span>
        </Link>
      </div>
      <hr className="sidebar-hr" />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-title">Dashboard</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/" ? "sidebar-active" : ""}>
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Dashboard
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Inventory Management</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/categories" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/categories"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Categories
              </span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/products" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/products"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Products
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Order Management</p>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/orders" ? "sidebar-active" : ""
              }
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/orders"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Order
              </span>
            </li>
          </Link>

          <p className="sidebar-title">Logistics and Shipping</p>
          <Link to="/staff" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/staff" ? "sidebar-active" : ""}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/staff"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Shipment
              </span>
            </li>
          </Link>

          <p className="sidebar-title">Forecasting</p>

          <li
            className={location.pathname === "/email" ? "sidebar-active" : ""}
            onClick={toggleModal}
          >
            {/* <PersonOutlineIcon className="icon" /> */}
            <span
              className={
                location.pathname === "/email"
                  ? "sidebar-active"
                  : "sidebar-title-span"
              }
            >
              SalesForecast
            </span>
          </li>

          <p className="sidebar-title">User Security</p>

          <li
            className={location.pathname === "/email" ? "sidebar-active" : ""}
            onClick={toggleModal}
          >
            {/* <PersonOutlineIcon className="icon" /> */}
            <span
              className={
                location.pathname === "/email"
                  ? "sidebar-active"
                  : "sidebar-title-span"
              }
            >
              Users
            </span>
          </li>

          <p className="sidebar-title">USER</p>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span className="sidebar-title-span">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
