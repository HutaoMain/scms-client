import CategoryCount from "../../components/Charts/CategoryCount";
import ProductCount from "../../components/Charts/ProductCount";
import TotalSalesCount from "../../components/Charts/TotalSalesCount";
import TotalShipmentCount from "../../components/Charts/TotalShipmentCount";
import "./DashboardPage.css";
// import BarChart from "../../components/Charts/BarChart";
// import PieChart from "../../components/Charts/PieChart";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="boxes">
        <ProductCount />
        <CategoryCount />
        <TotalSalesCount />
        <TotalShipmentCount />
      </div>
      {/* <div className="charts">
        <PieChart />

        <BarChart />
      </div> */}
    </div>

    // <div className="dashboard">
    //   <div className="boxes">
    //     <div className="box">
    //       <h3>Products</h3>
    //       <p>{productsCount}</p>
    //     </div>
    //     <div className="box">
    //       <h3>Categories</h3>
    //       <p>{categoriesCount}</p>
    //     </div>
    //     <div className="box">
    //       <h3>Sales</h3>
    //       <p>{totalSales}</p>
    //     </div>
    //     <div className="box">
    //       <h3>Shipments</h3>
    //       <p>{totalShipments}</p>
    //     </div>
    //   </div>
    //   <div className="chart bar-chart">
    //     <BarChart />
    //   </div>
    //   <div className="chart">
    //     <PieChart />
    //   </div>
    //   <div className="chart">
    //     <LineChart />
    //   </div>
    // </div>
  );
};

export default DashboardPage;
