import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Ignora o erro de tipo para o plugin de anotação
// @ts-ignore
import annotationPlugin from 'chartjs-plugin-annotation';
import { useState } from 'react';
import { getDesaturatedColor } from '../utils/changeColors';

// Registrar todos os elementos necessários no ChartJS
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface Props {
  obj: {
    values: number[]
    max: number,
    min: number
  }
}

export const GraphicShortTerm = ({ obj: { min, max, values } }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const redBars = Array(12).fill(0);
  const greenBars = Array(12).fill(0);
  const blueBars = Array(12).fill(0);

  values.forEach((value, i) => {
    if (value > max) {
      redBars[i] = value;
      blueBars[i] = max;
    } else {
      blueBars[i] = value;
      greenBars[i] = value > min ? 0 : min
    }
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line' as const,
            yMin: max,
            yMax: max,
            borderColor: '#fb591f',
            borderWidth: 2,
          },
          line2: {
            type: 'line' as const,
            yMin: min,
            yMax: min,
            borderColor: '#e0dfbd',
            borderWidth: 2,
          },
        },
      },
      tooltip: {
        enabled: false, // Desativa o tooltip padrão
        external: function (context: any) {
          // Tooltip Customizado
          const tooltipModel = context.tooltip;
          let tooltipEl = document.getElementById("custom-tooltip");

          // Cria o elemento do tooltip se ele não existir
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.background = "white";
            tooltipEl.style.border = "1px solid #fff";
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

            const volumeContratado = greenBars[index];
            const volumeConsumido = blueBars[index];
            const compraEnergia = greenBars[index] - greenBars[index];

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
      }
    },
    onHover: (_, chartElement) => {
      const newIndex = chartElement.length ? chartElement[0].index : null;
      newIndex !== hoveredIndex && setHoveredIndex(newIndex);
    },
    scales: {
      y: {
        stacked: false,
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
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        data: Array(12).fill(17),
        backgroundColor: ({ dataIndex }: { dataIndex: number }) => hoveredIndex === null || hoveredIndex === dataIndex ? "#ccedfd" : getDesaturatedColor("#ccedfd"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'b'
      },
      {
        data: blueBars,
        backgroundColor: ({ dataIndex }: { dataIndex: number }) => hoveredIndex === null || hoveredIndex === dataIndex ? "#3ba8fc" : getDesaturatedColor("#3ba8fc"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
      {
        data: greenBars,
        backgroundColor: ({ dataIndex }: { dataIndex: number }) => hoveredIndex === null || hoveredIndex === dataIndex ? "#89c34a" : getDesaturatedColor("#89c34a"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
      {
        data: redBars,
        backgroundColor: ({ dataIndex }: { dataIndex: number }) => hoveredIndex === null || hoveredIndex === dataIndex ? "#fe5923" : getDesaturatedColor("#fe5923"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
    ],
  };

  return (
    <div
      style={{ width: "600px", height: "300px" }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Bar options={options} data={data} />
    </div>
  );
};
