$(document).ready(function() {

	function to1DArray(text) 
	{
		var array = text.trim().split("\n");
		return array;
	}

	function readTextFile(file)
	{
		var allText;
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                allText = rawFile.responseText;
	            }
	        }
    	}
    	rawFile.send(null);
    	return allText;
	}

	var typewords = to1DArray(readTextFile("asset/ssst/typewords.txt"));
	var sigtypes = to1DArray(readTextFile("asset/ssst/sigtypes.txt"));
	var diststr = to1DArray(readTextFile("asset/ssst/dist.txt"));
	var samewordsstr = to1DArray(readTextFile("asset/ssst/samewords.txt"));
	var dist = new Array([]);
	var samewords = new Array([]);
	for (var i = 0; i < diststr.length; i++) {
		dist [i] = diststr[i].trim().split(" ").map(function(item) {
			return parseFloat(item);
		});
		samewords[i] = samewordsstr[i].trim().split(" ");
	}

	for (var i = 0; i < dist.length; i++) {
		var trace1 = {
		  x: Array.apply(null, {length: dist[i].length}).map(Number.call, Number),
		  y: dist[i],
		  type: 'bar',
		  text: samewords[i],
		  marker: {
		    color: 'rgba(222,45,38,0.8)',
		    opacity: 0.6,
		    line: {
		      color: 'rbg(8,48,107)',
		      width: 1.5
		    }
		  }
		};
		var data = [trace1];

		var layout = {
		  title: sigtypes[i] + ": " + typewords[i]
		};
		var j = i + 1;
		Plotly.newPlot('sig' + j, data, layout);
	}
});

$(window).ready(function() {
	$('#loading').hide();
});