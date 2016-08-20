"use strict";
var express = require('express');
var router = express.Router();
var moment = require('moment');
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
  		};
  		tweetsArray.push(tweetsObject);
  	} 
    client.get('users/show', params, function(error, profile, response) {
	  if (!error) {
	  	var userAvatar = profile.profile_image_url_https;
	    var userName = profile.screen_name;
	    var realName = profile.name;
	    var bannerImage = profile.profile_banner_url;  
	    var following = profile.friends_count;	
	    client.get('friends/list', params, function(error, friends, response) {
		  if (!error) {
		  	var followersArray = [];
		  	var followersObject;
		  	
		  	for (var i = 0; i < friends.users.length; i++) {
		  		followersObject = {
		  			realName: friends.users[i].name,
		  			userName: friends.users[i].screen_name,
		  			userAvatar: friends.users[i].profile_image_url_https	
		  		};
		  		followersArray.push(followersObject);
		  	}
 			client.get('direct_messages', params, function(error, messages, response) {
			  if (!error) {
			  	var messagesArray = [];
			  	var messagesObject;
			  	for (var i = 0; i < messages.length; i++) {
			  		messagesObject = {
			  			userAvatar: messages[i].sender.profile_image_url_https,
			  			userMessage: messages[i].text,
			  			userName: messages[i].sender.name,
			  			timeSent: messages[i].sender.created_at	
			  		};
			  		messagesArray.push(messagesObject);
			  	}			  	
				router.get('/', function(req, res){
			      res.render('index', {
			      	moment: moment,
			        userAvatar: userAvatar,
			        userName: userName,
			        realName: realName,
			        following: following,
			        bannerImage: bannerImage,
			        tweetsArray: tweetsArray,
			        followersArray: followersArray,
			        messagesArray: messagesArray
			      });
			    }); // End page render
			  } 
			});// End Get Messages
		  }
		});// End Get Recent followers   
	  }
	});// End Get User data
  }// End If block
}); // End Get Latest 5 tweets

function postNewTweet(tweetParams) {
	client.post('statuses/update', tweetParams, function (error, tweet, response) {
		if (!error) {
			console.log("Tweet Posted!");     
		}
	});
}

module.exports = router;