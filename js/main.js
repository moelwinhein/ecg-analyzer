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
	var counter = {};
	for (var i = 0; i < sigtypes.length; i++) {
		counter[sigtypes[i]] = 0;
	}
	for (var i = 0; i < words.length; i++) {
		arr[i] = alltypes[i] + ": " + words[i];
		counter[alltypes[i]] += 1;
	}
	var v = [];
	for (var i = 0; i < sigtypes.length; i++) {
		v[i] = counter[sigtypes[i]];
	}

	var data = [{
	  values: v,
	  labels: sigtypes,
	  type: 'pie'
	}];

	var layout = {
		title: "QTDB/SEL213 Signal Types Distribution Chart",
		height: 700
	};

	Plotly.newPlot('sig0', data, layout);

	for (var i = 0; i < dist.length; i++) {
		var c = [];
		for (var j = 0; j < alltypes.length; j++) {
			if (sigtypes[i] === alltypes[j]) 
				c[j] = 'rgba(222,45,38,0.8)';
			else
				c[j] = 'rgb(158,202,225)';
		}
		var trace1 = {
		  x: Array.apply(null, {length: dist[i].length}).map(Number.call, Number),
		  y: dist[i],
		  type: 'bar',
		  text: arr,
		  marker: {
		    color: c,
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