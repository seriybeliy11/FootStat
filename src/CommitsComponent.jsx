import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import React, { useState, useEffect } from "react";

function CommitsComponent() {
  const [selectedDate, setSelectedDate] = useState(null); // Remove the default value
  const [contributorsData, setContributorsData] = useState(null);
  const [allDates, setAllDates] = useState([]);
  
  useEffect(() => {
    try {
      // Fetch the data from the JSON file
      fetch("./com_con_data_formatted.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((jsonData) => {
          // Update contributorsData based on the selected date
          setAllDates(Object.keys(jsonData)); // Store all available dates
          if (!selectedDate && allDates.length > 0) {
            setSelectedDate(allDates[0]); // Set to the first available date
          }
          setContributorsData(jsonData[selectedDate]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }, [selectedDate, allDates]);

  return (
    <div>
      <Card>
        <Title>Contributors Data</Title>
        <Subtitle>The X axis of the graph represents the names of commit authors and the Y axis represents the number of commits</Subtitle>
        <Subtitle>Users can select dates to analyze the activity of authors in a certain period</Subtitle>
        <div className="my-4">
          <label>Select a Date: </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {allDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        {contributorsData && (
          <BarChart
            className="mt-4"
            data={contributorsData}
            index="name"
            categories={["additions", "deletions", "commits"]}
            colors={["sky", "blue", "indigo"]}
          />
        )}
      </Card>
    </div>
  );
}

export default CommitsComponent;
