
var headLineArray = []; // array for the news
var teaserArray=[];
var providerArray = [];
tprty = '';
function addNews(news){ // function to push values from response into array, assumes array as input. 
    tprty = news;
    for(var i = 0; i < news.length; i++){
        headLineArray.push(JSON.stringify(news[i].Headline));
        teaserArray.push(news[i].Teaser);
        providerArray.push(news[i].Provider);
        //console.log("pushing to array");
    }
    //console.log("stories pushed");
    //console.log("headline 1: "+ headLineArray[0]);

    document.getElementById("headline1").innerHTML = headLineArray[0];
    document.getElementById("teaser1").innerHTML = teaserArray[0];
    document.getElementById("provider1").innerHTML = providerArray[0];
    document.getElementById("headline2").innerHTML = headLineArray[1];
    document.getElementById("teaser2").innerHTML = teaserArray[1];
    document.getElementById("provider2").innerHTML = providerArray[1];
    document.getElementById("headline3").innerHTML = headLineArray[2];
    document.getElementById("teaser3").innerHTML = teaserArray[2];
    document.getElementById("provider3").innerHTML = providerArray[2];
    document.getElementById("headline4").innerHTML = headLineArray[3];
    document.getElementById("teaser4").innerHTML = teaserArray[3];
    document.getElementById("provider4").innerHTML = providerArray[3];
    document.getElementById("headline5").innerHTML = headLineArray[4];
    document.getElementById("teaser5").innerHTML = teaserArray[4];
    document.getElementById("provider5").innerHTML = providerArray[4];
}
window.onload = function(){
    
}
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        const newsObj = JSON.parse(this.response);
        console.log(newsObj);
        const storiesArr = newsObj.MarketsNewsOutput.Stories;
        addNews(storiesArr);
	}
});

xhr.open("GET", "https://schwab.p.rapidapi.com/news/list-latest");
xhr.setRequestHeader("x-rapidapi-key", "06b9976b95msh7cc9ec46b5d9badp18b133jsn883a08b83fe3");
xhr.setRequestHeader("x-rapidapi-host", "schwab.p.rapidapi.com");

xhr.send(data);
