var array = [14, 68, 24500, 430, 19, 1000, 5555]

var max = d3.max(array)
var yScale = d3.scale.linear().domain([0, 100, 1000, max]).range([0, 75, 125, 200])

d3.select("svg")
	.selectAll("rect")
	.data(array)
	.enter()
	.append("rect")
	.attr("width", 10)
	.attr("height", function(d){ return d;})
	.style("fill", "blue")
	.style("stroke", "red")
	.style("stroke-width", "1px")
	.style("opacity", .25)
	.attr("x", function(d, i){ return i*10 })
	.attr("y", function(d){ return 200- yScale(d)})
