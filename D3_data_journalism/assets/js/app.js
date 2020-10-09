

// styling
var svgWidth = 1000;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG element
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// chart label
chartGroup
  .append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "green")
  .text("Age vs. Income");

// load CSV
d3.csv("../../data.csv").then(function(x) {
    console.log(x);

// scatter plot
// `age vs. income`

  // cast the data from the csv as numbers
  x.forEach(function(data) {
    data.income = +data.income;
    data.age = +data.age
  });

  // xScale
  var xScale = d3.scaleLinear()
    .domain(d3.extent(x, d => d.age))
    .range([0, svgWidth]);

  // yScale
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(x, d => d.income)])
    .range([svgHeight, 0]);

  // axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  // y axis
  chartGroup.append("g")
    .attr("stroke", "green")
    .call(yAxis);

  var circlesGroup = chartGroup.selectAll("circle")
    .data(x)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.income))
    .attr("r", 10)
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // svg path element
  svg
    .append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(x));

  

}).catch(function(error) {
  console.log(error);
});


