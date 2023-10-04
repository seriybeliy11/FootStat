import React, { useState, useEffect } from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

function IssuesAllComponent() {
  const [allIssuesData, setAllIssuesData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState(''); // Установите пустую строку по умолчанию

  useEffect(() => {
    // Используйте async/await для улучшения читаемости
    async function fetchData() {
      try {
        const response = await fetch("./github_all_issues.json");
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const jsonData = await response.json();
        setAllIssuesData(jsonData);
      } catch (error) {
        console.error("Произошла ошибка при загрузке данных:", error);
      }
    }

    fetchData();
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    setTooltipText("The X-axis on the graph represents dates and the Y-axis represents the number of tasks. This graph allows you to observe trends, peaks and dips in the total number of tasks in a project over time");
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipText('');
  };

  return (
    <div>
      {allIssuesData && (
        <Card>
          <div
            className={`group relative ${showTooltip ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <Title>All Issues Data</Title>
          </div>
          {showTooltip && (
            <div className="tooltip">
              {tooltipText}
            </div>
          )}
          <AreaChart
            className="h-72 mt-4"
            data={allIssuesData}
            index="Dates"
            categories={["All Issues"]}
            colors={["sky"]}
            curveType="monotone"
          />
        </Card>
      )}
    </div>
  );
}

export default IssuesAllComponent;
