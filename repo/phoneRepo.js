var mongo = require('mongodb');

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var BSON = mongo.BSON;
var ObjectID = mongo.ObjectID;

PhoneRepo = function(host, port) {
    this.db = new Db('phones-db', new Server(host, port, {
        auto_reconnect: true
    }, {}));
    var self = this;
    this.db.open(function(error,result) {
        bootstrapPhones(self);
    });    
};

PhoneRepo.prototype.getCollection = function(callback) {
    this.db.collection('phones', function(error, phone_collection) {
        if (error) {
            console.log(error);
            callback(error);
        } else callback(null, phone_collection);
    });
};


PhoneRepo.prototype.getId = function(collection, id) {
    return collection.db.bson_serializer.ObjectID.createFromHexString(id);
};


PhoneRepo.prototype.findAll = function(callback) {
    this.getCollection(function(error, phone_collection) {
        if (error) callback(error)
        else {
            phone_collection.find({},{detail:0}).toArray(function(error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};


PhoneRepo.prototype.findById = function(id, callback) {
    var self = this;
    self.getCollection(function(error, phone_collection) {
        if (error) callback(error)
        else {
            phone_collection.findOne({
                pid: id
            },{detail:1}, function(error, result) {
                if (error) callback(error)
                else callback(null, result)
            });
        }
    });
};

exports.PhoneRepo = PhoneRepo;


/*--------------------------*/
// Bootstrap phones
var fs = require('fs');
var defaultPhones = require('./phones').defaultPhones;

var bootstrapPhones = function(repo) {
    repo.getCollection(function(error, collection) {
        for (var i=0;i<defaultPhones.length;i++) {
            var phone = defaultPhones[i];
            phone['detail'] = JSON.parse(fs.readFileSync('public/phones/' + phone.pid + '.json', 'utf8'));
        }
        console.log("Bootrap default phones size "+ defaultPhones.length);
        collection.insert(defaultPhones,{safe:true}, function(err, result) {});
    });
};