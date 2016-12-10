// wrap up some code in a way that would make any code inside of it safe--> and pass to it what we would need access to
// The Window & Jquery

//This is safe code.
//It creates a new execution context. The entire greetr has its own EXECUTION CONTEXT
(function(global,$){


	// 'new' an object
	// This should return a NEW greetr object
	var Greetr = function(firstName, lastName, language){
		return new Greetr.init(firstName, lastName, language)
	}

	// hidden within the scope of the IIFE and never directly accessible
	var supportedLangs = ['en', 'es'];

	// informal greetings
	var greetings = {
		en: 'Hello',
		es: 'Hola'
	};

	//formal greetings
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	// any objects built in Greetr.init will have access to these methods
	Greetr.prototype = {
		// 'this' refers to the calling object at execution time
		fullName: function(){
			return this.firstName + ' ' + this.lastName;
		},

		validate: function(){
			//check if valid lang
			// references the externally inaccessible 'supportedLangs' within the closure
			if(supportedLangs.indexOf(this.language) === -1){
				throw "Invalid Language";
			}
		},

		greeting: function(){
			// retrieve messages from object by referring to props using [] syntax
			return greetings[this.language] + ' ' + this.firstName + '!';
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ', ' + this.fullName();
		},

		//chainable methods return their own containing object
		greet: function(formal){
			var msg;

			//if undefined or null it will be coerced to 'false'
			if(formal){
				msg = this.formalGreeting();
			}else{
				msg = this.greeting();
			}

			if(console){
				console.log(msg);
			}

			// 'this' refers to the calling object at execution time
			// makes the method chainable
			return this;
		},

		log: function(){
			if(console){
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}
			//make chainable
			return this;
		},

		setLang: function(lang){
			this.language = lang;  //set language
			this.validate();  //validate
			return this; //make chainable
		},


		HTMLGreeting: function(selector, formal){
			if(!$){
				throw 'jQuery not loaded';
			}
			if(!selector){
				throw 'Missing jQuery selector'
			}

			//determine the message
			var msg;  
			if(formal){
				msg = this.formalGreeting();
			}
			else{
				msg = this.greeting();
			}

			// assuming this is a valid selector.
			// could do some more validation here....
			$(selector).html(msg);

			return this;
		},
		
		insertGreet: function(html){
			$(html).text('yo');
			return this;
		}
	}; //end prototype


	// Its ok that this is being declared here - b/c by the time this is called in Greetr, 
	// all of this code will already have run in the IFFE

	// the actual object is created here. Allows us to 'new' an object w/o calling 'new'
	Greetr.init = function(firstName, lastName, language){

		var self = this; // so we won't have to worry about what 'this' is pointing to later

		self.firstName = firstName || '';  //set some defaults
		self.lastName = lastName || '';
		self.language = language || 'en';

		self.validate();
	}


	// All objects created w/ Greetr.init will point to Greetr.init.prototype by default
	// BUT --> we want all objects to point to the Greetr protytpe (above). --> Jquery uses this same strategy.
	
	//trick borrowed from jQuery so we don't have to use the 'new' keyword
	Greetr.init.prototype = Greetr.prototype;

	// Attach our Greetr to the global object, and provide a shorthand '$G'
	global.Greetr = global.G$ = Greetr;  // We are exposing Greetr to 2 dif aliases

})(window, jQuery);