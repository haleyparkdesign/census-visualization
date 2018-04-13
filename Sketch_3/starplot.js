var margin = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
};
var width = d3.select("#plot3").node().clientWidth - margin.left - margin.right;
var height = d3.select("#plot3").node().clientHeight - margin.top - margin.bottom;
var radius = width * 1 / 5;

//contains all content of visualization
var plot = d3.select("#plot3")
    .append('svg')
    .attr('width', width + margin.right + margin.left + 4)
    .attr('height', height + margin.top + margin.bottom);

var queue = d3.queue()
    .defer(d3.csv, "Sketch_3/income_education_condensed.csv", parseData)
    .await(dataloaded);

var colors = ["#5b2c36", "#de413a", "#ebcdd5", "#c58f69", "#233b5d", "#8f9190", "#09585d", "#9b9740", "#5285c4", "#6e00a8"]

function dataloaded(error, data) {
    if (error) throw error;
    //console.log(data);

    var activated = new Array(data.length);
    activated.fill(false);

    starPlot(data[0]);
    legend(data);
    plot.selectAll("rect")
        .on("click", function () {
            var index = (d3.select(this).attr("y") - 35 - margin.top) / 30 + 1;
            if (!activated[index]) {
                d3.select(this)
                    .attr("stroke", "#141414")
                    .attr("stroke-width", 4);
                activated[index] = true;
            } else {
                d3.select(this)
                    .attr("stroke", "#efefef")
                    .attr("stroke-width", 1);
                activated[index] = false;
            }

            plot.selectAll("path").remove();
            plot.selectAll("circle").remove();

            for (var i = 0; i < activated.length; i++)
                if (activated[i])
                    plotData(data[i])

            d3.event.stopPropagation();
        });
    d3.select("rect").on("click");
}

//plots the grid of the chart, based upon a sample datum which defines the number of radial segments and the levels of values
function starPlot(datum) {
    var incomeGroups = datum.values.length;
    var theta = 2 * Math.PI / incomeGroups;

    //rings for percentages
    var levels = 3;
    var rings = plot.append("g")
        .attr("transform", "translate(" + (width * 1 / 3 + margin.left) + "," + (height / 2 + margin.top) + ")");
    for (var n = 1; n <= levels; n++) {
        //lines
        for (var i = 0; i < incomeGroups; i++) {
            //var theta = 2*Math.PI/incomeGroups;
            var r = -radius * n / levels;
            rings.append("line")
                .attr("class", "ring")
                .attr("transform", "rotate(" + 180 / Math.PI * theta * i + ")")
                .attr("x1", 0)
                .attr("y1", r)
                .attr("x2", r * Math.sin(theta))
                .attr("y2", r * Math.cos(theta));
        }
        //value label along rings
        rings.append("g")
            .append("text")
            .attr("class", "value")
            .attr("x", 5)
            .attr("y", -n * radius / levels + 10)
            //this is manual, currently based on x scale, need to make automatic
            .text((n * 60 / levels).toFixed(0) + "%");
    }

    //radial lines for each income bracket
    var radials = plot.append("g")
        .attr("transform", "translate(" + (width * 1 / 3 + margin.left) + "," + (height / 2 + margin.top) + ")");
    for (i = 0; i < incomeGroups; i++) {
        radials.append("line")
            .attr("class", "radial")
            .attr("transform", "rotate(" + 180 / Math.PI * theta * i + ")")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -radius);
        //radius labels
        radials.append("g")
            .attr("transform", "translate(" + ((radius + 10) * Math.sin(theta * i)) + "," + (-(radius + 10) * Math.cos(theta * i)) + ")")
            .append("text")
            .attr("class", "label")
            .attr("x", function () {
                var x = -40;
                if (theta * i > 0 && theta * i < Math.PI)
                    x += 35;
                else if (theta * i > Math.PI && theta * i < 2 * Math.PI)
                    x -= 65;
                if (theta * i == Math.PI * 10 / 7)
                    x += 10;
                return x
            })
            .attr("y", 0)
            .text(datum.values[i].bracket);
        //.call(wrap, 80);
    }
}

function plotData(datum) {
    //plots points along radial lines in addition to filling area enclosed by those points
    var incomeGroups = datum.values.length;
    var theta = 2 * Math.PI / incomeGroups;

    //data - points, lines
    //var maxval = d3.max(datum.values,function(d){return d.pct});
    var scale = d3.scaleLinear()
        .domain([0, .60])
        .range([0, radius]);
    //convert values to y coords
    var y = datum.values.map(function (d) {
        return scale(d.pct);
    })

    //fill areas inside dataset
    var line = d3.radialLine()
        .angle(function (d, i) {
            return i * theta
        })
        .radius(function (d) {
            return scale(d.pct)
        })
    plot.append("path")
        .attr("transform", "translate(" + (width * 1 / 3 + margin.left) + "," + (height / 2 + margin.top) + ")")
        .attr("class", "line")
        .attr("fill", colors[datum.index])
        .attr("d", line(datum.values));

    //value points on radials
    var values = plot.append("g")
        .attr("transform", "translate(" + (width * 1 / 3 + margin.left) + "," + (height / 2 + margin.top) + ")");
    for (var i = 0; i < incomeGroups; i++) {
        values.append("circle")
            .attr("transform", "rotate(" + i * 360 / incomeGroups + ")")
            .attr("r", 2.5)
            .attr("cx", 0)
            .attr("cy", -y[i])
            .attr("fill", colors[datum.index])
            .attr("stroke", "black");
    }
}

function legend(datums) {
    //title of legend
    var legend = plot.append("g")
        .attr("transform", "translate(" + (width * 3 / 5 + margin.left + 40) + "," + (margin.top + 50) + ")");
    legend.append("g")
        .append("text")
        .attr("class", "legend")
        .attr("x", 0)
        .attr("y", 0)
        .text("Educational Attainment")
        .style("font-weight", "400");

    //color key and label for each education level listed
    for (var i = 0; i < datums.length; i++) {
        legend.append("g")
            .append("text")
            .attr("class", "legend")
            .attr("font-size", "12px")
            .attr("x", 30)
            .attr("y", (i + 1) * 30)
            .text(datums[i].education);

        legend.append("rect")
            .attr("x", 0)
            .attr("y", (i + 1) * 30 - 15)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", colors[datums[i].index])
            .attr("stroke", "#efefef")
            .attr("stroke-linecap", "round");
    }
}

function parseData(d, i) {
    //format data for each education level's income brackets in compiled data sheet
    var total = +d["Total"];
    return {
        index: i,
        education: d["Characteristic"],
        total: total,
        values: [{
                bracket: "Less than $30k",
                pct: +d["0-30"] / total
            },
            {
                bracket: "$30k-$60k",
                pct: +d["30-60"] / total
            },
            {
                bracket: "$60k-$90k",
                pct: +d["60-90"] / total
            },
            {
                bracket: "$90k-$120k",
                pct: +d["90-120"] / total
            },
            {
                bracket: "$120k-$150k",
                pct: +d["120-150"] / total
            },
            {
                bracket: "$150k-$180k",
                pct: +d["150-180"] / total
            },
            {
                bracket: "Greater than $180k",
                pct: +d["180+"] / total
            }]
    }
}

//Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
} //wrap
