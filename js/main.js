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

	var typewords = to1DArray(readTextFile("asset/typewords.txt"));
	var words = to1DArray(readTextFile("asset/words.txt"));
	var sigtypes = to1DArray(readTextFile("asset/sigtypes.txt"));
	var alltypes = to1DArray(readTextFile("asset/alltypes.txt"));
	var diststr = to1DArray(readTextFile("asset/dist.txt"));
	var dist = new Array([]);
	for (var i = 0; i < diststr.length; i++) {
		dist [i] = diststr[i].trim().split(" ").map(function(item) {
			return parseFloat(item);
		});
	}

	var arr = [];
	for (var i = 0; i < words.length; i++) {
		arr[i] = alltypes[i] + ": " + words[i];
	}

	for (var i = 0; i < dist.length; i++) {
		var trace1 = {
		  x: Array.apply(null, {length: dist[i].length}).map(Number.call, Number),
		  y: dist[i],
		  type: 'bar',
		  text: arr,
		  marker: {
		    color: 'rgb(158,202,225)',
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