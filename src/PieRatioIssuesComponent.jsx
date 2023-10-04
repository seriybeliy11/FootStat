import React, { useState, useEffect } from 'react';
import { Card, Title, DonutChart } from '@tremor/react';

const data = [
  {
    "Date": "22.6",
    "ClosedApprovedIssues": "10",
    "ClosedTotalIssues": "13"
  },
  {
    "Date": "22.8",
    "ClosedApprovedIssues": "25",
    "ClosedTotalIssues": "56"
  },
  {
    "Date": "22.10",
    "ClosedApprovedIssues": "44",
    "ClosedTotalIssues": "93"
  },
  {
    "Date": "22.12",
    "ClosedApprovedIssues": "51",
    "ClosedTotalIssues": "122"
  },
  {
    "Date": "23.2",
    "ClosedApprovedIssues": "64",
    "ClosedTotalIssues": "152"
  },
  {
    "Date": "23.4",
    "ClosedApprovedIssues": "69",
    "ClosedTotalIssues": "170"
  },
  {
    "Date": "23.6",
    "ClosedApprovedIssues": "69",
    "ClosedTotalIssues": "176"
  }
];

const ChartsDonut = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Выбираем данные для конкретной даты
    const selectedDateData = data.find(item => item.Date === selectedDate);
    
    if (selectedDateData) {
      const formattedData = [
        {
          type: 'approved',
          que: parseInt(selectedDateData.ClosedApprovedIssues),
        },
        {
          type: 'total',
          que: parseInt(selectedDateData.ClosedTotalIssues),
        },
      ];

      setChartData(formattedData);
    }
  }, [selectedDate]);

  return (
    <Card>
      <div className="flex justify-between items-center">
        <Title>Ratios</Title>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 rounded bg-gray-200 text-gray-700"
        >
          <option value="">Выберите дату</option>
          {data.map((item) => (
            <option key={item.Date} value={item.Date}>
              {item.Date}
            </option>
          ))}
        </select>
      </div>
      <DonutChart data={chartData} category="que" index="type" />
    </Card>
  );
};

export default ChartsDonut;
