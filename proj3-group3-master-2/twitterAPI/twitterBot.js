// var Twit = require('twit');
// //const fs = require('fs');
// //const { parse } = require('path');
// import addTweets from '../ui-controls.js';
// var T = new Twit({
//     consumer_key: '5NeqaXTy24VYJ3ycE3oysxpKb',
//     consumer_secret:'ENrtGzKKduGw44qeLmQB74dPBGA6GKcHBKRguAxjqfbP57QwlM',
//     access_token:'1316458029378871297-2ucvnUCNBKIkof40KjOyaDndj1XO2u',
//     access_token_secret:'D8kT9aNvIIFSyZ5weZ8WMkSznAC02OizIAd0ObxBJ2qBT',
// });
// function display(array1){
//     console.log("here");
//     console.log(array[0]);
    
// }
// var query = "game of thrones since:2020-01-01";
// T.get('search/tweets', {q: query, count: 50,lang:'en'},function(err, data, response){
//     //creates array
//     var jsonArray = [];
//     //iterates through and adds the values we want from the twitter data.
//     for(var i =0; i < data.statuses.length; i++){
//         jsonArray.push(data.statuses[i].text+"\n");
//     }
//     addTweets(jsonArray);
//     //makes a string of the array
    
//     //writes the string to the text file
    
//     //const jsonString = JSON.stringify(jsonArray);
    
//     //console.log(jsonArray.length);
  
//   //  fs.writeFile('Output.json', jsonString, err=>{
//    //     if(err){
//     //        console.log('error writing file: ', err)
//      //   }else{
//       //      console.log('success wrote')
//         }
//     })
// })
var responseArray = [];
ckjhug = '';
function query(company, count){
    var query = "https://autumn-sunset-feb4.jayworks.workers.dev/q="+company+"&count="+count+"&result_type=recent&lang=en";
    ckjhug = company;
    xhttp.open("GET",query, true);
    xhttp.send();
}
ygbnj ='';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        //console.log(xhttp.responseText);
        arrr = JSON.parse(xhttp.responseText).statuses;
        ygbnj = arrr;
        let result = arrr.map(a => ({txt: a.text, name: a.user.name , ppic: a.user.profile_image_url ,sname: a.user.screen_name, time: a.created_at}));
        //console.log("my stuff "+ckjhug);
        addTweets(ckjhug, result);
    }
};
