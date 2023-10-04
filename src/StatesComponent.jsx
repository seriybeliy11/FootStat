import React, { useEffect, useState } from 'react';
import { Card, Title, DonutChart } from '@tremor/react';

const ChartStates = () => {
  const [chartData, setChartData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    // Загрузите данные из JSON-файла с использованием fetch
    fetch('github_issues.json') // Замените '/path/to/chartData.json' на путь к вашему JSON-файлу
      .then((response) => response.json())
      .then((data) => {
        // Преобразуйте данные из JSON в нужный формат для DonutChart
        const formattedData = data.state.map((item) => ({
          que: item.value,
          state: item.state,
        }));
        // Установите данные для DonutChart
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const handleMouseEnter = (state) => {
    // Отобразить Tooltip с соответствующим текстом в зависимости от состояния
    setTooltipText('The pie chart shows the ratio between open and closed tasks in the project');
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    // Скрыть Tooltip при уходе мыши
    setShowTooltip(false);
    setTooltipText('');
  };

  return (
    <Card>
      <div
        onMouseEnter={() => handleMouseEnter('All')}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <Title>Data States</Title>
        {showTooltip && (
          <div className="tooltip">
            {tooltipText}
          </div>
        )}
      </div>
      <DonutChart data={chartData} category="que" index="state" />
    </Card>
  );
};

export default ChartStates;
