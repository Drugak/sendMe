/**
 * Created by vitaliydrugak on 27.03.15.
 */

"use strict"

//require phrases json file
var phrases = require('./ru');


//major functions
function User (name) {
	this.name = name;
};

User.prototype.hello = function(who) {
	//use variable "phrases" , this is variable in ru.json
	console.log( phrases.Hello + "," + who.name);
};


//global variable
exports.User = User;


// require user.js file
console.log('user.js is required');
