import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

function NetworkGraph() {
  const [selectedMatchId, setSelectedMatchId] = useState('2499720'); 
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('./network.csv').then((csvData) => {
      setData(csvData);
      const matchIds = Array.from(new Set(csvData.map(d => d.matchId)));

      const dropdown = d3.select("#matchId");
      dropdown.selectAll("option")
        .data(matchIds)
        .enter().append("option")
        .attr("value", d => d)
        .text(d => d);
    });
  }, []);

  useEffect(() => {
    updateGraph();
  }, [selectedMatchId, data]);

  function updateGraph() {
    const canvasContainer = document.getElementById('networkGraphs');
    canvasContainer.innerHTML = ''; 

    const filteredData = data.filter(d => !selectedMatchId || d.matchId === selectedMatchId);

    const totalPasses = filteredData.length;
    const start = 0;
    const middle = Math.max(0, Math.floor(totalPasses / 2) - 25);
    const end = Math.min(totalPasses, Math.floor(totalPasses / 2) + 25);

    createCanvas(filteredData.slice(start, start + 50), 'Phase 1 Passes');
    createCanvas(filteredData.slice((start + middle) / 2, (start + middle) / 2 + 50), 'Phase 2 Passes');
    createCanvas(filteredData.slice(middle, middle + 50), 'Phase 3 Passes');
    createCanvas(filteredData.slice((middle + end - 100) / 2, (middle + end - 100) / 2 + 50), 'Phase 4 Passes');
    createCanvas(filteredData.slice(end - 50, end), 'Phase 5 Passes');

    const explanationCard = document.createElement('div');
    explanationCard.classList.add('flex', 'flex-col', 'items-center', 'mt-4','ml-20','mr-20');
    explanationCard.innerHTML = `
      <h3 class="text-lg font-bold my-2">Network Graph and How it is Helpful?</h3>
      <p class="text-sm text-gray-600">
      This network graph is a valuable tool for football analysts, providing insights into team dynamics and strategies during a match. 
      By analyzing the passing networks created by players in different phases of the game, analysts can identify key patterns, such as player positioning, passing sequences, and team coordination.
      This information can help analysts assess the effectiveness of a team's strategy, identify areas for improvement, and make tactical recommendations. 
      Overall, the graph aids in the comprehensive analysis of a football match, enabling analysts to gain deeper insights into the team's performance and make informed decisions.
</p>

    `;
    canvasContainer.appendChild(explanationCard);
  }

  function createCanvas(passes, title) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const context = canvas.getContext('2d');

    passes.forEach(function (d) {
      const sourceX = (+d.pos_orig_x) * 2; 
      const sourceY = (+d.pos_orig_y) * 2; 
      const destX = (+d.pos_dest_x) * 2;   
      const destY = (+d.pos_dest_y) * 2;  

      context.beginPath();
      context.moveTo(sourceX, sourceY);
      context.lineTo(destX, destY);
      context.strokeStyle = "rgba(0, 0, 0, 0.5)"; 
      context.stroke();

    
      context.beginPath();
      context.arc(sourceX, sourceY, 1.5, 0, 2 * Math.PI);
      context.fillStyle = "blue"; 
      context.fill();
    });

    
    const canvasContainer = document.getElementById('networkGraphs');
    const graphContainer = document.createElement('div');
    graphContainer.classList.add('flex', 'flex-col', 'items-center', 'mx-4');
    const graphTitle = document.createElement('h3');
    graphTitle.textContent = title;
    graphTitle.classList.add('text-lg', 'font-bold', 'my-2');
    graphContainer.appendChild(graphTitle);
    graphContainer.appendChild(canvas);
    canvasContainer.appendChild(graphContainer);
  }

  return (
    <>
    <label htmlFor="matchId">Select Match ID:</label>
    <select
      id="matchId"
      onChange={(e) => setSelectedMatchId(e.target.value)}
      defaultValue={selectedMatchId}
      className="border border-gray-300 rounded px-2 py-1 mx-2"
    >
      <option value="2499720">2449720</option>
    </select>
    <div className="flex justify-center items-center ">
    <div className="m-4">
      <div id="networkGraphs" className="flex flex-wrap justify-center mt-4"></div>
    </div>
    </div>
    </>
  );

}

export default NetworkGraph;
