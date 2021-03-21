//for text enlargement slider
$('input').on('change', function () {
    var v = $(this).val();
    $('#tweets').css('font-size', v + 'px')
	$('#sentiments').css('font-size', v + 'px')
	document.getElementsByClassName('twts')[0].style.font-size = v + 'px';
    //$('span').html(v);
});



$(document).ready(function(){
    $('.sidenav').sidenav();
    
    mydata = JSON.parse(window.name);
    mydata.list.forEach(function(x){
        document.getElementById("mystocks").insertAdjacentHTML("afterend", 
    `<div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">`+x+`</span>
      <p>Stock tweets, graph and sentiment analysis to be added later</p>
    </div>
    <div class="card-action">
      <a href="index.html?`+x+`">More info</a>
    </div>
  </div>`);
    });
     

});