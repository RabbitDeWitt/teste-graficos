import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'J', value1: 300, value2: 200 },
  { month: 'F', value1: 400, value2: 250 },
  { month: 'M', value1: 500, value2: 300 },
  { month: 'A', value1: 600, value2: 350 },
  { month: 'M', value1: 700, value2: 400 },
  { month: 'J', value1: 400, value2: 300 },
  { month: 'J', value1: 450, value2: 350 },
  { month: 'A', value1: 550, value2: 400 },
  { month: 'S', value1: 800, value2: 500 },
  { month: 'O', value1: 700, value2: 450 },
  { month: 'N', value1: 500, value2: 350 },
  { month: 'D', value1: 400, value2: 300 },
];

const RechartsGraphicSimple = () => {
  const [highlighted, setHighlighted] = useState(null); // Armazena a categoria destacada

  const handleMouseEnter = (key) => {
    setHighlighted(key); // Define a categoria destacada
  };

  const handleMouseLeave = () => {
    setHighlighted(null); // Remove o destaque
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        barGap={0}
        barSize={30}
      >
        <XAxis dataKey="month" />
        <Tooltip />
        <Bar
          dataKey="value1"
          fill="#007bff"
          fillOpacity={highlighted === 'value1' || !highlighted ? 1 : 0.3}
          onMouseEnter={() => handleMouseEnter('value1')}
          onMouseLeave={handleMouseLeave}
        />
        <Bar
          dataKey="value2"
          fill="#87CEEB"
          fillOpacity={highlighted === 'value2' || !highlighted ? 1 : 0.3}
          onMouseEnter={() => handleMouseEnter('value2')}
          onMouseLeave={handleMouseLeave}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RechartsGraphicSimple;
