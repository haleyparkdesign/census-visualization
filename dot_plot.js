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
    .value(function (d) {
        return d["High school graduate"];
    });

var pie1 = d3.pie()
    .sort(null)
    .value(function (d) {
        return d["Bachelor's degree"];
    });

var pie2 = d3.pie()
    .sort(null)
    .value(function (d) {
        return d["Master's degree"];
    });

var pie3 = d3.pie()
    .sort(null)
    .value(function (d) {
        return d["Doctoral degree"];
    });

var pie4 = d3.pie()
    .sort(null)
    .value(function (d) {
        return d["Doctoral degree"];
    });

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


var typeDispatch = d3.dispatch('changePie');

var valuesPie = [{
        value: "18 to 24 years",
        n: 0
    },
    {
        value: "25 to 29 years",
        n: 1
}, {
        value: "30 to 34 years",
        n: 2
}];

valuesPie.forEach(function (d) {
    d3.select(".values-list")
        .append("option")
        .html(d.value)
        .attr("value", d.value);
});
d3.select(".values-list").on("change", function () {
    typeDispatch.call("changePie", this, this.value);
    console.log(this.value);
});

var showPie = "18 to 24 years";

d3.csv("data/Education/Educational_Attainment_of_the_Population_2017.csv", function (d) {
    typeDispatch.on("changePie", function (type, i) {
        showPie = type;
        // update element and functions according to the type selected
        if (showPie === "18 to 24 years") {
           d = d.filter(function (row) {
                return row.Age == "18 to 24 years"
            });
        } else if (showPie === "25 to 29 years") {
            d = d.filter(function (row) {
                return row.Age == "25 to 29 years"
            });
        } else if (showPie === "30 to 34 years") {
            d = d.filter(function (row) {
                return row.Age == "30 to 34 years"
            });
        }
    })
    
    console.log("d is "+d);
    
    var arc0 = g.selectAll(".arc")
        .data(pie(d))
        .enter().append("g")
        .attr("class", "arc");

    arc0.append("path")
        .attr("d", path)
        .attr("fill", function (d) {
        console.log(d);
            return color(d.data.Sex);
        })
        .style('stroke-width', 0);

    var arc1 = g1.selectAll(".arc")
        .data(pie1(d))
        .enter().append("g")
        .attr("class", "arc");

    arc1.append("path")
        .attr("d", path1)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);

    var arc2 = g2.selectAll(".arc")
        .data(pie2(d))
        .enter().append("g")
        .attr("class", "arc");

    arc2.append("path")
        .attr("d", path2)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);

    var arc3 = g3.selectAll(".arc")
        .data(pie3(d))
        .enter().append("g")
        .attr("class", "arc");

    arc3.append("path")
        .attr("d", path3)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);

    var arc4 = g4.selectAll(".arc")
        .data(pie4(d))
        .enter().append("g")
        .attr("class", "arc");

    arc4.append("path")
        .attr("d", path4)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
});

d3.selectAll(".dots").attr("src", "dot_template.png")

var legendHeight = 30;
var dotLegend = d3.select("#dot_legend").append("svg")
    .attr("width", 800)
    .attr("height", legendHeight);

dotLegend.append("circle")
    .attr("r", legendHeight/2)
    .attr("cx", 300)
    .attr("cy", legendHeight/2)
    .attr("stroke", "none")
    .attr("fill", "#9794d9");
          
dotLegend.append("circle")
    .attr("r", legendHeight/2)
    .attr("cx", 500)
    .attr("cy", legendHeight/2)
    .attr("stroke", "none")
    .attr("fill", "#a0bade");

dotLegend.append("text")
    .attr("x", 330)
    .attr("y", legendHeight/2+5)
    .text("Male");

dotLegend.append("text")
    .attr("x", 530)
    .attr("y", legendHeight/2+5)
    .text("Female");
