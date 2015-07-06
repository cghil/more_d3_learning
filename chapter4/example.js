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
var xScale = d3.scale.linear().domain(xExtent).range([0, 500]);

var yScale = d3.scale.linear().domain(yExtent).range([0, 500]);


d3.select("svg").selectAll("circle")
	.data(scatterData).enter().append("circle")
	.attr("r", 5).attr("cx", function(d){
		return xScale(d.salary);
	}).attr("cy", function(d){
		return yScale(d.friends)
	})

var yAxis = d3.svg.axis().scale(yScale).orient("right");
// we are creating an axis that will have tick marks from the min friends 0 to the max friends 27
// then we orient that axis
d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

// .call()