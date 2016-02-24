$(document).ready(function() {
	var trace1 = {
	  x: [0, 1, 2, 3, 4, 5, 6, 7],
	  y: [10, 11, 21, 31, 4, 50, 67, 7],
	  name: 'SF Zoo',
	  type: 'bar'
	};

	var trace2 = {
	  x: [0, 1, 2, 3, 4, 5, 6, 7],
	  y: [12, 18, 29, 12, 18, 29],
	  name: 'LA Zoo',
	  type: 'bar'
	};

	var data = [trace1, trace2];

	var layout = {barmode: 'stack',
	              xaxis: {autorange: 'reversed'}};
	for (var i = 1; i < 18; i++)
		Plotly.newPlot('sig' + i, data, layout);

	function to1DArray(text) 
	{
		var array = text.split("\n");
		alert(array.valueOf());
	}

	function readTextFile(file)
	{
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                var allText = rawFile.responseText;
	                alert(allText);
	            }
	        }
    	}
    	rawFile.send(null);
	}

	readTextFile("file:///Users/moelwinhein/webpages/ecg-analyzer/asset/typewords.txt");
});