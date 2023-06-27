import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import Sidebar from "./components/Sidebar/Sidebar";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      {/* <section className="app-sidebar">
        <Sidebar />
      </section> */}
      <section className="App-container">
        <Routes>
          <Route path="" element={<DashboardPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="orders" element={<OrderPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
