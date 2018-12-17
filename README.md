MEAN-phone
==========

Contains a MEAN stack based application to show a list of phones and a phone details.
It's inspired to the angular-phonecat tutorial from the AngularJS official page.

- Repackaged the application to use Express and Node.js js to serve the angularjs front end.
- Added infinite scroll to load phone list dinamically
- Added persistence of the phone list sorting option and auto scroll effect to browse phones easier
- Added MongoDB persistence layer (an instance of MongoDB must be running at localhost:27017).
  At the bootstrap of the server, the included static list of default phones is persisted to MongoDB.
  
Cloning
---------

	git clone https://github.com/ramon-dare/MEAN-phone.git

Building
---------
I used [bower](http://bower.io/) for angularjs's dependency management and [npm](https://www.npmjs.org/) for 
Node.js' and Express' dependencies.
Once the environment is ready, cd to the root folder of the project then run:

    bower install
	
Move the generated folder bower-dependencies under the public folder	

	npm install
	
Running
---------
If compilation is successful, run with [Node.js](http://nodejs.org/):

	node server.js
