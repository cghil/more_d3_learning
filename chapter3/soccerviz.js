function createSoccerViz(){
	d3.csv("world_cup.csv", function(data){
		overallTeamViz(data);
	})

	function overallTeamViz(incomingData){
		d3.select("svg")
			.append("g") // appends a <g> to <svg> canvas to move it and center its contents more easily
			.attr("id", "teamsG")
			.attr("transform", "translate(50, 300)")
			.selectAll("g")
			.data(incomingData)
			.enter()
			.append("g")
			.attr("class", "overallG")
			.attr("transform", function(d, i){
				return "translate(" + (i * 50) + ", 0)"
			}); // create a g for each team to add labels or otehr elements as we get more ambitious

		var teamG = d3.selectAll("g.overallG");

		teamG
			.append("circle").attr("r", 0)
			.transition()
			.delay(function(d, i){ return i *100})
			.duration(500)
			.attr("r", 40)
			.transition()
			.duration(500)
			.attr("r", 20)

		teamG
			.append('text')
			.style("text-anchor", "middle")
			.attr("y", 30)
			.text(function(d){
				return d.team
			})
		var dataKeys = d3.keys(incomingData[0]).filter(function(el){
			return el != "team" && el != "region";
		}) // returns only data that has values

		d3.select("#controls").selectAll("button.teams")
			.data(dataKeys).enter() // builds buttons based on the data that's numerical, so we want
			// all the attributes except the team and region attributes, which store strings
			.append("button")
			.attr("class", "teams")
			.on("click", buttonClick) // registers an onclick behavior for each button with a wrapper
			// that gives access to the data that was bound to it when it was created
			.html(function(d){
				return d;
			}) // remember that dataKeys consits of an array of attribute names, so the d corresponds to
			// one of those names and makes a good button title

		function buttonClick(datapoint){
			//remember that the data has been bound to the button via the data() function
			var maxValue = d3.max(incomingData, function(d){ return parseFloat(d[datapoint])}) 
			// the function each button is calling on click, with the bound data sent automatically as the first arguement

			var tenColorScale = d3.scale.category10( ["UEFA", "CONMEBOL", "CAF", "AFC"]);

			var radiusScale = d3.scale.linear()
				.domain([0, maxValue]).range([2, 20])

			var ybRamp = d3.scale.linear()
				.interpolate(d3.interpolateLab)
				.domain([0, maxValue]).range(["yellow", "blue"])

			d3.selectAll("g.overallG").select("circle").transition().duration(1000)
				.style("fill", function(p){
					return tenColorScale(p.region)
				})
				.attr("r", function(d){return radiusScale(d[datapoint])})
		};

		// teamG.on("mouseover", highlightRegion);
		teamG.on("mouseover", highlightRegion2);
		// function highlightRegion(d){
		// 	d3.selectAll("g.overallG").select("circle")
		// 		.style("fill", function(p){
		// 			return p.region == d.region ? "red" : "gray"
		// 		})
		// 	//we used d as our variable
		// 	// we changed the inline function to p, so that it wouldn't conflict.
		// 	// then we use an "ifsie" an inline if statement that compares the region to each element
		// };

		function highlightRegion2(d, i){
			var teamColor = d3.rgb("pink")
			d3.select(this).select("text").classed("active", true).attr("y", 10);
			d3.selectAll("g.overallG").select("circle")
				.style("fill", function(p){
					return p.region == d.region ?
						teamColor.darker(.75) : teamColor.brighter(.5)
				})
			;
			this.parentElement.appendChild(this)
		};

		teamG.on("mouseout", unHighlight)

		function unHighlight() {
 			d3.selectAll("g.overallG").select("circle").attr("class", "");
 			d3.selectAll("g.overallG").select("text")
			.classed("active", false).attr("y", 30);
		};

		teamG.select("text").style("pointer-events","none");

	}
}