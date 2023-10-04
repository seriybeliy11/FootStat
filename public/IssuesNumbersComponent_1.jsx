import { Card, Title, BarChart } from '@tremor/react'; // Подставьте правильные импорты
import React, { useState, useEffect } from 'react';

const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };
  
  function IssuesNumbersComponent_1() {
    const [numbers_and_durations_2022_06_13_09_39_52_data, SetNumbers_and_durations_2022_06_13_09_39_52_data] = useState(null);
  
    useEffect(() => {
      try {
        fetch("./issues_numbers_and_durations_2022_06_13_09_39_52.json")
          .then((res) => res.json())
          .then((jsonData) => SetNumbers_and_durations_2022_06_13_09_39_52_data(jsonData))
          .catch((error) => {
            console.error("Ошибка загрузки данных из rewards.json:", error);
          });
      } catch (error) {
        console.error("Произошла ошибка при обработке данных:", error);
      }
    }, []);

  return (
    <div>
      {numbers_and_durations_2022_06_13_09_39_52_data && (
        <Card>
          <Title>Numbers & Durations</Title>
          <BarChart
            className="h-72 mt-4"
            data={numbers_and_durations_2022_06_13_09_39_52_data}
            index="number"
            categories={["duration"]}
            colors={["cyan"]}
            valueFormatter={dataFormatter}
          />
        </Card>
      )}
    </div>
  );
}

export default IssuesNumbersComponent_1;
