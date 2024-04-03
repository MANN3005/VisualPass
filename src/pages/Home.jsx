import React from 'react';
import DonutChart from '../components/DonutChart';
import RadarChart from '../components/RadarChart';
const data = [
  { Position: 'Central MF', Count: 11677 },
  { Position: 'Left MF', Count: 4937 },
  { Position: 'Right MF', Count: 4781 },
  { Position: 'Left FW', Count: 4572 },
  { Position: 'Right FW', Count: 3722 },
  { Position: 'Right FW', Count: 99 },
  { Position: 'Central FW', Count: 6864 },
  { Position: 'Right CB', Count: 4910 },
  { Position: 'Left CB', Count: 4330 },
  { Position: 'FW-Left', Count: 87 },
  { Position: 'CB-Left', Count: 29 },
  { Position: 'FW-Central', Count: 18 },
  { Position: 'CB-Central ', Count: 15 }
];
const Home = () => {
    return (
      <div className="flex justify-between mr-20 mt-10">
        <div className="mr-8">
          <DonutChart />
          <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Donut Chart representing passing types</h2>
            <p>The donut chart is a powerful visualization tool that displays the distribution of various types of actions or events, such as "Simple pass," "Touch," "Ball out of the field," and more. Each action is represented by a segment of the donut, with the size of the segment indicating the proportion of that action in the total dataset. This visual representation makes it easy to compare the frequencies of different actions at a glance..</p>
          </div>
        </div>
        <div>
          <RadarChart data={data} />
          <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Explanation for Radar Chart</h2>
            <p>The radar chart is a valuable tool for analyzing goal-scoring data by different positions in a sports team. It provides a visual overview that simplifies the comparison of goal-scoring performance across positions, highlighting trends and patterns in a way that is easy to understand. This makes it useful for coaches, analysts, and fans seeking insights into team performance and strategy. </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  