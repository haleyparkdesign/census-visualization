//var margin = {t: 5, r: 25, b: 20, l: 25}; //this is an object
//var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
//    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;
//
//// Append svg to div
//var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
//    .append('svg')
//    .attr('width', width + margin.r + margin.l)
//    .attr('height', height + margin.t + margin.b);

var svg = d3.select("#pie"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 83.33,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var svg1 = d3.select("#pie1"),
    g1 = svg1.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg2 = d3.select("#pie2"),
    g2 = svg2.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg3 = d3.select("#pie3"),
    g3 = svg3.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg4 = d3.select("#pie4"),
    g4 = svg4.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#a0bade", "#9794d9"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d["High school graduate"]; });

var pie1 = d3.pie()
    .sort(null)
    .value(function(d) { return d["Bachelor's degree"]; });

var pie2 = d3.pie()
    .sort(null)
    .value(function(d) { return d["Master's degree"]; });

var pie3 = d3.pie()
    .sort(null)
    .value(function(d) { return d["Doctoral degree"]; });

var pie4 = d3.pie()
    .sort(null)
    .value(function(d) { return d["Doctoral degree"]; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var path1 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var path2 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var path3 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var path4 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

d3.csv("Sketch_2/data/Education/Educational_Attainment_of_the_Population_2017.csv", function(d) {
  d = d.filter(function(row) { return row.Age == "..18 to 24 years" });
    
    var arc0 = g.selectAll(".arc")
    .data(pie(d))
    .enter().append("g")
    .attr("class", "arc");

  arc0.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.Sex); })
      .style('stroke-width', 0);
  
    var arc1 = g1.selectAll(".arc")
    .data(pie1(d))
    .enter().append("g")
    .attr("class", "arc");

    arc1.append("path")
      .attr("d", path1)
      .attr("fill", function(d) { return color(d.data.Sex) })
      .style('stroke-width', 0);
    
    var arc2 = g2.selectAll(".arc")
    .data(pie2(d))
    .enter().append("g")
    .attr("class", "arc");

    arc2.append("path")
      .attr("d", path2)
      .attr("fill", function(d) { return color(d.data.Sex) })
      .style('stroke-width', 0);
    
    var arc3 = g3.selectAll(".arc")
    .data(pie3(d))
    .enter().append("g")
    .attr("class", "arc");

    arc3.append("path")
      .attr("d", path3)
      .attr("fill", function(d) { return color(d.data.Sex) })
      .style('stroke-width', 0);
    
    var arc4 = g4.selectAll(".arc")
    .data(pie4(d))
    .enter().append("g")
    .attr("class", "arc");

    arc4.append("path")
      .attr("d", path4)
      .attr("fill", function(d) { return color(d.data.Sex) })
      .style('stroke-width', 0);
    
});

function dots(){
    return "Sketch_2/dot_template.png";
}
function dots1(){
    return "Sketch_2/dot_template.png";
}
function dots2(){
    return "Sketch_2/dot_template.png";
}
function dots3(){
    return "Sketch_2/dot_template.png";
}
function dots4(){
    return "Sketch_2/dot_template.png";
}
document.getElementById("dots4").src = dots4();
document.getElementById("dots3").src = dots3();
document.getElementById("dots2").src = dots2();
document.getElementById("dots1").src = dots1();
document.getElementById("dots").src = dots(); 
    
    
