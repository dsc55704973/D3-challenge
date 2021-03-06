
// make responsive
function makeResponsive() {
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // styling
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 20,
    bottom: 60,
    right: 100,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // chartGroup
  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // axes labels
  // x axis label
  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "purple")
    .text("Healthcare");

  // y axis label
  chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", -40 - (height / 2))
    .attr("dy", "1em")
    .attr("fill", "purple")
    .classed("axis-text", true)
    .text("Income");

  // load CSV
  d3.csv("../../data.csv").then(function(x) {
      console.log(x);

  // scatter plot
  // `healthcare vs. income`

    // cast the data from the csv as numbers
    x.forEach(function(data) {
      data.income = +data.income;
      data.healthcare = +data.healthcare
    });

    // xScale
    var xScale = d3
      .scaleLinear()
      .domain([0, d3.max(x, d=>d.healthcare)])
      .range([0, width]);

    // yScale
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(x, d=>d.income)])
      .range([height, 0]);

    // axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // x axis
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    // y axis
    chartGroup
      .append("g")
      .attr("stroke", "purple")
      .call(yAxis);

    // circle group
    var circlesGroup = chartGroup
      .selectAll("circle")
      .data(x)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.healthcare))
      .attr("cy", d => yScale(d.income))
      .attr("r", 10)
      .attr("fill", "red")
      .attr("opacity", ".5");

    var circleLabels = chartGroup
      .selectAll(null)
      .data(x)
      .enter()
      .append("text");

    circleLabels
      .attr("x", d=> {
        return xScale(d.healthcare);
      })
      .attr("y", d=> {
        return yScale(d.income);
      })
      .text(d=> {
        return d.abbr;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");

  // error
  }).catch(function(error) {
    console.log(error);
  });

};

// call makeResponsive 
makeResponsive();
d3.select(window).on("resize", makeResponsive);