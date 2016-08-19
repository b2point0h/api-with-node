var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var twitterKeys = require('../twitter-config.json');

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

// Set Twitter Params
var params = {screen_name: 'brandoc0mmand0', count: '5'};

// Twitter GET calls
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	var tweetsArray = [];
  	var tweetsObject;
  	
  	for (var i = 0; i < tweets.length; i++) {
  		tweetsObject = {
  			tweetTime: tweets[i].created_at,
		    tweetText: tweets[i].text,
		    retweets: tweets[i].retweet_count,
		    likes: tweets[i].favorite_count
  		}
  		tweetsArray.push(tweetsObject);
  	}
       
    client.get('users/show', params, function(error, profile, response) {
	  if (!error) {
	  	var userAvatar = profile.profile_image_url;
	    var userName = profile.screen_name;
	    var realName = profile.name;
	    var bannerImage = profile.profile_banner_url;  
	    
		
	    client.get('friends/list', params, function(error, friends, response) {
		  if (!error) {
		  	var followersArray = [];
		  	var followersObject;
		  	
		  	for (var i = 0; i < friends.users.length; i++) {
		  		followersObject = {
		  			realName: friends.users[i].name,
		  			userName: friends.users[i].screen_name,
		  			userAvatar: friends.users[i].profile_image_url	
		  		}
		  		followersArray.push(followersObject);
		  	}
 			client.get('direct_messages', params, function(error, messages, response) {
			  if (!error) {
			  	var messagesArray = [];
			  	var messagesObject;
			  	
			  	for (var i = 0; i < messages.length; i++) {
			  		messagesObject = {
			  			userAvatar: messages[i].sender.profile_image_url,
			  			userMessage: messages[i].text,
			  			userName: messages[i].sender.name,
			  			timeSent: messages[i].sender.created_at	
			  		}
			  		messagesArray.push(messagesObject);
			  	}
			  	// console.log(messages[0].sender.profile_image_url);
			  	
				router.get('/', function(req, res){
			      res.render('index', {
			        userAvatar: userAvatar,
			        userName: userName,
			        realName: realName,
			        bannerImage: bannerImage,
			        tweetsArray: tweetsArray,
			        followersArray: followersArray,
			        messagesArray: messagesArray
			      });
			    }); // End page render
			  } else {
			    console.log('Error authenticating!')
			  } 
			});// End Get Messages
		  } else {
		    console.log('Error authenticating!')
		  } 
		});// End Get Recent followers   
	  } else {
	    console.log('Error authenticating!')
	  } 
	});// End Get User data
  } else {
    console.log('Error authenticating!')
  }
}); // End Get Latest 5 tweets
module.exports = router;