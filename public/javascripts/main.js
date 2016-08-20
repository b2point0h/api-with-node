$(function () {

	function countChar (val) {
		$('#tweet-char').text(140 - val);
	}
	$('#tweet-textarea').on('keyup', function () {
		countChar($(this).val().length);
	});
  	$('.button-primary').click(function(){
		var statusText = $('#tweet-textarea').val();
		var tweetParams = {status: statusText};
		// postNewTweet(tweetParams);
		console.log("Button clicked");
	});
});