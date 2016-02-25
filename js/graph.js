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

	var index = to1DArray(readTextFile("asset/graph/index.txt"));
	var sigtypes = to1DArray(readTextFile("asset/graph/sigtypes.txt"));
	var ecgstr = to1DArray(readTextFile("asset/graph/ecg.txt"));
	var ecg = new Array([]);
	for (var i = 0; i < ecgstr.length; i++) {
		ecg [i] = ecgstr[i].trim().split(" ").map(function(item) {
			return parseFloat(item);
		});
	}
	var sig = {};
	for (var i = 0; i < sigtypes.length; i++) {
		sig[sigtypes[i]] = parseInt(index[i]);
	}

	$(document).bind('keypress', function(e) {
        if(e.keyCode==13){
             $('#submit').trigger('click');
         }
    });

	function submit() {
		var ecgdata = document.getElementById("ecgdata").value;
		var s = ecgdata.trim().split(" ");
		if (s.length != 2) return;
		var type = s[0];
		var num = parseInt(s[1]);
		if (!((typeof num === "number") && Math.floor(num) === num)) {
			alert("Error in signal index!");
			return;
		}
		if (num >= ecg.length) {
			alert("Index out of bound!");
			return;
		}
		if (typeof(sig[type]) == 'undefined') {
			alert("Error in signal type!");
			return;
		}
		var y1 = ecg[sig[type]];
		var y2 = ecg[num];



		var x1 = [];
		for (var i = 0; i < y1.length; i++) {
			x1[i] = i;
		}
		var x2 = [];
		for (var i = 0; i < y2.length; i++) {
			x2[i] = i;
		}

		var trace1 = {
		  x: x1,
		  y: y1,
		  mode: 'lines'
		};

		var trace2 = {
		  x: x2,
		  y: y2,
		  mode: 'lines'
		};

		var layout = {
		  title: type
		};

		var data = [ trace1, trace2 ];

		Plotly.newPlot('sig1', data, layout);
	}

	$("button").on("click", function() {
		submit();
		document.getElementById("ecgdata").value = '';
	});
});

$(window).ready(function() {
	$('#loading').hide();
});