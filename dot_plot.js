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

var svg5 = d3.select("#pie2-0"),
    g5 = svg5.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg6 = d3.select("#pie2-1"),
    g6 = svg6.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg7 = d3.select("#pie2-2"),
    g7 = svg7.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg8 = d3.select("#pie2-3"),
    g8 = svg8.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg9 = d3.select("#pie2-4"),
    g9 = svg9.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var svg10 = d3.select("#pie3-0"),
    g10 = svg10.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg11 = d3.select("#pie3-1"),
    g11 = svg11.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg12 = d3.select("#pie3-2"),
    g12 = svg12.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg13 = d3.select("#pie3-3"),
    g13 = svg13.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var svg14 = d3.select("#pie3-4"),
    g14 = svg14.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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


var pie5 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["High school graduate"];
    });
var pie6 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Bachelor's degree"];
    });
var pie7 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Master's degree"];
    });
var pie8 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Doctoral degree"];
    });
var pie9 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Doctoral degree"];
    });

var pie10 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["High school graduate"];
    });
var pie11 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Bachelor's degree"];
    });
var pie12 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Master's degree"];
    });
var pie13 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
        return d["Doctoral degree"];
    });
var pie14 = d3.pie()
    .sort(null)
    .value(function (d) {
        console.log(d);
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

var path5 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path6 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path7 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path8 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path9 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var path10 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path11 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path12 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path13 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var path14 = d3.arc()
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
    if (this.value == "18 to 24 years") {
        d3.select("#content0")
            .style("visibility", "visible")
            .style("display", "flex");
        d3.select("#content1").style("visibility", "collapse").style("display", "none");
        d3.select("#content2").style("visibility", "collapse").style("display", "none");
    } else if (this.value == "25 to 29 years") {
        d3.select("#content1").style("visibility", "visible").style("display", "flex");
        d3.select("#content0").style("visibility", "collapse").style("display", "none");
        d3.select("#content2").style("visibility", "collapse").style("display", "none");
    } else if (this.value == "25 to 29 years") {
        d3.select("#content2").style("visibility", "visible").style("display", "flex");
        d3.select("#content0").style("visibility", "collapse").style("display", "none");
        d3.select("#content1").style("visibility", "collapse").style("display", "none");
    }
});



d3.csv("data/Education/Educational_Attainment_of_the_Population_2017.csv", function (d) {

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

d3.csv("data/Education/02.csv", function (d) {
    var arc5 = g5.selectAll(".arc")
        .data(pie5(d))
        .enter().append("g")
        .attr("class", "arc");

    arc5.append("path")
        .attr("d", path5)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc6 = g6.selectAll(".arc")
        .data(pie6(d))
        .enter().append("g")
        .attr("class", "arc");

    arc6.append("path")
        .attr("d", path6)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc7 = g7.selectAll(".arc")
        .data(pie7(d))
        .enter().append("g")
        .attr("class", "arc");

    arc7.append("path")
        .attr("d", path7)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc8 = g8.selectAll(".arc")
        .data(pie5(d))
        .enter().append("g")
        .attr("class", "arc");

    arc8.append("path")
        .attr("d", path8)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc9 = g9.selectAll(".arc")
        .data(pie9(d))
        .enter().append("g")
        .attr("class", "arc");

    arc9.append("path")
        .attr("d", path9)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
});

d3.csv("data/Education/03.csv", function (d) {
    var arc10 = g10.selectAll(".arc")
        .data(pie10(d))
        .enter().append("g")
        .attr("class", "arc");

    arc10.append("path")
        .attr("d", path10)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc11 = g11.selectAll(".arc")
        .data(pie11(d))
        .enter().append("g")
        .attr("class", "arc");

    arc11.append("path")
        .attr("d", path11)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc12 = g12.selectAll(".arc")
        .data(pie12(d))
        .enter().append("g")
        .attr("class", "arc");

    arc12.append("path")
        .attr("d", path12)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc13 = g13.selectAll(".arc")
        .data(pie14(d))
        .enter().append("g")
        .attr("class", "arc");

    arc13.append("path")
        .attr("d", path13)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
    var arc14 = g14.selectAll(".arc")
        .data(pie9(d))
        .enter().append("g")
        .attr("class", "arc");

    arc14.append("path")
        .attr("d", path14)
        .attr("fill", function (d) {
            return color(d.data.Sex)
        })
        .style('stroke-width', 0);
});

d3.selectAll(".dots").attr("src", "dot_template.png")

var legendHeight = 30;
var dotLegend = d3.select("#dot_legend").append("svg")
    .attr("width", 800)
    .attr("height", legendHeight)
    .attr("transform", "translate(760, -10)");

dotLegend.append("rect")
    .attr("width", 200)
    .attr("height", legendHeight)
    .attr("fill-opacity", "0")
    .attr("stroke", "#212121")
    .attr("stroke-width", 0.5)

dotLegend.append("circle")
    .attr("r", legendHeight / 3)
    .attr("cx", 30)
    .attr("cy", legendHeight / 3)
    .attr("stroke", "none")
    .attr("fill", "#a0bade")
    .attr("transform", "translate(0, 5)");

dotLegend.append("circle")
    .attr("r", legendHeight / 3)
    .attr("cx", 120)
    .attr("cy", legendHeight / 3)
    .attr("stroke", "none")
    .attr("fill", "#9794d9")
    .attr("transform", "translate(0, 5)");

dotLegend.append("text")
    .attr("x", 50)
    .attr("y", legendHeight / 2 + 5)
    .text("Male");

dotLegend.append("text")
    .attr("x", 140)
    .attr("y", legendHeight / 2 + 5)
    .text("Female");
