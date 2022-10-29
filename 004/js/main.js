// import "../../assets/js/d3.min.js";

var margin = { left: 100, right: 10, top: 10, bottom: 150 };
var width = 600 - margin.left - margin.right;
var height = 450 - margin.top - margin.bottom;

var g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// x label
g.append("text")
  .attr("class", "x-axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");

// y label
g.append("text")
  .attr("class", "y-axis-label")
  .attr("x", -(height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)");

d3.json("../../data/buildings.json")
  .then((data) => {
    var ySeries = data.map((d) => {
      d.height = +d.height;

      return d.height;
    });
    xSeries = data.map((d) => {
      return d.name;
    });

    console.log({ ySeries, max: Math.max(...ySeries), dmax: d3.max(ySeries) });
    var x = d3
      .scaleBand()
      .domain(xSeries)
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    var y = d3
      .scaleLinear()
      .domain([0, d3.max(ySeries)])
      .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)");

    var yAxisCall = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => {
        return d + "m";
      });
    g.append("g")

      .attr("class", "y-axis")
      .call(yAxisCall);
    var rects = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => {
        return y(d.height);
      })
      .attr("x", (d, i) => {
        const xv = x(d.name);
        console.log({ name: d.name, value: x(d.name) });
        return xv;
      })
      .attr("width", x.bandwidth)
      .attr("height", (d) => {
        const h = height - y(d.height);
        console.log({ h: y(d.height), re_h: y.invert(d.height) });
        return h;
      })
      .attr("fill", (d, i) => {
        const colors = d3.schemeDark2;
        return colors[i % d3.schemeDark2.length];
      });
  })
  .catch((err) => {
    console.error(err);
  });
