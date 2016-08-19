Twitter Interface - API with Node
================================

## Requirements

- [X] Create a Twitter app through Twitter’s developer portal and get the needed API keys.

- [X] Authenticate your application instance from your server code. It’s a good idea to use an npm module to help you with this part.

- [X] Make a template using Jade, Handlebars, or another JavaScript template engine for the main page. The template should have spaces for:

- [X] your 5 most recent tweets

- [X] your 5 most recent friends

- [X] your 5 most recent private messages

- [X] It should also include your personal Twitter name and profile image at the top of the screen.

- [X] Each rendered result must include all of the information seen in the sample layout
	- message content
	- number of retweets
	- number of likes
	- date tweeted
	- profile image
	- real name
	- screenname
	- message body
	- date the message was sent
	- time the message was sent

- [X] Using Node and Express, request the data you need from Twitter’s API, render it in your template, and send it to the client. You’ll need to set up at least one Express route to manage this process.

- [X] Make sure the application actually renders your correct Twitter information by running it on your local machine, and comparing it to your recent Twitter activity.

- [X] It is very important that you do NOT upload any of your personal API keys / secrets / passwords to Github or other publicly accessible place.


## Extra Credit

- [X] Add a section to the bottom of your page that allows a user to post a new tweet.

- [] If you add a post tweet feature, show new tweets on the page without refreshing.

- [] Add an error page to your application, so that if anything goes wrong with your routes the user will see a friendly message rendered, instead of the default error code.

- [X] Include your personal background image from Twitter as a background for the page header.