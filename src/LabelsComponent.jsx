import React, { useState, useEffect } from 'react';
import { Card, Title, DonutChart } from '@tremor/react';

const ChartsLabels = () => {
  const [ChartData, setChartData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    // Загрузите данные из JSON-файла с использованием fetch
    fetch('label_counts.json') // Замените 'label_counts.json' на путь к вашему JSON-файлу
      .then((response) => response.json())
      .then((data) => {
        // Преобразуйте данные из JSON в нужный формат для DonutChart
        const formattedData = data.map((item) => ({
          que: item.value,
          label: item.label, // Используйте "label" вместо "state" для меток
        }));
        // Установите данные для DonutChart
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const handleMouseEnter = (label) => {
    // Отобразить Tooltip с соответствующим текстом метки
    setTooltipText(label);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    // Скрыть Tooltip при уходе мыши с элемента
    setShowTooltip(false);
    setTooltipText('');
  };

  return (
    <Card>
      <div
        onMouseEnter={() => handleMouseEnter('A pie chart for describing task labels (categories) is a graphical representation of the division of tasks into different categories or labels')}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'flex', alignItems: 'center' }}
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
        <Title>Labels Data</Title>
      </div>
      {showTooltip && (
        <div className="tooltip">
          {tooltipText}
        </div>
      )}
      <DonutChart
        data={ChartData}
        category="que" // Используйте "que" вместо "value" для категории
        index="label"
      />
    </Card>
  );
}

export default ChartsLabels;
