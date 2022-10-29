// const d3 = require("../../assets/js/d3.min.js");
d3.csv("../../data/ages.csv")
  .then((d) => {
    d.forEach((element) => {
      element.age = +element.age;
    });
    console.log(d);

    var svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);
    var circles = svg.selectAll("circle").data(d);
    circles
      .enter()
      .append("circle")
      .attr("cx", (d, i) => {
        return i * 50 + d.age;
      })
      .attr("cy", 200)
      .attr("r", (d) => {
        return d.age * 2;
      })
      .attr("fill", (d) => {
        if (d.name == "Henry") {
          return "blue";
        } else if (d.age < 18) {
          return "grey";
        } else {
          return "red";
        }
      });
  })
  .catch((err) => {
    console.error(err);
  });
