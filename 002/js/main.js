// const d3 = require("../../assets/js/d3.min.js");

var data = [25, 20, 12, 15, 10, 90, 100, 84, 5];
var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", () => {
    var i = 400 + Math.max(...data);
    console.log({ i });
    return i;
  })
  .attr("height", () => {
    var i = 400 + Math.max(...data);
    console.log({ i });
    return i;
  });
var circles = svg.selectAll("circle").data(data);
circles
  .enter()
  .append("circle")
  .attr("cx", (d, i) => {
    return i * 50 + d;
  })
  .attr("cy", 200)
  .attr("r", (d) => {
    return d;
  })
  .attr("fill", "#004d40");
