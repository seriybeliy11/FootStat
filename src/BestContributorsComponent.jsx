import React, { useEffect, useState } from 'react';
import { Card, Metric, Text, Bold, Subtitle } from "@tremor/react";

const BestAgentCard = () => {
  const [maxContributorLogin, setMaxContributorLogin] = useState(null);

  useEffect(() => {
    fetch('./data_contributors.json')
      .then((response) => response.json())
      .then((jsonData) => {
        let maxContributions = -Infinity;
        let maxLogin = null;

        jsonData.forEach((contributor) => {
          if (contributor.contributions > maxContributions) {
            maxContributions = contributor.contributions;
            maxLogin = contributor.login;
          }
        });

        setMaxContributorLogin(maxLogin);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке JSON-файла:", error);
      });
  }, []);

  return (
    <Card>
      <Metric style = {{fontSize: '15px'}}>Best Contributor</Metric>
      <Metric>{maxContributorLogin}</Metric>
    </Card>
  );
};

export default BestAgentCard;
