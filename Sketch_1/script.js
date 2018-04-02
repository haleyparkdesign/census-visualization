//plot
var margin = {
    t: 5,
    r: 25,
    b: 20,
    l: 25
};

var statesByGeo = [
    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "ME",
    " ", " ", " ", " ", " ", " ", "WI", " ", " ", " ", "VT", "NH",
    "", "WA", "ID", "MT", "ND", "MN", "IL", "MI", "", "NY", "MA", "",
    "", "OR", "NV", "WY", "SD", "IA", "IN", "OH", "PA", "NJ", "CT", "RI",
    " ", "CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "MD", "DE", "",
    "", "", "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "DC", "", "",
    "", "", "", "", "OK", "LA", "MS", "AL", "GA", "", "", "",
    "HI", "AK", "", "", "TX", "", "", "", "", "FL", "", "PR"];

var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

var plot1 = d3.select('#plot1')

var plot1_svg = plot1.append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);


// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "data/data.csv", parseData)
    .await(dataloaded);

function dataloaded(err, data) {
    // Bind the data to the SVG and create one path per GeoJSON feature
    var node = plot1_svg.selectAll(".state")
        .data(data)
        .enter()
        .append("g")
        .on("mouseover", function (d) {
            tooltip
                .html(d.state + "<br/>" + d.total + "%");

            return tooltip
                .style("visibility", "visible")
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
            return d.stateAbbr
        })
        .style("transform", "translate(0px, 4px)");

    var tooltip = plot1
        .append("div")
        .attr("class", "tooltip")

    var force = d3.forceSimulation(data)
        .on("tick", ticked);

    function ticked(e) {
        node.attr("transform", function (d) {
            return "translate(" + [placeState(d.stateAbbr)[0] + (width / 7), placeState(d.stateAbbr)[1] + ((height) / 9)] + ")";
        });
    };
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

function placeState(state) {
    var x = 0;
    var y = 0;
    var factor = 60; //distribution factor

    for (i = 0; i < statesByGeo.length; i++) {
        if (statesByGeo[i] == state) {
            x = i % 12;
            y = Math.round(i / 12) - 1;
        }
    }

    x = x * factor;
    y = y * factor;
    return [x, y]
}
