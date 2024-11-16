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
import { useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { CustomTooltip } from "./CustomTooltip";

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
  const [tooltipData, setTooltipData] = useState<any>(null);
  const chartRef = useRef<any>(null);
  const barraA = Array(12).fill(17)
  const barraB = [8, 15, 25, 30, 18, 15, 10, 27, 35, 19, 13, 12]

  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: barraA,
        backgroundColor: "#ccedfd",
        hoverBackgroundColor: "#ccedfd",
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: barraB,
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
        enabled: false, // Desativa o tooltip padrão
        external: function (context) {
          // Tooltip Customizado
          const tooltipModel = context.tooltip;
          let tooltipEl = document.getElementById("custom-tooltip");

          // Cria o elemento do tooltip se ele não existir
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.background = "white";
            tooltipEl.style.border = "1px solid #ccc";
            tooltipEl.style.borderRadius = "5px";
            tooltipEl.style.padding = "10px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.fontFamily = "Arial, sans-serif";
            tooltipEl.style.fontSize = "15px";
            tooltipEl.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
            tooltipEl.style.transition = "opacity 0.3s ease"; // Suave em 0.3 segundos
            tooltipEl.style.opacity = "0"; // Inicialmente invisível
            document.body.appendChild(tooltipEl);
          }

          // Esconde o tooltip se não houver nada para mostrar
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          // Define o conteúdo do tooltip
          if (tooltipModel.body) {
            const index = tooltipModel.dataPoints[0].dataIndex;

            const volumeContratado = barraA[index];
            const volumeConsumido = barraB[index];
            const compraEnergia = barraB[index] - barraA[index];

            tooltipEl.innerHTML = `
            <div>
              <div style={{display: "flex", justifyContent: "space-between"}}>Volume Contratado: <strong>${volumeContratado.toLocaleString()} MWh</strong></div>
              <div style={{display: "flex", justifyContent: "space-between"}}>Volume Consumido: <strong>${volumeConsumido.toLocaleString()} MWh</strong></div>
              <div style={{display: "flex", justifyContent: "space-between"}}>Compra de Energia: <strong>${compraEnergia.toLocaleString()} MWh</strong></div>
            </div>
          `;
          }

          // Define a posição do tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = "1";
          tooltipEl.style.left = position.left + tooltipModel.caretX + "px";
          tooltipEl.style.top = position.top + tooltipModel.caretY + "px";
          tooltipEl.style.transform = 'translateX(-50%)';
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
      <Chart type="bar" data={data} options={options} ref={chartRef} />
      {tooltipData && <CustomTooltip tooltipModel={tooltipData} />}
    </div >
  )
}
