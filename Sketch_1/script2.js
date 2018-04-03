var width = d3.select('#plot2').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot2').node().clientHeight - margin.t - margin.b;

var plot2 = d3.select('#plot2')

var plot2_svg = plot2.append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "data/data.csv", parseData)
    .await(dataloaded);

function dataloaded(err, data) {
    // Bind the data to the SVG and create one path per GeoJSON feature
    var node = plot2_svg.selectAll(".state")
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

    node.append("text")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.stateAbbr;
        })
        .style("transform", "translate(0px, 4px)");

    var tooltip = plot2.append("div")
        .attr("class", "tooltip")

    var force = d3.forceSimulation(data)
        .on("tick", function (e) {
            node.attr("transform", function (d) {
                return "translate(" +
                    [placeState(d.stateAbbr)[0] + (width / 7), placeState(d.stateAbbr)[1] + (height / 7)] + ")";
            });
        });
}

function parseData(d) {
    var id = d.Id.split("US")[1];
    var total = d["Percent; Estimate; Population 18 to 24 years - Less than high school graduate"]
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
