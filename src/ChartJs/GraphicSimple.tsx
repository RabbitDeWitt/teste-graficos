import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface Props {

}

export const GraphicSimple = ({ }: Props) => {
  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: Array(12).fill(17),
        backgroundColor: "#ccedfd",
        hoverBackgroundColor: "#ccedfd",
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: [8, 15, 25, 30, 18, 15, 10, 27, 35, 19, 13, 12],
        backgroundColor: "#37a9fb",
        hoverBackgroundColor: "#37a9fb",
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {

        position: 'average',
        backgroundColor: "white",
        bodyColor: 'black',
        displayColors: false, // Remove as cores padrão ao lado dos valores
        padding: 10, // Adiciona um espaçamento para o conteúdo do tooltip
        bodyFont: {
          weight: 'bold', // Define os valores em negrito
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };
  return (
    <div style={{ width: "600px", height: "300px" }} >
      <Chart type="bar" data={data} options={options} />
    </div >
  )
}
