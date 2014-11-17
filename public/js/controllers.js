 'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['infinite-scroll']);


phonecatControllers.controller('PhoneListCtrl', ['$scope', '$rootScope', 'Phone', '$window',
    function($scope, $rootScope, Phone, $window) {
        //phone chunck size
        var partialListSize = 5;
        if($rootScope.orderProp)
            $scope.orderProp = $rootScope.orderProp;
        else
            $rootScope.orderProp = $scope.orderProp;
        //load the phone list
        if (!$rootScope.phones)
            Phone.list(function(phoneL) {
                $rootScope.phones = phoneL;
                $scope.phones = $(phoneL).slice(0, partialListSize);               
            });

        

        $scope.orderPropChanged = function(){
            $rootScope.orderProp = this.orderProp;
        };

        $scope.loadMore = function() {
            if (typeof $rootScope.phones == 'undefined' || $scope.phones.length == $rootScope.phones.length)
                return;
            var last = $scope.phones.length - 1;
            for (var i = last + 1; i < partialListSize, i < $rootScope.phones.length; i++) {
                $scope.phones.push($rootScope.phones[i]);
            }
        };


        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            if (!$rootScope.selectedPhone)
                $window.scrollTo(0, 0);
            else{
                 //check if an element can be found with id attribute
                var el = document.getElementById($rootScope.selectedPhone);
                if (!el) { //check if an element can be found with name attribute if there is no such id
                    el = document.getElementsByName($rootScope.selectedPhone);
                    if (el && el.length)
                        el = el[0];
                    else
                        el = null;
                }
                if (el) //if an element is found, scroll to the element
                    el.scrollIntoView();
            }           
        });

    }
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$rootScope', '$anchorScroll', '$location', '$routeParams', 'Phone',
    function($scope, $rootScope, $anchorScroll, $location, $routeParams, Phone) {

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };

        Phone.get({
            phoneId: $routeParams.phoneId
        }, function(phone) {
            $scope.phone = phone.detail;
            $scope.setImage(phone.detail.images[0]);
            $rootScope.selectedPhone = $routeParams.phoneId;
        });

        window.scrollTo(0, 0);
    }
]);