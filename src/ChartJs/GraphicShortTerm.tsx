import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Ignora o erro de tipo para o plugin de anotação
// @ts-ignore
import annotationPlugin from 'chartjs-plugin-annotation';

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
  const redBars = Array.from({ length: 12 }).fill(0);
  const greenBars = Array.from({ length: 12 }).fill(0);
  const blueBars = Array.from({ length: 12 }).fill(0);

  values.forEach((value, i) => {
    if (value > max) {
      redBars[i] = value;
      blueBars[i] = max;
    } else {
      blueBars[i] = value;
      greenBars[i] = value > min ? 0 : min
    }
  });

  const options = {
    responsive: true,
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
        callbacks: {
          position: "bottom",
          beforeBody: function (tooltipItems) {
            let total = tooltipItems.reduce((sum, item) => sum + item.raw, 0);
            return <h1>asdasdada</h1>;
          },
          label: function (tooltipItem) {
            const labels = ['Volume isolado', 'Volume base', 'Volume extra'];
            const units = 'MWh';
            const value = tooltipItem.raw;
            return <h1>asd</h1>;
          },
        },
      },
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
        backgroundColor: '#ccedfd',
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'b'
      },
      {
        data: blueBars,
        backgroundColor: '#3ba8fc',
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
      {
        data: greenBars,
        backgroundColor: '#89c34a',
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
      {
        data: redBars,
        backgroundColor: '#fe5923',
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
        stack: 'a'
      },
    ],
  };

  return (
    <div style={{ width: "600px", height: "300px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};
