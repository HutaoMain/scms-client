import "./DashboardPage.css";
import LineChart from "../../components/Charts/LineChart";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";

const DashboardPage = () => {
  const productsCount = 150;
  const categoriesCount = 10;
  const totalSales = 250;
  const totalShipments = 50;

  return (
    <div className="dashboard">
      <div className="boxes">
        <div className="box">
          <h3>Products</h3>
          <p>{productsCount}</p>
        </div>
        <div className="box">
          <h3>Categories</h3>
          <p>{categoriesCount}</p>
        </div>
        <div className="box">
          <h3>Sales</h3>
          <p>{totalSales}</p>
        </div>
        <div className="box">
          <h3>Shipments</h3>
          <p>{totalShipments}</p>
        </div>
      </div>
      <div className="charts">
        <PieChart />
        <LineChart />
        <BarChart />
      </div>
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
