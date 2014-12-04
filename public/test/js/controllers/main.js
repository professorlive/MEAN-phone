'use strict';

describe('Controller: PhoneListCtrl', function() {

    // load the controller's module
    beforeEach(module('phonecatControllers'));

    var PhoneListCtrl, scope;

    beforeEach(function() {

        var phoneCache = {
            get: function() {
                return [];
            },
            set: function() {}
        };

        module(function($provide) {
            $provide.value('phoneCache', phoneCache);
        });

        var Phone = {
            list: function() {
                return [];
            }
        };

        module(function($provide) {
            $provide.value('Phone', Phone);
        });

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
	var routeParams = {
            phoneId: 1
        };
        PhoneListCtrl = $controller('PhoneListCtrl', {
            $scope: scope,
            $routeParams: routeParams
        });
    }));

    it('should set default sort clause phone', function() {
        expect(scope.orderProp).toBe('age');
    });

    it('should set an initial empty phone list from empty factory', function() {
        expect(scope.phones.length).toBe(0);
    });

    it('should set an empty phone list after loading more from empty factory', function() {
        scope.loadMore();
        expect(scope.phones.length).toBe(0);
    });
});

describe('Controller: PhoneDetailCtrl', function() {

    // load the controller's module
    beforeEach(module('phonecatControllers'));

    var PhoneDetailCtrl, scope, phone =function(){
            var detail= {
                images: ["test.jpg"]
            }
        },
        routeParams;

    beforeEach(function() {

        var Phone = {
            list: function() {
                return [];
            },
            get: function(id) {
                return new phone();
            }
        };

        module(function($provide) {
            $provide.value('Phone', Phone);
        });

    });

	
    beforeEach(inject(function($controller, $rootScope, Phone) {
        scope = $rootScope.$new();
        routeParams = {
            phoneId: 1
        };
        PhoneDetailCtrl = $controller('PhoneDetailCtrl', {
            $scope: scope,
            $routeParams: routeParams,
	    Phone : Phone
        });
    }));

    it('should set phone detail', function() {
        expect(scope.phone).toBeDefined();
    });

    it('should set selected phone in root scope', ['$rootScope', function($rootScope) {

        expect($rootScope.selectedPhone).toBe(1);
    }]);

    it('should set phone image', function() {
        expect(scope.mainImageUrl).toBe("test.jpg");
    });

});
