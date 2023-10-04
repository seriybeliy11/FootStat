import { Card, Title, BarChart } from '@tremor/react';
import React, { useState, useEffect } from 'react';

function IssuesNumbersComponent_7() {
  const [issue_numbers_and_durations_data, setIssue_numbers_and_durations_data] = useState(null);

  useEffect(() => {
    try {
      fetch("./issue_numbers_and_durations_2023_04_01_00_00_00.json")
        .then((res) => res.json())
        .then((jsonData) => setIssue_numbers_and_durations_data(jsonData))
        .catch((error) => {
          console.error("Ошибка загрузки данных из rewards.json:", error);
        });
    } catch (error) {
      console.error("Произошла ошибка при обработке данных:", error);
    }
  }, []);

  return (
    <div>
      {issue_numbers_and_durations_data && (
        <Card>
          <Title>Numbers & Durations</Title>
          <BarChart
            className="h-72 mt-4"
            data={issue_numbers_and_durations_data}
            index="number"
            categories={["duration"]}
            colors={["cyan"]}
          />
        </Card>
      )}
    </div>
  );
}

export default IssuesNumbersComponent_7;
