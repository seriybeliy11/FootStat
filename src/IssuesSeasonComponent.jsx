import React, { useState, useEffect } from "react";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const ThreatenedSpeciesQueChart = () => {
  const [selectedYear, setSelectedYear] = useState("2022");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Загрузка данных из initialChartData.json
    fetch("./initialChartData.json")
      .then((res) => res.json())
      .then((jsonData) => {
        // Инициализация данных для выбранного года
        const selectedData = jsonData[selectedYear];
        if (selectedData) {
          setChartData(selectedData);
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
  }, [selectedYear]); // Добавление selectedYear в зависимости, чтобы перезагружать данные при изменении года

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <Title>Commits Data</Title>
        <div className="space-x-2">
          {["2022", "2023"].map((year) => (
            <button
              key={year}
              className={`px-2 py-1 rounded ${
                selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <Subtitle>
        The task duration graph is a visualization of the time taken to complete each task in the project
      </Subtitle>
      {chartData && chartData.length > 0 ? (
        <BarChart
          className="mt-6"
          data={chartData}
          index="number"
          categories={["duration"]}
          colors={["sky"]}
          yAxisWidth={48}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Card>
  );
};

export default ThreatenedSpeciesQueChart;
