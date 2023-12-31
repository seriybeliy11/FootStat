import React, { useState, useEffect } from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

function RewardsComponent() {
  const [rewardsData, setRewardsData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    try {
      // Загрузка данных из файла rewards.json
      fetch("./rewards.json")
        .then((res) => res.json())
        .then((jsonData) => setRewardsData(jsonData))
        .catch((error) => {
          console.error("Ошибка загрузки данных из rewards.json:", error);
        });
    } catch (error) {
      console.error("Произошла ошибка при обработке данных:", error);
    }
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    setTooltipText("A graph with task numbers on the X-axis and their costs on the Y-axis provides a compact representation of the cost of each task in the project.");
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipText("");
  };

  return (
    <div>
      {rewardsData && (
        <Card>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <Title>Rewards Data</Title>
          </div>
          {showTooltip && (
            <div className="tooltip">
              {tooltipText}
            </div>
          )}
          <AreaChart
            className="h-72 mt-4"
            data={rewardsData}
            index="Issue Number"
            categories={["Rewards (th. $)"]}
            colors={["sky"]}
            valueFormatter={dataFormatter}
            curveType="monotone"
          />
        </Card>
      )}
    </div>
  );
}

export default RewardsComponent;
