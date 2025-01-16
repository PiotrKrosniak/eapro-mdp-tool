// Example D3.js code to create a chart visualization
function updateChart(chartData) {
  d3.select("#chartSvg").selectAll("*").remove(); // Clear existing content
  d3.select("#chartSvg")
    .append("text")
    .attr("x", 50)
    .attr("y", 50)
    .text("Chart for selected country")
    .style("font-size", "24px")
    .style("fill", "black");
} 