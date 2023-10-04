import React, { useState, useEffect } from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

function ApprovedIssuesComponent() {
  const [ApprovedIssuesData, SetApprovedIssuesData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    try {
      fetch("./github_closed_approved_issues.json")
        .then((res) => res.json())
        .then((jsonData) => SetApprovedIssuesData(jsonData))
        .catch((error) => {
          console.error("Ошибка загрузки данных из rewards.json:", error);
        });
    } catch (error) {
      console.error("Произошла ошибка при обработке данных:", error);
    }
  }, []);

  return (
    <div>
      {ApprovedIssuesData && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <Title>Approved Issues Data</Title>
            {showTooltip && (
              <div className="tooltip">
                The X-axis on the chart represents dates, and the Y-axis represents the number of paid tasks. This graph allows you to observe trends and dynamics in the total number of paid tasks in the project
              </div>
            )}
          </div>
          <AreaChart
            className="h-72 mt-4"
            data={ApprovedIssuesData}
            index="Date"
            categories={["Closed Approved Issues"]}
            colors={["sky"]}
            curveType="monotone"
          />
        </Card>
      )}
    </div>
  );
}

export default ApprovedIssuesComponent;
