d3.json("tweets.json", function(error, data){
	console.log(data);
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

	var timeRamp = d3.time.scale().domain(startEnd).range([20, 480]) //startEnd is an array of two date numbers

	var yScale = d3.scale.linear().domain([0, maxImpact]).range([0, 460]);
	var radiusScale = d3.scale.linear().domain([0, maxImpact]).range([1, 20]);

	var colorScale = d3.scale.linear().domain([0, maxImpact]).range(["white", "#990000"]);

	d3.select("svg").attr("style","height: 500px; width: 600px;");

	// d3.select("svg")
	// 	.selectAll("circle")
	// 	.data(incomingData)
	// 	.enter()
	// 	.append("circle")
	// 	.attr("r", function(d){
	// 		return radiusScale(d.impact);
	// 	})
	// 	.attr("cx", function(d, i){
	// 		return timeRamp(d.tweetTime);
	// 	})
	// 	.attr("cy", function(d){
	// 		return 480 - yScale(d.impact);
	// 	})
	// 	.attr("fill", function(d){
	// 		return colorScale(d.impact)
	// 	})
	// 	.style("stroke", "black")
	// 	.style("stroke-width", "1px");

	// -----------------------------------
	// The above code creates the scatterplot without the datapoints

	var tweetG = d3.select("svg")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append('g')
		.attr("transform", function(d){
			return "translate(" + timeRamp(d.tweetTime) + ', ' + (480 - yScale(d.impact)) + ")";
		})
		// translate is a function given via SVG. The syntax is as follows.
		// translate(<tx> [<ty>])
		// tx is the x-axis
		// ty is the y-axis
		// it moves the position of the object so if x = 1, translate(100) will give a x of 101


	tweetG.append("circle")
		.attr("r", function(d){
			return radiusScale(d.impact)
		})
		.style("fill", function(d){
			return colorScale(d.impact)
		})
		.style("stroke", "black")
		.style("stroke-width", "1px");

	tweetG.append("text")
		.text(function(d){
			return d.user + "-" + d.tweetTime.getHours();
		})

	d3.selectAll("g").data([1,2,3,4]).exit().remove();

	d3.selectAll("g").select("text").text(function(d){
		return d
	})

	d3.selectAll("text").each(function(d){
		console.log(d)
	})

	// old data is leave behind when selecting the same elements again
};