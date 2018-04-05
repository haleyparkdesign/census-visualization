var margin = {top: 10, bottom: 10, left: 10, right: 10};
var width =  d3.select("#plot3").node().clientWidth - margin.left - margin.right;
var height =  d3.select("#plot3").node().clientHeight - margin.top - margin.bottom;
var radius = height*2/5;

var plot = d3.select("#plot3")
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);

var queue = d3.queue()
    .defer(d3.csv, "Sketch_3/income_education_condensed.csv", parseData)
    .await(dataloaded);

var color = ["#3961a0", "#a03887", "#7b38a0", "#38a057", "#98dd6a", "#dddd69", "#d89950", "#d85d50", "#d3851f", "#1ed278"]

function dataloaded (error,data){
    if(error) throw error;
    console.log(data);
    
    starPlot(data[0]);
    //function to select which data to display
    plotData(data[2]);
    plotData(data[6]);
    plotData(data[9]);
    legend([data[2], data[6], data[9]]);
}

//separate into plotting chart and plotting data
function starPlot(datum){
    //radial lines
    var incomeGroups = datum.values.length;
    var theta = 2*Math.PI/incomeGroups;
    
    //rings
    var levels = 4;
    var rings = plot.append("g")
        .attr("transform", "translate(" + (width*1/3+margin.left) + "," +  (height/2+margin.top) + ")");
    for(var n=1; n<=levels; n++){   
        //lines
        for(var i=0; i<incomeGroups; i++){
            //var theta = 2*Math.PI/incomeGroups;
            var r = -radius*n/levels;
            rings.append("line")
                //.style("stroke", "grey")
                .attr("transform", "rotate("+180/Math.PI*theta*i+")")
                .attr("x1", 0)
                .attr("y1", r)
                .attr("x2", r*Math.sin(theta))
                .attr("y2", r*Math.cos(theta));
        }
        //value along rings
        rings.append("g")
            .append("text")
            .attr("class", "label")
            //.attr("position", "absolute")
            //.attr("z-index", "1")
            .attr("x", 5)
            .attr("y", -n*radius/levels+5)
            //manual, currently based on x scale, make automatic
            .text((n*55/levels).toFixed(0)+"%");
    }
    
    var radials = plot.append("g")
        .attr("transform", "translate(" + (width*1/3+margin.left) + "," +  (height/2+margin.top) + ")");
    for(i=0; i<incomeGroups; i++){
        radials.append("line")
            .attr("class", "radial")
            .attr("transform", "rotate("+180/Math.PI*theta*i+")")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -radius);
        //radius labels
        radials.append("g")
            .attr("transform", "translate("+((radius+10)*Math.sin(theta*i))+","+(-(radius+10)*Math.cos(theta*i))+")")
            .append("text")
            .attr("class", "label")
            .attr("x", function(){
                var x = -40; 
                if(theta*i>0 && theta*i<Math.PI)
                    x+=35;
                else if(theta*i>Math.PI && theta*i<2*Math.PI)
                    x-=40;
                if(theta*i == Math.PI*10/7)
                    x+=15;
                return x})
            .attr("y", 0)
            .text(datum.values[i].bracket);
    }
}

function plotData(datum){
    var incomeGroups = datum.values.length;
    var theta = 2*Math.PI/incomeGroups;
    
    //data - points, lines
    //var maxval = d3.max(datum.values,function(d){return d.pct});
    var scale = d3.scaleLinear()
        .domain([0, .55])
        .range([0, radius]);
    //convert values to y coords
    var y = datum.values.map(function(d){
        return scale(d.pct);})
    
    //fill areas inside dataset
    var line = d3.radialLine()
        .angle(function(d, i){return i*theta})
        .radius(function(d){return scale(d.pct)})
    plot.append("path")
        .attr("transform", "translate(" + (width*1/3+margin.left) + "," +  (height/2+margin.top) + ")")
        .attr("class", "line")
        .attr("fill", color[datum.index])
        .attr("d", line(datum.values));
    
    //value points on radials
    var values = plot.append("g")
        .attr("transform", "translate(" + (width*1/3+margin.left) + "," +  (height/2+margin.top) + ")");
    for(var i=0; i<incomeGroups; i++){
        values.append("circle")
            .attr("transform", "rotate("+i*360/incomeGroups+")")
            .attr("r", 2)
            .attr("cx", 0)
            .attr("cy", -y[i])
            .attr("fill", "#efefef"); 
    }
}

function legend(datums){
    //title of legend
    var legend = plot.append("g")
        .attr("transform", "translate(" + (width*2/3+margin.left) + "," +  (margin.top+50) + ")");
    legend.append("g")
        .append("text")
        .attr("class", "legend")
        .attr("x", 0)
        .attr("y", 0)
        .text("Education Attainment");
    
    //color key and label for each education level listed
    for(var i=0; i<datums.length; i++){
        legend.append("g")
            .append("text")
            .attr("class", "legend")
            .attr("font-size", "12px")
            .attr("x", 30)
            .attr("y", (i+1)*30)
            .text(datums[i].education);
        legend.append("rect")
            .attr("x",0)
            .attr("y", (i+1)*30-15)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", color[datums[i].index])
            .attr("stroke", "#efefef");
    }
}

function parseData(d, i){
    //format data for each education level's income brackets in compiled data sheet
    var total = +d["Total"];
    return{
        index: i,
        education: d["Characteristic"],
        total: total,
        values: [{bracket: "Less than $30k", pct: +d["0-30"]/total},
                 {bracket: "$30k-$60k", pct: +d["30-60"]/total},
                 {bracket: "$60k-$90k", pct: +d["60-90"]/total},
                 {bracket: "$90k-$120k", pct: +d["90-120"]/total},
                 {bracket: "$120k-$150k", pct: +d["120-150"]/total},
                 {bracket: "$150k-$180k", pct: +d["150-180"]/total},
                 {bracket: "Greater than $180k", pct: +d["180+"]/total}]
    }
}
