# turbo-broccoli

## About

**Bon Appetit Recipe Scraper** is a live web tool that allows you to grab the latest recipes from Bon Appetit and store your notes for each recipe.

## How to Use

No Installation necessary. Open app by heading to: https://joli-livre-70967.herokuapp.com/

1. Home.
The home page allows you to view recipes that have been scraped previously and have not been saved.

2. Saved Recipes.
Clicking on "Saved Recipes" allows you to view any recipes that have been marked as "saved" by hitting the "Save Recipe" button.
a. Remove from Saved
You can remove recipes at any time from your "saved" view.
b. Add or View Notes
Use this button to add notes or change your notes on any recipe.

3. Scrape New Recipes.
By clicking on this button, the old history of recipes is cleared, and the latest 6 recipes featured on Bon Appetit's website are scraped and viewable, with no duplicates. If it looks like nothing changed, that likely means there are no new recipes featured since the last time they were scraped.

4. Clear Recipes.
Remove all scraped articles.


## Tech Stack:

###Front End/Client Side

* Html, CSS, JavaScript, and JQuery:
The site uses HTML, CSS, JavaScript, and jQuery to dynamically updates the site's contents.

* [CSS Framework](https://getbootstrap.com/): 
Bootstrap is one of the leading open-source CSS framework directed as a responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation and other interface components which sleekly styles our website and quickly validate username emails.

###Back End

Server Side Program
Node.js [https://nodejs.org] is an open source server environment. Bon Appetit Recipe Scraper utilizes the Express framework to easily connect the application from front to back end utilizing get and post requests and using mongo DB as the database.

Framework
Express [https://expressjs.com/]:
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Cheerio [https://cheerio.js.org/]: Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
Axios [https://github.com/axios/axios]: Promise based HTTP client for the browser and node.js
Logger [https://github.com/quirkey/node-logger]: A simple logging library that combines the simple APIs of Ruby's logger.rb and browser-js console.log()

Database
Mongo DB [https://www.mongodb.com/]: MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. No database is more productive to use. 
Mongoose [https://mongoosejs.com/]: Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

Deployment
Heroku [https://dashboard.heroku.com/login]:
Heroku is a cloud platform that lets developers quickly build, deliver, monitor, scale and deploy apps.