var slider = d3.select("#eduRange");
var output = d3.select(".eduLevel");

// Update the current slider value (each time you drag the slider handle)
slider.on("input", function () {
    if (this.value == 0) {
        output.style("left", "7%")
            .text("Less than 9th grade");
    } else if (this.value == 1) {
        output.style("left", "25%")
            .text("High school graduate or equivalent");
    } else if (this.value == 2) {
        output.style("left", "50%")
            .text("Some college or associate's degree");
    } else {
        output.style("left", "75%")
            .text("Bachelor's degree or higher");
    }
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

var width = d3.select('#plot1').node().clientWidth,
    height = d3.select('#plot1').node().clientHeight;

var plot1 = d3.select('#plot1')

var plot1_svg = plot1.append('svg')
    .attr('width', width)
    .attr('height', height);

// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "Sketch_1/data/data.csv", parseData)
    .await(dataloaded);

function dataloaded(err, data) {
    // Bind the data to the SVG and create one path per GeoJSON feature
    var node = plot1_svg.selectAll(".state")
        .data(data)
        .enter()
        .append("g")
        .on("mouseover", function (d) {
            tooltip.html(d.state + "<br/>" + d.total + "%");

            return tooltip.style("visibility", "visible")
        })
        .on("mousemove", function () {
            return tooltip
                .style("top", (d3.event.pageY - 10) + "px")
                .style("left", (d3.event.pageX + 10) + "px");
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
                    r = e.radius;
                }
            });

            return r;
        })
        .attr("fill", " #F7B4B1")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.8)

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
}

function parseData(d) {
    var id = d.Id.split("US")[1];
    var total = d["Percent; Estimate; Population 25 years and over - Less than 9th grade"]
    var radius = total * 2;
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
        radius: +radius,
        stateAbbr: stateAbbr
    }
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
