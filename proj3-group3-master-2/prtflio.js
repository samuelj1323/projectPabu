time4rfgc = 0;
myStocks = null;
var nightModePort = false;
function Stock(ticker){
    this.name = ticker;
    this.price = 0;
    this.chart = null;
    this.tweets = [];
    this.tweetSentCount = 0;
    this.ps = -1;
    this.ns = -1;
    this.nus = -1;
    this.htmlElement = document.getElementById(ticker)
    this.currenttweetsaccountedfor = false;
    this.firstRefresh =  true;
    //refreshCard(ticker);
}
ztik123 = '';
tickerIter = null;
ttt = null;
data_g = {
    labels: [],
    datasets: [{
        label: 'Price ($)',
        data: []
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
				labelString: 'Time'
			}
        }]
    }
}

$(document).ready(function(){
    //window.name = "{\"current\":\"IBM\",\"list\":[\"IBM\",\"AAPL\",\"FB\"]}";
    myStocks = new Map();
    $('.sidenav').sidenav();
    ttt = JSON.parse(window.name);
    ttt.list.forEach(function(x){
        document.getElementById("mystocks").innerHTML+=("afterend", 
    `<div id ="`+x+`"class="card mylight-blue">
    <div class="card-content white-text">
      <span class="card-title"><span class="sname">`+x+`</span><span class="sprice">$`+"5"+`</span></span>
      
      <div class="chartDiv">
      <canvas class="stockChart" width="200" height="100"></canvas>
      </div>
        <div class="twts"></div>
      <div class="sent"><div class="pos"></div><div class="nut"></div><div class="neg"></div></div>
      </div>
    <div class="card-action">
      <a href="index.html?`+x+`">More info</a>
      <a onclick="removeStock('`+x+`')">Remove `+x+`</a>
    </div>
  </div>`);
  myStocks[x] = new Stock(x);
    });
    
    tickerIter = 0;
    refreshCard(ttt.list[tickerIter]);
    
    setInterval(
        
        function(){

        if(time4rfgc%100 === 0){ 
        tickerIter = 0;
        refreshCard(ttt.list[tickerIter]);
        }
        
        document.getElementById("ball").style.width = ((time4rfgc%100) * (90/100)) + '%' 
        
        time4rfgc++;
        
        }, 
        
        1200);
    
    //ttt.list.forEach(a => myStocks[a] = new Stock(a));
    // ttt.list.forEach(
    //     function(a){
    //          refreshCard(a);
    //         }
        
    //     );
    document.getElementById('txtstuff').value = document.getElementById('txtstuff1').value = document.getElementById('txtstuff').getAttribute('min');
});

function addStockData(chart, label, data) {
    
    if(chart.data.labels[chart.data.labels.length-1] === label){
        return;
    }
    console.log(chart.data.labels[chart.data.labels.length-1]);
        
    console.log(label, data)
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data)
    // .forEach((dataset) => {
    //     dataset.data.push(data);
    // });
    // //chart.update();
    
}

function addData(label, data, ticker){
    //console.log(label, data, ticker);
    //if(myStocks[ticker].chart===null){
        //console.log("Code is here")
        //myStocks[ticker].firstRefresh = false;
        data_g.datasets[0].data = data;
    data_g.labels = label;
    myStocks[ticker].chart = new Chart($('#'+ticker+' .stockChart')[0], {
            type: 'line',
            data: data_g,
            options: options_g
        });
        //console.log("iuy");
    //}
    //console.log("label we got", label, " ticker: ", ticker);
    myStocks[ticker].price = '$'+data[data.length-1];
    //console.log(myStocks[ticker].price)
    //addStockData(myStocks[ticker].chart, label[label.length-1], data[data.length-1]);
    myStocks[ticker].chart.update();
    renderChart(ticker);
}




function addTweets(ticker, tweets){
    //console.log(ticker);
    myStocks[ticker].tweets = tweets;
    myStocks[ticker].currenttweetsaccountedfor = false;
    renderTweets(ticker);
    //some update sentiment
}



function addSentiment(values, a, b/*ticker, pos, nut,neg*/){
    sents = new Map();
    
    sents['neutral'] = 0;
    sents['positive'] = 0;
    sents['negative'] = 0;
    for(t=0;t<values.length;t++){
        sents[values[t]]++;
    }

    ticker = ztik123;
    pos = sents['positive']/values.length;
    nut = sents['neutral']/values.length;
    neg = sents['negative']/values.length;
    if(myStocks[ticker].currenttweetsaccountedfor === false){
        if(myStocks[ticker].ps === -1){
        myStocks[ticker].ps = pos;
        myStocks[ticker].ns = neg;
        myStocks[ticker].nus = nut;
        }else{
            newps = myStocks[ticker].ps * myStocks[ticker].tweetSentCount + pos * myStocks[ticker].tweets.length
            newns = myStocks[ticker].ns * myStocks[ticker].tweetSentCount + neg * myStocks[ticker].tweets.length
            newnus = myStocks[ticker].nus * myStocks[ticker].tweetSentCount + nut * myStocks[ticker].tweets.length
            myStocks[ticker].tweetSentCount +=  myStocks[ticker].tweets.length;
            myStocks[ticker].ps = newps/myStocks[ticker].tweetSentCount;
            myStocks[ticker].ns = newns/myStocks[ticker].tweetSentCount;
            myStocks[ticker].nus = newnus/myStocks[ticker].tweetSentCount;
            myStocks[ticker].currenttweetsaccountedfor = true;
        }
        
    }
    renderSentiment(ticker);

}



function renderTweets(ticker){
    let ele = $('#'+ticker+' .twts')[0];
    ele.innerHTML = "";
    for(i = 0;i < 3;i++){    
        var qt = document.createElement("blockquote"); 
        qt.innerHTML = myStocks[ticker].tweets[i].txt;
        ele.appendChild(qt);
    }

    //ijhgfd
	start = true;
    updateSentiment(myStocks[ticker].tweets.map(a => a.txt));
}


function renderChart(ticker){
    $('#'+ticker+' .sprice')[0].innerHTML = myStocks[ticker].price;
    // while(myStocks[ticker].chart === null){

    // }
    
    query(ticker, 10);
}


function renderSentiment(ticker){
    
    $('#'+ticker+' .nut')[0].style.width = ''+(myStocks[ticker].nus*100+'%');
    $('#'+ticker+' .neg')[0].style.width = ''+(myStocks[ticker].ns*100+'%');
$('#'+ticker+' .pos')[0].style.width = ''+(myStocks[ticker].ps*100+'%');
    if(tickerIter+1 < ttt.list.length)
    {
    tickerIter++;
    //console.log("refresh "+ttt.list[tickerIter]+"st "+tickerIter);
    refreshCard(ttt.list[tickerIter]);
    }else{
        tickerIter = 0;
    }
}

function removeStock(ticker){
    document.getElementById(ticker).style.display = 'none';
    arr87 = JSON.parse(window.name); 
    var index = arr87.list.indexOf(ticker);

    if (index > -1) {
       arr87.list.splice(index, 1);
    }
    //console.log(arr87)
    window.name = JSON.stringify(arr87);
    M.toast({html: 'Removed ' + ticker + '!'});
}


function refreshCard(ticker){
    ztik123 = ticker;
    updateStock(ticker, 'day');
}

document.getElementById("night-btn2").onclick = document.getElementById("night-btn3").onclick = function(){
	document.body.classList.toggle("dark-mode-body");
	document.getElementsByClassName("nav-wrapper")[0].classList.toggle("dark-mode-nav");
	document.getElementsByClassName("sidenav")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[1].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[2].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("sidenav")[0].getElementsByTagName("li")[3].getElementsByTagName("a")[0].classList.toggle("dark-mode-body");
	document.getElementsByClassName("page-footer myOrange")[0].classList.toggle("dark-mode-foot");

	//cards
	for (var i = 0; i < 5; i++)
	{
		var elem = document.getElementsByClassName("card")[i]
		if (elem == undefined)
			break;
		elem.classList.toggle("dark-mode-card");
		elem.getElementsByClassName("card-title")[0].classList.toggle("dark-mode-white-text");
		
		if (nightModePort)
		{
			myStocks[elem.id].chart.data.datasets[0].backgroundColor = 'rgba(100, 100, 100, 0.2)';
			myStocks[elem.id].chart.options.legend.labels.fontColor = 'rgba(0, 0, 0, 0.8)';
		}
		else
		{
			myStocks[elem.id].chart.data.datasets[0].backgroundColor = 'rgba(158, 158, 158, 0.3)';
			myStocks[elem.id].chart.options.legend.labels.fontColor = "white";	
		}
		myStocks[elem.id].chart.update();
	}
	
	nightModePort = !nightModePort;
}

/*var minimizetoggled = false;
document.getElementById("font-enlarge").onclick  = document.getElementById("font-enlarge1").onclick = function(){
	if (this.innerText == "Enlarge Font") {
		var element = document.body;
		if (minimizetoggled)
			element.classList.toggle("minimized-font");
		minimizetoggled = false;
		element.classList.toggle("enlarged-font");
		this.innerText = "Minimize Font";
	} else {
		var element = document.body;
		element.classList.toggle("enlarged-font");
		element.classList.toggle("minimized-font");
		this.innerText = "Enlarge Font";
		minimizetoggled = true;
	}

}*/

//for text enlargement slider
$('input').on('change', function () {
    var v = $(this).val();
    $('#mystocks').css('font-size', v + 'px')
    //$('span').html(v);
});
