'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
    function($resource) {
        //:paramName
        return $resource('phones/:phoneId', {}, {
            //custom actions
            list: {
                method: 'GET',
                params: {
                    phoneId: '' //get phone list
                },
                isArray: true
            }
        });
    }
]);