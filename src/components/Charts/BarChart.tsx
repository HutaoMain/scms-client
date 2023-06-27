import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const BarChart = () => {
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [50, 60, 70, 80, 90, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="chart">
      <h3>Sales Chart</h3>
      <Bar data={barChartData} />
    </div>
  );
};

export default BarChart;
