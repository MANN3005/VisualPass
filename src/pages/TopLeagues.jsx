import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TopLeagues = () => {
  useEffect(() => {
    const svg = d3.select("#graph");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const projection = d3.geoMercator()
      .center([10, 50])
      .scale(400)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath()
      .projection(projection);

    const leagueCountries = ["United Kingdom", "Spain", "Italy", "Germany", "France"];
    const leagueCountriesLeagues = ["Premier", "La Liga", "Serie A", "Bundesliga", "Ligue 1"]

    const colors = ["red", "blue", "green", "orange", "purple"];
    d3.json('/europe.geojson').then(function (europeData) {
        svg.selectAll("path")
          .data(europeData.features)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", function (d) {
            const index = leagueCountries.indexOf(d.properties.NAME);
            return index !== -1 ? colors[index] : "lightgrey";
          })
          .on("mouseover", function() {
            d3.select(this)
              .transition()
              .duration(500)
              .attr("transform", "scale(1.1, 1.1) translate(10, 10)");
          })
          .on("mouseout", function() {
            d3.select(this)
              .transition()
              .duration(500)
              .attr("transform", "scale(1, 1)");
          });
      });
  
    const legend = d3.select("#legend")
      .selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(100," + (10 + i * 20) + ")"; })
      .on("click", function(_, i) {
        const selectedCountry = leagueCountries[i];
        svg.selectAll("path")
          .filter(function(d) { return d.properties.NAME === selectedCountry; })
          .attr("class", "highlight")
          .transition()
          .duration(2000)
          .attr("fill", function(d) {
            const index = leagueCountries.indexOf(d.properties.NAME);
            return index !== -1 ? colors[index] : "lightgrey";
          })
          .on("end", function() {
            d3.select(this).attr("class", "");
          });
      });

    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d, i) { return leagueCountriesLeagues[i]; });

  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <svg id="graph" width="400" height="400"></svg>
          <div className="flex flex-col ml-4 mt-20"> 
            <svg id="legend" width="200" height="200"></svg>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Top Leagues in Europe</h2>
        <p>The map graph showcasing top leagues in Europe offers a compelling justification for its use by providing numerical data alongside geographical representation. By displaying key statistics such as league rankings the map graph enhances the understanding of the significance and competitiveness of each league. This visual presentation not only highlights the geographical spread of top leagues but also provides viewers with quantitative insights that enrich their understanding of the European football landscape.</p>
      </div>
    </>
  );
  
};

export default TopLeagues;
