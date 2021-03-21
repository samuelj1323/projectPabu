var sentimentCounter = 0;
var aboveTen = false;
var sentimentTest = [];
var displayTweet = [];
var sentValues = [];
var confidenceScoreAvg = []; // [0] = positive, [1] = neutral, [2] = negative
var negAvg = 0;
var posAvg = 0;
var neuAvg = 0;
var isRunning;
var start;

//Global variables that retain confidence score avg across calls
//Divide each by retainedTweetCount and reset when needed
var retainedNeg = 0;
var retainedPos = 0;
var retainedNeu = 0;
var retainedTweetCount = 0;

const xhr2 = new XMLHttpRequest();
xhr2.withCredentials = true;

xhr2.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var res = JSON.parse(this.responseText);
		//console.log(res);
		if (sentimentTest.length == 0) {
				
			sentValues.push(res.type);
			addSentiment(sentValues, displayTweet, confidenceScoreAvg);
			sentimentTest = [];
			sentimentCounter = 0;
			aboveTen = false;
			displayTweet = [];
			sentValues = [];
			confidenceScoreAvg = []; // [0] = positive, [1] = neutral, [2] = negative
			negAvg = 0;
			posAvg = 0;
			neuAvg = 0;
			start = false;
			
			
		}
		if (sentimentTest.length > 0) {
					
			sentValues.push(res.type);
			
			
			updateSentiment(sentimentTest);
			
		}
	}
});

function updateSentiment(tweets) {
	if (start) {
		for (var i = 0; i < tweets.length; ++i) {
			sentimentTest[i] = tweets[i];
			displayTweet[i] = tweets[i];
		}
	}
	
	if (sentimentTest.length > 1) {
		
		var data3 = sentimentTest.shift();;
		data3 = "text=" + data3;
		data3.split(" ").join("%20");
	} else if (sentimentTest.length == 1) {
		var data3 = sentimentTest.shift();
		data3 = "text=" + data3;
		data3.split(" ").join("%20");		
		
	}
	
	
	
	xhr2.open("POST", "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/");
	xhr2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr2.setRequestHeader("x-rapidapi-key", "191ead3c15msh823099d2d53b980p1910cejsnbfe892a19103");
	xhr2.setRequestHeader("x-rapidapi-host", "twinword-sentiment-analysis.p.rapidapi.com");

	xhr2.send(data3);
}

//updateSentiment(ar); 