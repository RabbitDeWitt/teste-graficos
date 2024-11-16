interface CustomTooltipProps {
  tooltipModel: any; // Modelo de tooltip do Chart.js
}

export const CustomTooltip = ({ tooltipModel }: CustomTooltipProps) => {
  if (!tooltipModel || !tooltipModel.opacity) return null;

  const position = tooltipModel.caretX;
  const category = tooltipModel.title?.[0] || 'Categoria';
  const dataPoints = tooltipModel.dataPoints || [];

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position}px`,
        top: `${tooltipModel.caretY - 50}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        pointerEvents: 'none',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        zIndex: 9999,
      }}
    >
      <strong>{category}</strong>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {dataPoints.map((data: any, index: number) => (
          <li key={index}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: data.dataset.backgroundColor,
                marginRight: '5px',
              }}
            ></span>
            {`${data.dataset.label || ''}: ${data.raw} MWh`}
          </li>
        ))}
      </ul>
    </div>
  );
};
