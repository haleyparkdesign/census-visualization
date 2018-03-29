//plot
var margin = {
    t: 5,
    r: 25,
    b: 20,
    l: 25
};

var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

var plot1 = d3.select('#plot1')
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

// function to draw the map
var path = d3.geoPath();

// prepare map (array) of data values
var populationPerState = d3.map();

// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "data/data.csv", parseData)
    .defer(d3.json, "data/us_map.json")
    .defer(d3.csv, "data/population.csv", parsePopulation)
    .await(dataloaded);

function dataloaded(err, data, map) {
    console.log(data);
    console.log(map);
    console.log(populationPerState);

    // get max and min values of data
    var enrolledExtent = d3.extent(data, function (d) {
        return d.total
    });

    var extentData = d3.extent(data, function (d) {
        return d.total
    });

    var enrolledPerCapitaExtent = d3.extent(data, function (d) {
        var id = +d.id.toString();
        var statePopulation = (populationPerState.get(id)).estimate2017;
        return d.total / statePopulation
    });

    // scale Color for the map
    var scaleColor = d3.scaleLinear().range(["#ffc5c0", "#ab0405"]).domain(enrolledPerCapitaExtent);


    // Bind the data to the SVG and create one path per GeoJSON feature
    plot1.selectAll(".state")
        .data(topojson.feature(map, map.objects.states).features) //geometry for the states
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function (d) {
            var mapID = +d.id;
            var color = "#f7f7f7"; //default color for those without information

            var statePopulation = (populationPerState.get(mapID)).estimate2017;

            data.forEach(function (e) {
                if (mapID === e.id) {
                    color = scaleColor(e.total / statePopulation)
                }
            });

            return color
        })
}

function parseData(d) {
    console.log("parseData is running");
    var id = d.Id.split("US")[1];
    console.log(id);

    return {
        id: +id,
        state: +d.Geography,
        total: +d["Total; Estimate; Population 25 years and over - Less than 9th grade"]
    }
}


function parsePopulation(d) {
    var id;
    if (d.id !== "") {
        id = +d.id.split("US")[1];
    } else {
        id = d["Geographic Area"];
    }

    populationPerState.set(id, {
        state: d["Geographic Area"],
        april2010: +d["April 1, 2010, Census"],
        estimate2017: +d["Estimate 2017"],
    });
}
