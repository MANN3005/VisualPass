import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const DonutChart = () => {
  const svgRef = useRef();
  const legendRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('./passes.csv').then((csvData) => {
      setData(csvData.map(d => ({ Event: d.Event, Count: d.Count })));
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const legendRectSize = 18;
    const legendSpacing = 4;
    const legendWidth = 100;

    const svg = d3.select(svgRef.current)
      .attr('width', width + legendWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${(width + legendWidth) / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 20);

    const pie = d3.pie()
      .value(d => d.Count)
      .sort(null);

    const arcs = pie(data);

    const path = svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', d3.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 10)
          );
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc);
      });

    const uniqueEvents = [...new Set(data.map(d => d.Event))];

    const legend = d3.select(legendRef.current)
      .attr('width', legendWidth + 100)
      .attr('height', height)
      .selectAll('.legend')
      .data(uniqueEvents)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * (legendRectSize + legendSpacing)})`)
      .on('mouseover', function (d) {
        const index = uniqueEvents.findIndex(item => item === d);
        d3.select(path.nodes()[index])
          .dispatch('mouseover');
      })
      .on('mouseout', function (d) {
        const index = uniqueEvents.findIndex(item => item === d);
        d3.select(path.nodes()[index])
          .dispatch('mouseout');
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', (d, i) => color(i))
      .style('stroke', (d, i) => color(i));

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text((d, i) => d);
  };

  return (
    <div style={{ display: 'flex' }}>
      <svg ref={svgRef}></svg>
      <svg ref={legendRef}></svg>
    </div>
  );
};

export default DonutChart;
