import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const width = 400; 
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const maxValue = 12000; 
  
    const radius = Math.min(chartWidth, chartHeight) / 2;
    const angleSlice = (Math.PI * 2) / data.length;
  
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
    const axisGrid = svg.append('g')
      .attr('class', 'axisWrapper');
  
    const axes = axisGrid.selectAll('.axis')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis');
  
    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('class', 'line')
      .style('stroke', 'black')
      .style('stroke-width', '2px');
  
    axes.append('text')
      .attr('class', 'axisLabel')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2 +0.1))
      .attr('y', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2+0.1))
      .text(d => d.Position)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'black');
  
    const radarLine = d3.lineRadial()
      .radius((d) => (d.Count / maxValue) * radius)
      .angle((d, i) => i * angleSlice);
  
    svg.selectAll('.radarArea')
      .data([data])
      .enter()
      .append('path')
      .attr('class', 'radarArea')
      .attr('d', radarLine)
      .style('fill', 'rgba(255, 0, 0, 0.5)');
  };
  return <svg ref={svgRef}></svg>;
};

export default RadarChart;
