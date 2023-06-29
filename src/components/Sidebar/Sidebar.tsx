import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { Person } from "@mui/icons-material";
import useAuthStore from "../../zustand/AuthStore";

const Sidebar = () => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);

  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top-admin">
        <Person sx={{ fontSize: "40px" }} />
        <span
          style={{ wordWrap: "break-word", width: "75%", textAlign: "center" }}
        >
          {user}
        </span>
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
          <Link to="/shipment" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/shipment" ? "sidebar-active" : ""
              }
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/shipment"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Shipment
              </span>
            </li>
          </Link>

          <p className="sidebar-title">Request</p>
          <Link to="/returnRequest" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/returnRequest" ? "sidebar-active" : ""
              }
              onClick={toggleModal}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/returnRequest"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Return Request
              </span>
            </li>
          </Link>

          <p className="sidebar-title">User Security</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/users" ? "sidebar-active" : ""}
              onClick={toggleModal}
            >
              <span
                className={
                  location.pathname === "/users"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Users
              </span>
            </li>
          </Link>

          <li style={{ marginTop: "10px" }} onClick={clearUser}>
            {/* <ExitToAppIcon className="icon" /> */}
            <span className="sidebar-title-span">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
