d3.json("tweets.json", function(error, data){
	console.log(data);
	dataViz(data.tweets);
});

function dataViz(incomingData){
	var nestedTweets = d3.nest()
	.key(function(tweet){return tweet.user})
	.entries(incomingData);

	console.log(nestedTweets);

	nestedTweets.forEach(function(tweet){
		tweet.numTweets = tweet.values.length //creates a new attribute based on the number of tweets
	})

	var maxTweets = d3.max(nestedTweets, function(tweet){
		return tweet.numTweets
	})

	var yScale = d3.scale.linear().domain([0, maxTweets]).range([0, 100]);

	d3.select('svg')
		.selectAll('rect')
		.data(nestedTweets)
		.enter()
		.append("rect")
		.attr("width", 50)
		.attr("height", function(d){
			return yScale(d.numTweets);
		})
		.attr('x', function(d, i){
			return i*60
		})
		.attr('y', function(d){
			return 100 - yScale(d.numTweets);
		})
		.style("fill", "blue")
		.style("stroke", "red")
		.style("stroke-width", "1px")
		.style('opacity', .25)
}

// d3.csv("cities.csv", function(error, data){
// 	dataViz(data)
// })

// function dataViz(incomingData){

// 	var maxPopulation = d3.max(incomingData, function(el){
// 		return parseInt(el.population);
// 	}); //transforming the population value into an integer

// 	var yScale = d3.scale.linear().domain([0, maxPopulation]).range([0, 460]);

// 	d3.select("svg").attr("style", "height : 480px; width: 600px;");

// 	d3.select("svg").selectAll('rect')
// 		.data(incomingData)
// 		.enter()
// 		.append("rect")
// 		.attr("width", 50)
// 		.attr("height", function(d){
// 			return yScale(parseInt(d.population));
// 		})
// 		.attr("x", function(d, i){
// 			return i * 60
// 		})
// 		.attr("y", function(d){
// 			return 480 - yScale(parseInt(d.population));
// 		})
// 		.style('fill', 'blue')
// 		.style('stroke', "red")
// 		.style('stroke-width', "1px")
// 		.style("opacity", .25);
// }

// this nests the data for each user
// so it will be an array 