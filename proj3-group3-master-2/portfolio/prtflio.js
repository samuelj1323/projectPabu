myStocks = null;
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
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            },
            gridLines: {
                display: false
            }
        }]
    }
}

$(document).ready(function(){
    window.name = "{\"current\":\"IBM\",\"list\":[\"IBM\",\"AAPL\",\"FB\"]}";
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
    </div>
  </div>`);
  myStocks[x] = new Stock(x);
    });
    
    tickerIter = 0;
    refreshCard(ttt.list[tickerIter]);
    
    //ttt.list.forEach(a => myStocks[a] = new Stock(a));
    // ttt.list.forEach(
    //     function(a){
    //          refreshCard(a);
    //         }
        
    //     );
});

function addStockData(chart, label, data) {
    
    if(chart.data.labels[chart.data.labels.length-1] === label){
        return;
    }
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    //chart.update();
    
}

function addData(label, data, ticker){
    if(myStocks[ticker].chart===null){
        data_g.datasets[0].data = data;
    data_g.labels = label;
    myStocks[ticker].chart = new Chart($('#'+ticker+' .stockChart')[0], {
            type: 'line',
            data: data_g,
            options: options_g
        });
        //console.log("iuy");
    }
    myStocks[ticker].price = '$'+data[data.length-1];
    addStockData(myStocks[ticker].chart, label[label.length-1], data[data.length-1]);
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
        qt.innerHTML = myStocks[ticker].tweets[i];
        ele.appendChild(qt);
    }

    //ijhgfd
    updateSentiment(myStocks[ticker].tweets);
}


function renderChart(ticker){
    $('#'+ticker+' .sprice')[0].innerHTML = myStocks[ticker].price;
    // while(myStocks[ticker].chart === null){

    // }
    myStocks[ticker].chart.update();
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


function refreshCard(ticker){
    ztik123 = ticker;
    updateStock(ticker, 'day');
}
