userjustscrolled = false;
time9876c = 0;
var nightModeMain = false;
//init
$(document).ready(function(){
	$('.sidenav').sidenav();
	$('select').formSelect();
	$('.carousel.carousel-slider').carousel({
		fullWidth: true,
		indicators: true
	  });
	if(window.name === ""){
	 window.name = JSON.stringify({
	 	current: 'IBM',
	 	list: []
	 });
	}
//     myLineChart = new Chart($('#stockChart'), {
//         type: 'line',
//         data: data_g,
//         options: options_g
//     })
	select('day');
	tik = window.location.href.split('?')[1];
	sel = document.getElementById('tscale'); 
	op2 = sel.options[sel.selectedIndex].text.toLowerCase();
	if(!(tik===undefined)){
	updateStock(tik, op2);

	}
updateStock('IBM', 'day')
setInterval(refreshAll, 1000);
for(u=0;u<document.getElementsByClassName('indicator-item').length;u++){
document.getElementsByClassName('indicator-item')[u].onclick = function(){
	userjustscrolled = true;
  }
}
document.getElementById('txtstuff').value = document.getElementById('txtstuff1').value = document.getElementById('txtstuff').getAttribute('min')
//$('.anychart-ui-support > g > g > g')[0].style.display= 'none';

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
				fontColor: "",
                beginAtZero: false
            },
			gridLines: {
				display: true,
				color: 'rgba(158, 158, 158, 0.2)'
			},
			scaleLabel: {
				fontColor: "",
				display: true,
				labelString: 'Stock Value'
			}
        }],
		xAxes: [{
            ticks: {
				fontColor: ""
            },
			gridLines: {
				display: true,
				color: 'rgba(158, 158, 158, 0.2)'
			},
			scaleLabel: {
				fontColor: "",
				display: true,
				labelString: 'Date/Time'
			}
        }]
    }
}

twts = [""];//['This stock ruined my life! Don\'t buy!!!!!', 'Best Stock ever!', 'Anyone know if this stock is good???', 'it\'s climbing slowly', 'I just made a million bucks by shorting this stock', 'Good company, I like their ____', 'covfefe']

var myLineChart = null

function addTweets(ticker, arr){
	document.getElementById("tweets").innerHTML = "";
    arr.forEach(function(e){
		var time = e.time.split(' ')[0] +' '+ e.time.split(' ')[1]+' ' + e.time.split(' ')[2];
		var myTweet = `<li class="collection-item avatar tttt">
		<img class="ppic circle" src="`+e.ppic+`" alt="">
		<span class="title">`+e.sname+`: `+e.name+`</span>`+'  <span class="ttime">'+time+`</span>
		<p class="text">`+e.txt+`
		</p>
	  </li>`
		
		//var qt = document.createElement("blockquote"); 
        //qt.innerHTML = e.txt;
        document.getElementById("tweets").innerHTML+=myTweet;
	});
	//console.log(arr);
	start = true;
	updateSentiment(arr.map(a => a.txt));
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
	//document.getElementById('search').value = name;
	select(timeScale);
//     chart = myLineChart;
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();

	if (nightModeMain)
	{
		document.getElementsByClassName("select-dropdown dropdown-trigger")[0].classList.toggle("dark-mode-white-txt");
		document.getElementsByClassName("dropdown-content select-dropdown")[0].classList.toggle("dark-mode-select");
		document.getElementsByClassName("caret")[0].classList.toggle("dark-mode-caret");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "0").getElementsByTagName("span")[0].classList.toggle("dark-mode-gray-txt");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "1").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "2").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "3").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "4").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
		document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "5").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
		myLineChart.data.datasets[0].backgroundColor = 'rgba(158, 158, 158, 0.3)';
		myLineChart.options.legend.labels.fontColor = "white";	
	}

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
		// if (i == 0 && arr.length > 10) {
		// 	var qt2 = document.createElement("blockquote"); 
		// 	qt2.innerHTML = "Showing analysis of 10 tweets out of ".bold() + arrlengthstring.bold() + " total tweets".bold();
		// 	document.getElementById("sentiments").appendChild(qt2);
		// } else if (i == 0) {
		// 	var qt2 = document.createElement("blockquote"); 
		// 	qt2.innerHTML = "Showing analysis of all ".bold() + arrlengthstring.bold() + " tweets".bold();
		// 	document.getElementById("sentiments").appendChild(qt2);
		// }
		// if (i < 10) {
		// 	var qt = document.createElement("blockquote"); 
		// 	qt.innerHTML = twtarr[i].italics() + ": " + e.bold();
		// 	document.getElementById("sentiments").appendChild(qt);
		// }
		if (e == "positive") {
			$($('.tttt')[i]).addClass('plus');
			positive += 1;
		} else if (e == "negative") {
			$($('.tttt')[i]).addClass('negs');
			negative += 1;
		} else {
			$($('.tttt')[i]).addClass('midds');
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
		prevalent = "Mixed (Positive and Negative)";
	} else {
		prevalent = "No prevalent sentiment";
	}
	
	var qt = document.createElement("blockquote");
	qt.innerHTML = "Prevalent Sentiment: ".bold() + prevalent.bold() + " (Based on amount of sentiment)".bold();
    document.getElementById("sentiments").appendChild(qt);
	
	/*var qt2 = document.createElement("blockquote");
	qt2.innerHTML = "Confidence Score Percentage (Average of confidence scores across all tweets): ".bold() + "Positive: ".bold() + avgarr[0].toFixed(2) + "% " + 
	"Neutral: ".bold() + avgarr[1].toFixed(2) + "% " + "Negative: ".bold() + avgarr[2].toFixed(2) + "%";
    document.getElementById("sentiments").appendChild(qt2);*/
	
	anychart.onDocumentReady(function() {

  
		//delete previous chart
		document.getElementById("sentimentPie").innerHTML = "";
		
		// set the data
		var data = [
		  {x: "Positive", value: positive, hatchFill:  {
				type: "checkerboard",
				color: "#009933",       
			}
		  },
		  {x: "Negative", value: negative, hatchFill:  {
				type: "zigzag",
				color: "#990000",	
			}
		  },
		  {x: "Neutral", value: neutral, hatchFill:  {
				type: "vertical-brick",
				color: "#ffcc00",       
			}
		  },
		];

		// create the chart
		var sentimentChart = anychart.pie();
		 sentimentChart.radius(43);
	 
		//chart.radius("100%");
		// set the chart title
		 sentimentChart.title("Sentiment Analysis (Amount of each sentiment)");

		 // add the data
		 sentimentChart.data(data);


		 // display the chart in the container
		 sentimentChart.container('sentimentPie');
		 
		 sentimentChart.draw();
		//$('.anychart-ui-support > g > g > g')[0].style.display= 'none';	
		if (nightModeMain)
		{
			document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("path")[0].classList.toggle("dark-mode-blend-fill");
			document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[4].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
			document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
			document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[1].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
			document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[2].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
		
			for (var i = 0; i < 10; i++)
			{
				var elem = document.getElementById("tweets").getElementsByTagName("li")[i];
				if (elem == undefined)
					break;
				var sen = elem.classList[3];
				var dark_sen = "dark-mode-" + sen;
				elem.classList.remove(sen);
				elem.classList.add(dark_sen);
				elem.classList.toggle("dark-mode-border");
				elem.getElementsByClassName("ttime")[0].classList.toggle("dark-mode-white-txt");
			}
		}
		 

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
	
	if (nightModeMain)
	{
		document.getElementsByClassName("collection-item")[0].classList.toggle("dark-mode-body");
		document.getElementsByClassName("collection-item")[1].classList.toggle("dark-mode-body");
		document.getElementsByClassName("collection-item")[2].classList.toggle("dark-mode-body");
		document.getElementsByClassName("collection-item")[3].classList.toggle("dark-mode-body");
		document.getElementsByClassName("collection-item")[4].classList.toggle("dark-mode-body");
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
	M.toast({html: 'Added ' + st.current + '!'});

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

document.getElementById("night-btn").onclick = document.getElementById("night-btn1").onclick =  function(){
	//body, nav, sideav, footer, borders, and search options 
	document.body.classList.toggle("dark-mode-body");
	document.getElementsByClassName("nav-wrapper")[0].classList.toggle("dark-mode-nav");
	document.getElementsByClassName("sidenav")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[1].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[2].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[3].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("page-footer myOrange")[0].classList.toggle("dark-mode-foot");
	document.getElementById("search-btn").classList.toggle("dark-mode-btn");
	document.getElementById("addStock").classList.toggle("dark-mode-btn");
	document.getElementById("search").classList.toggle("dark-mode-white-txt");
	document.getElementsByClassName("select-dropdown dropdown-trigger")[0].classList.toggle("dark-mode-white-txt");
	document.getElementsByClassName("dropdown-content select-dropdown")[0].classList.toggle("dark-mode-select");
	document.getElementsByClassName("caret")[0].classList.toggle("dark-mode-caret");
	document.getElementById("tweets").classList.toggle("dark-mode-border");
	
	//pie chart
	document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("path")[0].classList.toggle("dark-mode-blend-fill");
	document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[4].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
	document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
	document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[1].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
	document.getElementById("sentimentPie").getElementsByTagName("div")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[0].getElementsByTagName("g")[5].getElementsByTagName("g")[0].getElementsByTagName("g")[2].getElementsByTagName("text")[0].classList.toggle("dark-mode-white-fill");
	
	//dropdown menu
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "0").getElementsByTagName("span")[0].classList.toggle("dark-mode-gray-txt");
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "1").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "2").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "3").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "4").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
	document.getElementById(document.getElementsByClassName("dropdown-content")[0].id + "5").getElementsByTagName("span")[0].classList.toggle("dark-mode-white-txt");
	
	//news
	document.getElementsByClassName("carousel-item")[0].classList.toggle("dark-mode-carousel");
	document.getElementsByClassName("carousel-item")[1].classList.toggle("dark-mode-carousel");
	document.getElementsByClassName("carousel-item")[2].classList.toggle("dark-mode-carousel");
	document.getElementsByClassName("carousel-item")[3].classList.toggle("dark-mode-carousel");
	document.getElementsByClassName("carousel-item")[4].classList.toggle("dark-mode-carousel");
	
	//stock graph and tweets 
	if (nightModeMain)
	{
		myLineChart.data.datasets[0].backgroundColor = 'rgba(100, 100, 100, 0.2)';
		myLineChart.options.legend.labels.fontColor = 'rgba(0, 0, 0, 0.8)';
		for (var i = 0; i < 10; i++)
		{
			var elem = document.getElementById("tweets").getElementsByTagName("li")[i];
			if (elem == undefined)
				break;
			var dark_sen = elem.classList[3];
			var sen = dark_sen.substring(10);
			elem.classList.remove(dark_sen);
			elem.classList.add(sen);
			elem.classList.toggle("dark-mode-border");
			elem.getElementsByClassName("ttime")[0].classList.toggle("dark-mode-white-txt");
		}
		
		nightModeMain = false;
	}
	else
	{
		myLineChart.data.datasets[0].backgroundColor = 'rgba(158, 158, 158, 0.3)';
		myLineChart.options.legend.labels.fontColor = "white";	
		for (var i = 0; i < 10; i++)
		{
			var elem = document.getElementById("tweets").getElementsByTagName("li")[i];
			if (elem == undefined)
				break;
			var sen = elem.classList[3];
			var dark_sen = "dark-mode-" + sen;
			elem.classList.remove(sen);
			elem.classList.add(dark_sen);
			elem.classList.toggle("dark-mode-border");
			elem.getElementsByClassName("ttime")[0].classList.toggle("dark-mode-white-txt");
		}
		
		console.l
		nightModeMain = true;
	}
	myLineChart.update();

}


//for text enlargement slider
$('input').on('change', function () {
    var v = $(this).val();
    $('#tweets').css('font-size', v + 'px')
	$('#sentiments').css('font-size', v + 'px')
	$('#headline1').css('font-size', v + 'px')
	$('#teaser1').css('font-size', v + 'px')
	$('#headline2').css('font-size', v + 'px')
	$('#teaser2').css('font-size', v + 'px')
	$('#headline3').css('font-size', v + 'px')
	$('#teaser3').css('font-size', v + 'px')
	$('#headline4').css('font-size', v + 'px')
	$('#teaser4').css('font-size', v + 'px')
	$('#headline5').css('font-size', v + 'px')
	$('#teaser5').css('font-size', v + 'px')
	document.getElementsByClassName('carousel carousel-slider center')[0].style.height = ((v - 14) * 4) + 230+ 'px';
    //$('span').html(v);
});



function refreshAll(){
	document.getElementById("ball").style.width = ((time9876c%60) * (90/60)) + '%'  
		
	if(time9876c%60===0){
		
	  query(data_g.datasets[0].label, 10); /*twitter update goes here*/;
	
	}
	if(userjustscrolled===true){
		userjustscrolled = false;
	}else{
		if(time9876c%10===0){
		$('.carousel').carousel('next');
		}
	}
	time9876c++;
	//$('.anychart-ui-support > g > g > g')[0].style.display= 'none';
}
