var PhoneRepo = require('../repo/phoneRepo').PhoneRepo,
    Phone = require('../model/model').Phone,
    PhoneFactory = require('../model/model').PhoneFactory;

var phoneRepo = new PhoneRepo('localhost', 27017);

exports.findById = function(req, res) {
     phoneRepo.findById(req.params.id, function(error, result) {
     		if(error)
     			res.send({'error':'An error has occurred'});
     		else
         		res.send(result);
         		
    });
};

exports.findAll = function(req, res) {
    phoneRepo.findAll(function(error, result) {
        res.send(result); 
    });
};