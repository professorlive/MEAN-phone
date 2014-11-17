//this model is used to enforce field in the DB document
exports.Phone = Phone = function(){
    this.age= 0;
    this.pid= ""; 
    this.imageUrl= ""; 
    this.name= "";
    this.snippet= "";
    this.detail={};
};


exports.PhoneFactory = PhoneFactory = function(){
	this.getFromRequest = function(req){
		var result = new Phone();
		for (var prop in result) {
		  if( result.hasOwnProperty( prop ) && typeof req.param(prop) != 'undefined')
		   	result[prop] = req.param(prop);
		}
		if(typeof req.param("_id") != 'undefined')
			result["_id"] = req.param("_id");
		return result;
	};
	this.getUpdateFromRequest = function(req){
		var result = this.getFromRequest(req);
		if(typeof req.param("comment") != 'undefined')
			result["comment"] = req.param("comment");
		return result;
	};
};