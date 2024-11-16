import { BarChart } from '@mui/x-charts/BarChart';

export default function MUIChartsOverviewDemo() {
  return (
    <BarChart
      series={[
        { data: Array(12).fill(17) },
        { data: [8, 15, 25, 30, 18, 15, 10, 27, 35, 19, 13, 12] },
      ]}
      height={290}
      width={600}
      xAxis={[{
        data: ["J", "F", "M", "A", "M1", "J", "J", "A", "S", "O", "N", "D"],
      }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
