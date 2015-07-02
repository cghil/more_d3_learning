d3.json("tweets.json", function(error, data){
	dataViz(data.tweets);
});

function dataViz(incomingData){
	console.log(incomingData)
	incomingData.forEach(function(tweet){
		tweet.impact = tweet.favorites.length + tweet.retweets.length; //impact score for totaling the number of favorites and retweets
		tweet.tweetTime = new Date(tweet.timestamp); //date datatype
	})

	var maxImpact = d3.max(incomingData, function(tweet){
		return tweet.impact;
	});

	var startEnd = d3.extent(incomingData, function(tweet){
		return tweet.tweetTime; // returns the earliest and latest time for a scale
	});

	var timeRamp = d3.time.scale().domain(startEnd).range([50, 450]) //startEnd is an array of two date numbers

	var yScale = d3.scale.linear().domain([0, maxImpact]).range([0, 460]);
	var radiusScale = d3.scale.linear().domain([0, maxImpact]).range([1, 20]);

	var colorScale = d3.scale.linear().domain([0, maxImpact]).range(["white", "#990000"]);

	d3.select("svg").attr("style","height: 500px; width: 600px;");

	d3.select("svg").selectAll("circle")
		.data(incomingData, function(d){
			return JSON.stringify(d)
		})
		.enter().append("circle")
		.attr("r", function(d){
			return radiusScale(d.impact)
		})
		.attr("cx", function(d, i){
			return timeRamp(d.tweetTime)
		})
		.attr("cy", function(d){
			return 480 - yScale(d.impact)
		})
		.style("fill", "#990000")
		.style('stroke', "black")
		.style("stroke-width", "1px")
	// old data is leave behind when selecting the same elements again
	var filteredData = incomingData.filter(
		function(tweet) { return tweet.impact > 0}
	);

	// we are filtering out the tweeter data to only so impacts scores higher than 0

	console.log(filteredData)

	d3.selectAll("circle")
		.data(filteredData, function(d){
			return JSON.stringify(d)
		})
		.exit()
		.remove();
};
