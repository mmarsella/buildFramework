// wrap up some code in a way that would make any code inside of it safe--> and pass to it what we would need access to
// The Window & Jquery

//This is safe code.
//It creates a new execution context. The entire greetr has its own EXECUTION CONTEXT
(function(global,$){



	// This should return a NEW greetr object
	var Greetr = function(firstName, lastName, language){
		return new Greetr.init(firstName, lastName, language)
	}


	Greetr.prototype = {}

	// Its ok that this is being declared here - b/c by the time this is called in Greetr, all of this code will already have run in the IFFE
	Greetr.init = function(firstName, lastName, language){

		var self = this; // so we won't have to worry about what 'this' is pointing to later

		self.firstName = firstName || '';  //set some defaults
		self.lastName = lastName || '';
		self.language = language || 'en';
	}


	// All objects created w/ Greetr.init will point to Greetr.init.prototype by default
	// BUT --> we want all objects to point to the Greetr protytpe (above). --> Jquery uses this same strategy.

	Greetr.init.prototype = Greetr.prototype;

	// We want to attach an alias to Greetr to the global object
	global.Greetr = global.G$ = Greetr;  //We are exposing Greetr to 2 dif aliases

})(window, Jquery);