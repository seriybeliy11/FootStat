import React, { useEffect, useState } from 'react';
import { Card, Metric, Text, Bold, Title } from "@tremor/react";

const AgentQueCard = () => {
  const [loginCount, setLoginCount] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetch('./data_contributors.json')
      .then((response) => response.json())
      .then((jsonData) => {
        const count = jsonData.length;
        setLoginCount(count);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке JSON-файла:", error);
      });
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Card>
        <Metric style = {{fontSize: '15px'}}>Agent's Queue</Metric>
        <Metric>{loginCount}</Metric>
      </Card>
    </div>
  );
};

export default AgentQueCard;
