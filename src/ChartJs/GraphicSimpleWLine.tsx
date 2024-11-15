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

export const GraphicSimpleWLine = ({ }: Props) => {
  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        type: "line" as const,
        label: "Line Dataset",
        data: [2, 15, 28, 36, 10, 7, 12, 20, 15, 10, 5, 15],
        borderColor: "#000000af",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#000000af",
        fill: false,
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: [10, 20, 30, 40, 15, 10, 20, 30, 40, 15, 10, 20],
        backgroundColor: "#ccedfd",
        hoverBackgroundColor: "#ccedfd",
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: [10, 20, 30, 40, 15, 10, 20, 30, 40, 15, 10, 20],
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
