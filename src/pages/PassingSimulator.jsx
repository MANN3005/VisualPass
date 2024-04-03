import React, { useEffect } from 'react';
import * as d3 from 'd3';

const PassingSimulator = () => {
  useEffect(() => {
    const fieldWidth = 800;
    const fieldHeight = 600;
    const fieldPadding = 10;

    const svg = d3.select("#football-field")
      .attr("width", fieldWidth)
      .attr("height", fieldHeight);

    svg.append("rect")
      .attr("x", fieldPadding)
      .attr("y", fieldPadding)
      .attr("width", fieldWidth - 2 * fieldPadding)
      .attr("height", fieldHeight - 2 * fieldPadding)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    svg.append("line")
      .attr("x1", fieldWidth / 2)
      .attr("y1", fieldPadding)
      .attr("x2", fieldWidth / 2)
      .attr("y2", fieldHeight - fieldPadding)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "10 5");

    svg.append("rect")
      .attr("x", fieldPadding)
      .attr("y", fieldHeight / 4)
      .attr("width", 100)
      .attr("height", fieldHeight / 2)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    svg.append("rect")
      .attr("x", fieldWidth - 100 - fieldPadding)
      .attr("y", fieldHeight / 4)
      .attr("width", 100)
      .attr("height", fieldHeight / 2)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    const ball = svg.append("circle")
      .attr("id", "football")
      .attr("r", 5)
      .attr("cx", fieldWidth / 2)
      .attr("cy", fieldHeight / 2)
      .style("fill", "black");

    function animatePass() {
      const randomX = Math.random() * (fieldWidth - 2 * fieldPadding) + fieldPadding;
      const randomY = Math.random() * (fieldHeight - 2 * fieldPadding) + fieldPadding;

      ball.transition()
        .duration(1000)
        .attr("cx", randomX)
        .attr("cy", randomY)
        .on("end", animatePass);
    }

    animatePass();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg id="football-field" width="800" height="600"></svg>
    </div>
     <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
     <h2 className="text-lg font-bold mb-2">Top Leagues in Europe</h2>
     <p>The map graph showcasing top leagues in Europe offers a compelling justification for its use by providing numerical data alongside geographical representation. By displaying key statistics such as league rankings the map graph enhances the understanding of the significance and competitiveness of each league. This visual presentation not only highlights the geographical spread of top leagues but also provides viewers with quantitative insights that enrich their understanding of the European football landscape.</p>
   </div>
   </>
  );
};

export default PassingSimulator;
