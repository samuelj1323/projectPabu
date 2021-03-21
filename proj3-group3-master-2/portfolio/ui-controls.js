
//init
$(document).ready(function(){
	$('.sidenav').sidenav();
	$('select').formSelect();
	window.name = JSON.stringify({
		current: 'IBM',
		list: []
	});
//     myLineChart = new Chart($('#stockChart'), {
//         type: 'line',
//         data: data_g,
//         options: options_g
//     })
	tik = window.location.href.split('?')[1];
	sel = document.getElementById('tscale'); 
	op2 = sel.options[sel.selectedIndex].text.toLowerCase();
	if(!(tik===undefined)){
	updateStock(tik, op2);

	}
updateStock('IBM', 'day')
});



data_g = {
    labels: ['8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.'],
    datasets: [{
        label: 'Price ($)',
        data: [12, 19, 3, 5, 2, 15]
    }]
}

options_g = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
}

twts = [""];//['This stock ruined my life! Don\'t buy!!!!!', 'Best Stock ever!', 'Anyone know if this stock is good???', 'it\'s climbing slowly', 'I just made a million bucks by shorting this stock', 'Good company, I like their ____', 'covfefe']

var myLineChart = null

function addTweets(ticker, arr){
	document.getElementById("tweets").innerHTML = "";
    arr.forEach(function(e){
        var qt = document.createElement("blockquote"); 
        qt.innerHTML = e;
        document.getElementById("tweets").appendChild(qt);
	});
	updateSentiment(arr);
}

function addData(label, data, name ) {

    	if(myLineChart !== null){
		myLineChart.destroy();
	}
	data_g.datasets[0].label = name;
	data_g.datasets[0].data = data;
    data_g.labels = label;
    myLineChart = new Chart($('#stockChart'), {
        type: 'line',
        data: data_g,
        options: options_g
	});
	
	query(data_g.datasets[0].label, 10);
	tmp = JSON.parse(window.name)
	tmp.current = name;
	window.name = JSON.stringify(tmp);
	document.getElementById('search').value = name;
	select(timeScale);
//     chart = myLineChart;
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
}

function addSentiment(arr, twtarr, avgarr) {
	
	
	
	var i = 0;
	var positive = 0;
	var negative = 0;
	var neutral = 0;
	var arrlengthstring = arr.length.toString();
	var cntnt = document.getElementById("sentiments");
	
	while (cntnt.childNodes.length > 2) {
		cntnt.removeChild(cntnt.lastChild);
	}
  
	arr.forEach(function(e){
		if (i == 0 && arr.length > 10) {
			var qt2 = document.createElement("blockquote"); 
			qt2.innerHTML = "Showing analysis of 10 tweets out of ".bold() + arrlengthstring.bold() + " total tweets".bold();
			document.getElementById("sentiments").appendChild(qt2);
		} else if (i == 0) {
			var qt2 = document.createElement("blockquote"); 
			qt2.innerHTML = "Showing analysis of all ".bold() + arrlengthstring.bold() + " tweets".bold();
			document.getElementById("sentiments").appendChild(qt2);
		}
		if (i < 10) {
			var qt = document.createElement("blockquote"); 
			qt.innerHTML = twtarr[i].italics() + ": " + e.bold();
			document.getElementById("sentiments").appendChild(qt);
		}
		if (e == "positive") {
			positive += 1;
		} else if (e == "negative") {
			negative += 1;
		} else {
			neutral += 1;
		}
		i++;
    });
	var prevalent;
	if (positive > negative && positive > neutral) {
		prevalent = "Positive";
	} else if (negative > positive && negative > neutral) {
		prevalent = "Negative";
	} else if (neutral > positive && neutral > negative) {
		prevalent = "Neutral";
	} else if (neutral == positive && neutral > negative) {
		prevalent = "Positive and Neutral";
	} else if (neutral > positive && neutral == negative) {
		prevalent = "Negative and Neutral";
	} else if (negative == positive && neutral < negative) {
		prevalent = "Divided (Positive and Negative)";
	} else {
		prevalent = "No prevalent sentiment";
	}
	
	var qt = document.createElement("blockquote");
	qt.innerHTML = "Prevalent Sentiment: ".bold() + prevalent.bold() + " (Based on amount of sentiment)".bold();
    document.getElementById("sentiments").appendChild(qt);
	
	var qt2 = document.createElement("blockquote");
	qt2.innerHTML = "Confidence Score Percentage (Average of confidence scores across all tweets): ".bold() + "Positive: ".bold() + avgarr[0].toFixed(2) + "% " + 
	"Neutral: ".bold() + avgarr[1].toFixed(2) + "% " + "Negative: ".bold() + avgarr[2].toFixed(2) + "%";
    document.getElementById("sentiments").appendChild(qt2);
	
	anychart.onDocumentReady(function() {

  
		//delete previous chart
		document.getElementById("sentimentPie").innerHTML = "";
		
		// set the data
		var data = [
		  {x: "Positive", value: positive, normal:  {
				fill: "#009933",       
			}
		  },
		  {x: "Negative", value: negative, normal:  {
				fill: "#990000",       
			}
		  },
		  {x: "Neutral", value: neutral, normal:  {
				fill: "#ffcc00",       
			}
		  },
		];

		// create the chart
		var sentimentChart = anychart.pie();
	 
		//chart.radius("100%");
		// set the chart title
		 sentimentChart.title("Sentiment Analysis (Amount of each sentiment)");

		 // add the data
		 sentimentChart.data(data);

		 // display the chart in the container
		 sentimentChart.container('sentimentPie');
		 
		 sentimentChart.draw();
			
		 

	});
    
}

document.getElementById("search-btn").onclick = function(){
	sel = document.getElementById('tscale'); 
	op2 = sel.options[sel.selectedIndex].text.toLowerCase();
	
  mystr = document.getElementById("search").value; updateStock(mystr, op2); /*twitter update goes here*/;
  

}




function addSearchSuggestions(ticks, names){
	let myCollection = document.getElementById("search-sugg");
	myCollection.innerHTML = ""
	for (i=0; i<ticks.length; i++)
	{
		e = ticks[i] + ": "+names[i];
		var s = document.createElement("a");
		
		s.className = "collection-item ssugg-item";
		s.innerHTML = e;
		
		 var att = document.createAttribute("tickerName");       // Create a "class" attribute
		 att.value = ticks[i]; 
		  s.setAttributeNode(att);
		myCollection.appendChild(s);
		suggarr = document.getElementsByClassName('ssugg-item');
		suggarr[suggarr.length-1].onclick = function(){
			sel = document.getElementById('tscale'); 
	op2 = sel.options[sel.selectedIndex].text.toLowerCase();
	
			updateStock(this.getAttribute('tickername'), op2);
			$('.ssugg').css("display", "none");
		}

		
	}
}

document.getElementById("search").oninput = function(){
	if(document.getElementById("search").value.length%3 === 2){
	searchFill(document.getElementById("search").value)
	}
}

document.getElementById("search").onfocus = function(){$('.ssugg').css("display", "block");}
document.getElementById("search-sugg").onblur = function(){$('.ssugg').css("display", "none");document.getElementById("search-sugg").innerHTML="";}


document.getElementById('tscale').onchange = function(){
	sel = document.getElementById('tscale'); 
	op2 = sel.options[sel.selectedIndex].text.toLowerCase();
	updateStock(data_g.datasets[0].label, op2);
	
}

document.getElementById('addStock').onclick = function(){
	st = JSON.parse(window.name);
	if(st.list.indexOf(st.current) === -1){
	st.list.push(st.current);
	}
	window.name = JSON.stringify(st);
	$
}
//loop

//end


function select(optionValToSelect){
    //Get the select element by it's unique ID.
    var selectElement = document.getElementById('tscale');
    //Get the options.
    var selectOptions = selectElement.options;
    //Loop through these options using a for loop.
    for (var opt, j = 0; opt = selectOptions[j]; j++) {
        //If the option of value is equal to the option we want to select.
        if (opt.value == optionValToSelect) {
            //Select the option and break out of the for loop.
            selectElement.selectedIndex = j;
            break;
        }
	}
	$('select').formSelect();
}




