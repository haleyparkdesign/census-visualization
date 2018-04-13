var slider = d3.select("#eduRange");
var sliderValue = 0;

// Update the current slider value each time you drag the slider handle
slider.on("input", function () {
    d3.selectAll(".levelText").style("font-weight", "100");
    d3.select("#edu" + this.value).style("font-weight", "800");
    sliderValue = this.value;
    updateData(sliderValue);
})

var statesByGeo = [
    "AK", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "ME",
    "  ", "  ", "  ", "  ", "  ", "  ", "WI", "  ", "  ", "  ", "VT", "NH",
    "  ", "WA", "ID", "MT", "ND", "MN", "IL", "MI", "  ", "NY", "MA", "  ",
    "  ", "OR", "NV", "WY", "SD", "IA", "IN", "OH", "PA", "NJ", "CT", "RI",
    "  ", "CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "MD", "DE", "  ",
    "  ", "  ", "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "DC", "  ", "  ",
    "  ", "  ", "  ", "  ", "OK", "LA", "MS", "AL", "GA", "  ", "  ", "  ",
    "HI", "  ", "  ", "  ", "TX", "  ", "  ", "  ", "  ", "FL", "  ", "PR"];

var width = d3.select('#plot1').node().clientWidth + 200,
    height = d3.select('#plot1').node().clientHeight;

var plot1 = d3.select('#plot1')

var plot1_svg = plot1.append('svg')
    .attr('width', width)
    .attr('height', height);

// queue data files, parse them and use them
var rows = ["Percent; Estimate; Population 25 years and over - Less than 9th grade", "Percent; Margin of Error; Population 25 years and over - 9th to 12th grade, no diploma", "Percent; Estimate; Population 25 years and over - High school graduate (includes equivalency)", "Percent; Estimate; Population 25 years and over - Some college, no degree", "Percent; Estimate; Population 25 years and over - Associate's degree", "Percent; Estimate; Population 25 years and over - Bachelor's degree", "Percent; Estimate; Population 25 years and over - Graduate or professional degree"];
var sizeFactor = 1.1;

d3.csv("Sketch_1/data/data.csv", function (d) {
    var id = d.Id.split("US")[1];
    var total = d[rows[0]];
    var total1 = d[rows[1]];
    var total2 = d[rows[2]];
    var total3 = d[rows[3]];
    var total4 = d[rows[4]];
    var total5 = d[rows[5]];
    var total6 = d[rows[6]];
    var total7 = d[rows[7]];
    var state = d.Geography;
    var stateAbbr;
    for (i = 0; i < us_states.length; i++) {
        if (us_states[i].name == state.toUpperCase()) {
            stateAbbr = us_states[i].abbreviation;
        }
    }
    return {
        id: +id,
        state: state,
        total: +total,
        total1: +total1,
        total2: +total2,
        total3: +total3,
        total4: +total4,
        total5: +total5,
        total6: +total6,
        total7: +total7,
        stateAbbr: stateAbbr
    };
}, function (data) {
    // Bind the data to the SVG and create one path per GeoJSON feature
    var node = plot1_svg.selectAll(".state")
        .data(data)
        .enter()
        .append("g")
        .on("mouseover", function (d) {
            var percentage = d.total;
            if (sliderValue == 1) {
                percentage = d.total2;
            } else if (sliderValue == 2) {
                percentage = d.total3;
            } else if (sliderValue == 3) {
                percentage = d.total4;
            } else if (sliderValue == 4) {
                percentage = d.total5;
            } else if (sliderValue == 5) {
                percentage = d.total6;
            }
            tooltip.html(d.state + "<br/>" + percentage + "%");
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip
                .style("left", (d3.event.pageX - 245) + "px")
                .style("top", (d3.event.pageY - 655) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        })
        .style("cursor", "pointer");

    var circle = node.append("circle")
        .attr("r", function (d) {
            var mapID = +d.id;
            var r = 0; //default radius for those without information

            data.forEach(function (e) {
                if (mapID === e.id) {
                    r = e.total + e.total1;
                }
            });
            return r;
        })
        .attr("fill", " #F7B4B1")
        .attr("stroke-width", 1)
        .attr("opacity", 0.8)
        .attr("class", "state-circle")

    node.append("text")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.stateAbbr;
        })
        .style("transform", "translate(0px, 4px)");

    var tooltip = plot1.append("div")
        .attr("class", "tooltip")

    var force = d3.forceSimulation(data)
        .on("tick", function (e) {
            node.attr("transform", function (d) {
                return "translate(" + [placeState(d.stateAbbr)[0] + (width / 7), placeState(d.stateAbbr)[1] + (height / 7)] + ")";
            });
        });
});

function updateData(sliderValue) {
    // Get the data again
    d3.csv("Sketch_1/data/data.csv", function (d) {}, function (data) {
        var svg = d3.select("body").transition();
        svg.selectAll(".state-circle")
            .attr("r", function (d) {
                if (sliderValue == 0) {
                    return (d.total + d.total1) * sizeFactor;
                } else if (sliderValue == 1) {
                    return d.total2 * sizeFactor;
                } else if (sliderValue == 2) {
                    return d.total3 * sizeFactor;
                } else if (sliderValue == 3) {
                    return d.total4 * sizeFactor;
                } else if (sliderValue == 4) {
                    return d.total5 * sizeFactor;
                } else if (sliderValue == 5) {
                    return d.total6 * sizeFactor;
                } else {
                    return d.total7 * sizeFactor;
                }
            })

        svg.selectAll(".toolTip").on("mouseover", function (d) {
            if (sliderValue == 0) {
                return d.state + "<br/>" + (d.total + d.total1) + "%";
            } else if (sliderValue == 1) {
                d.state + "<br/>" + d.total2 + "%";
            } else if (sliderValue == 2) {
                d.state + "<br/>" + d.total3 + "%";
            } else if (sliderValue == 3) {
                d.state + "<br/>" + d.total4 + "%";
            } else if (sliderValue == 4) {
                d.state + "<br/>" + d.total5 + "%";
            } else if (sliderValue == 5) {
                d.state + "<br/>" + d.total6 + "%";
            } else {
                d.state + "<br/>" + d.total7 + "%";
            }

        })
    });
}

function placeState(state) {
    var x = 0;
    var y = 0;
    var factor = 60; //distribution factor

    for (i = 0; i < statesByGeo.length; i++) {
        if (statesByGeo[i] == state) {
            x = i % 12;
            y = Math.floor(i / 12);
        }
    }
    x = x * factor;
    y = y * factor;
    return [x, y]
}

var legend = plot1_svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(994,80)")

legend.append("rect")
    .attr("width", 150)
    .attr("height", 300)
    .attr("fill-opacity", "0")
    .attr("stroke", "#212121")
    .attr("stroke-width", 0.5)
    .attr("transform", "translate(-54, -30)");

var leg1 = legend.append("g");

leg1.append("circle").attr("r", 10 * sizeFactor)
    .attr("fill", "#F7B4B1")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8);

leg1.append("text").text("10%")

var leg2 = legend.append("g")
    .attr("transform", "translate(0,50)");

leg2.append("circle").attr("r", 20 * sizeFactor)
    .attr("fill", " #F7B4B1")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8)

leg2.append("text").text("20%")

var leg3 = legend.append("g")
    .attr("transform", "translate(0,120)");

leg3.append("circle").attr("r", 30 * sizeFactor)
    .attr("fill", " #F7B4B1")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8)

leg3.append("text").text("30%")

var leg4 = legend.append("g")
    .attr("transform", "translate(0,210)");

leg4.append("circle").attr("r", 40 * sizeFactor)
    .attr("fill", " #F7B4B1")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8)

leg4.append("text").text("40%")

legend.selectAll("text").attr("transform", "translate(55, 5)")
