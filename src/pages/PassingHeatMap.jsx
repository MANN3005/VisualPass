import React, { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { interpolateRgb } from 'd3-interpolate';

const PassingHeatmap = () => {
  const [passes, setPasses] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await csv('./heatmap.csv');
      setPasses(data);
      const uniqueMatchIds = Array.from(new Set(data.map((d) => d.matchId)));
      setMatchIds(uniqueMatchIds);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (passes.length > 0 && selectedMatchId) {
      createHeatmap(passes, selectedMatchId);
    }
  }, [passes, selectedMatchId]);

  const createHeatmap = (data, matchId) => {
    selectAll('#heatmap svg').remove();

    const filteredData = data.filter((d) => d.matchId === matchId);
    const heatmapData = filteredData.reduce((acc, curr) => {
      const key = `${curr.pos_orig_x},${curr.pos_orig_y}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = scaleLinear().domain([0, 100]).range([0, width]);
    const y = scaleLinear().domain([0, 100]).range([height, 0]);
    const color = interpolateRgb('black', 'black');

    const svg = select('#heatmap')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('rect').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height).style('fill', 'none').style('stroke', 'black');

    svg.append('line').attr('x1', width / 2).attr('y1', 0).attr('x2', width / 2).attr('y2', height).style('stroke', 'black');
    svg.append('rect').attr('x', 0).attr('y', height * (1 - 50 / 100)).attr('width', width).attr('height', height * (50 / 100)).style('fill', 'none').style('stroke', 'black');

    const maxValue = max(Object.values(heatmapData));
    const colorScale = scaleLinear().domain([0, maxValue]).range([0, 1]);

    Object.keys(heatmapData).forEach((key) => {
      const [xCoord, yCoord] = key.split(',').map((d) => +d);

      svg
        .append('rect')
        .attr('x', x(xCoord))
        .attr('y', y(yCoord))
        .attr('width', width / 100)
        .attr('height', height / 100)
        .style('fill', color(colorScale(heatmapData[key])))
        .style('stroke', 'none');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <select
        className="mt-4 mb-2 p-2 border border-gray-300 rounded"
        onChange={(e) => setSelectedMatchId(e.target.value)}
        value={selectedMatchId}
      >
        <option value="">All Matches</option>
        {matchIds.map((matchId) => (
          <option key={matchId} value={matchId}>
            {`Match ${matchId}`}
          </option>
        ))}
      </select>
      <div id="heatmap" className="w-full flex flex-col items-center" />
    <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
    <h2 className="text-lg font-bold mb-2">Passing Heatmap</h2>
    <p> This heatmap represents the passing distribution on the field for the selected match. Each square represents the frequency of passes
        originating from that area, with darker squares indicating higher frequencies. The field boundaries, center line, and penalty areas are marked
        for reference.</p>
  </div>
  </div>
    
  );
};

export default PassingHeatmap;
