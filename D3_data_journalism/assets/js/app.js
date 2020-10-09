// @TODO: YOUR CODE HERE!

// CSV
var svgWidth = 1000;
var svgHeight = 500;

// SVG element
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

d3.csv("../../data.csv").then(function(x) {
    console.log(x);

// scatter plot
// `Healthcare vs. Poverty`

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

  // line generator
  var createLine = d3.line()
    .x(data => xScale(data.age))
    .y(data => yScale(data.income));

  // Append a path element to the svg
  svg.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(x));

}).catch(function(error) {
  console.log(error);
});


