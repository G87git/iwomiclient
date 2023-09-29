import { Bar, Doughnut } from "react-chartjs-2";
import { BarData, PieData } from "../data/chart";

export default function Charts() {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="flex items-start justify-around space-x-8">
      <div className="flex-1 py-4 px-8 bg-white shadow">
        <h5>Monthly Statistics</h5>
        <Bar data={BarData} options={options} />
      </div>
      {/* <div className="py-4 px-8 bg-white shadow">
        <h5>Outcome</h5>
        <Doughnut data={PieData} title="Outcome" />
      </div> */}
    </div>
  );
}
