import React, { useEffect, useState } from 'react';
import { Card, Metric, Text, Bold } from "@tremor/react";

const IssuesQueCard = ({ isDarkTheme }) => {
  const [totalIssuesValue, setTotalIssuesValue] = useState(null);

  useEffect(() => {
    fetch('./github_issues.json') // Загружаем JSON-файл с сервера (указать правильный URL)
      .then((response) => response.json()) // Преобразуем ответ в объект JavaScript
      .then((jsonData) => {
        // Находим значения "value" для состояний "closed" и "open"
        const closedIssuesValue = jsonData.state.find((item) => item.state === 'closed').value;
        const openIssuesValue = jsonData.state.find((item) => item.state === 'open').value;

        // Складываем значения
        const totalValue = closedIssuesValue + openIssuesValue;
        
        setTotalIssuesValue(totalValue);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке JSON-файла:", error);
      });
  }, []);

  return (
    <Card>
      <Metric style = {{fontSize: '15px'}}>Issue's que</Metric>
      <Metric>{totalIssuesValue}</Metric>
    </Card>
  );
};

export default IssuesQueCard;
