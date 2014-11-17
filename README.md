MEAN-phone
==========

Contains a MEAN stack based application to show a list of phones and a phone details.
It's inspired to the angular-phonecat tutorial from the AngularJS official page.

- Repackaged the application to use express and node js to serve the angularjs front end.
- Added infinite scroll to load phone list dinamically
- Added persistence of the phone list sorting option and auto scroll effect to brose phones easier
- Added mongodb persistece layer(an instance of mongodb must be running at localhost:27017).
  At the bootstrap of the server, the included static list of default phones is persisted to mongodb.
