import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./pages/ProductPage/ProductPage";
import Sidebar from "./components/Sidebar/Sidebar";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthStore from "./zustand/AuthStore";
import Modal from "react-modal";
import Shipment from "./pages/ShipmentPage/Shipment";
import UserPage from "./pages/UserPage/UserPage";
import ReturnRequestPage from "./pages/ReturnRequestPage/ReturnRequestPage";

Modal.setAppElement("#root");

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="App">
      {user ? (
        <section className="app-sidebar">
          <Sidebar />
        </section>
      ) : (
        <></>
      )}
      <section className="App-container">
        <Routes>
          <Route path="login" element={!user && <LoginPage />} />
          <Route
            path=""
            element={user ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="categories"
            element={user ? <CategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="products"
            element={user ? <ProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="orders"
            element={user ? <OrderPage /> : <Navigate to="/login" />}
          />
          <Route
            path="shipment"
            element={user ? <Shipment /> : <Navigate to="/login" />}
          />
          <Route
            path="users"
            element={user ? <UserPage /> : <Navigate to="/login" />}
          />
          <Route
            path="returnRequest"
            element={user ? <ReturnRequestPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
