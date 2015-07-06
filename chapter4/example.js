var scatterData = [{friends: 5, salary: 22000},
{friends: 3, salary: 18000}, {friends: 10, salary: 88000},
{friends: 0, salary: 180000}, {friends: 27, salary: 56000},
{friends: 8, salary: 74000}];

// d3.select("svg").selectAll("circle")
// 	.data(scatterData).enter()
// 	.append("circle").attr("r", 5).attr("cx", function(d, i){
// 		return i * 10
// 	}).attr("cy", function(d){
// 		return d.friends;
// 	});

var xExtent = d3.extent(scatterData, function(d){
	return d.salary;
});
// min and max array for salary

var yExtent = d3.extent(scatterData, function(d){
	return d.friends;
});

// min and max array for friends

// the function d3.extent returns and array with the max and min values
var xScale = d3.scale.linear().domain([0, 180000]).range([0, 500]);

var yScale = d3.scale.linear().domain([0, 27]).range([0, 500]);



yAxis = d3.svg.axis().scale(yScale)
          .orient("right").ticks(16).tickSize(500);
          
d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

xAxis = d3.svg.axis().scale(xScale)
          .orient("bottom").tickSize(500).ticks(4);

d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

// .call()


// d3.selectAll("path.domain").style("fill", "none").style("stroke", "black");
// we use selectAll because there are two of these paths, one for each axis we called
// d3.selectAll("line").style("stroke", "black")
// we'll want to be more specific in the future "line.tick" because it's likely that whatever we're working on will have more lines than thos used in our axes.


d3.select("svg").selectAll("circle")
	.data(scatterData).enter().append("circle")
	.attr("r", 5).attr("cx", function(d){
		return xScale(d.salary);
	}).attr("cy", function(d){
		return yScale(d.friends)
	})