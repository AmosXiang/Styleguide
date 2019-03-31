//https://codepen.io/mattonit/pen/ppLvdX
$('#play').on('click', function(e) {
	e.preventDefault();
	$("#player")[0].src += "?autoplay=1";
	$('#player').show();
	$('#video-cover').hide();
	$('#play').hide();
})

//button
window.onload = function() {
	$('.button_container').click(function() {
	  $('.button_container').toggleClass('active');
	  $('.menu').toggleClass('open');
	});
  };