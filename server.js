/**
 * Created by vitaliydrugak on 27.03.15.
 */

"use strict"

// module require start
var user = require('./user'),
	phrases = require('./user/ru'),
	drugakmodule = require('drugakmodule'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;


// some function for training
var vasya = new user.User('вася'),
	vitos = new user.User('витос');

vasya.hello(vitos);


//install NPM module and use him
drugakmodule();


// training module "util"
var testUtilObj = {
	a: 1,
	b: 2
};

console.log(util.inspect(testUtilObj));


// *****************************
// ********* OOP and error class

console.log('================ /// OOP in js /// ================');

// error Class
function PhraseError(msg) {
	Error.captureStackTrace(this, PhraseError);
	this.msg = msg;
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status,msg) {
	Error.captureStackTrace(this , HttpError);
	this.status = status;
	this.msg = msg;
}
util.inherits(HttpError, Error);
PhraseError.prototype.name = 'HttpError';


// base functionality
function getPhrase (name) {
	if(!phrases[name]) {
		throw new PhraseError("Нет такой фразы" + name)
	}
	return phrases[name];
}

function makePage (url) {
	if(url != 'index.html') {
		throw new HttpError(404 , "Нет такой страницы");
	}
	// change this phrase and you see Error in console
	return util.format("%s , %s!", getPhrase("Hello"), getPhrase("world"));
}

try {
	var page = makePage("index.html");
	console.log (page);
} catch (e) {
	if(e instanceof HttpError) {
		console.log(e.status, e.msg);
	} else {
		console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.msg , e.stack);
	}
}


// *****************************
// ********* Event emmiter

console.log("========// Event emmiter //========");

var myEventTest = new EventEmitter;
var singlton = {
	user : {
		name: "vitaliu drugak",
		age: "23"
	},
	print: function () {
		console.log(this.user);
	},
	changeUser: function (name, age) {
		this.user.name = name;
		this.user.age= age;
	}
};

myEventTest.on('print_user_obj', function () {
	singlton.print();
});
myEventTest.on('change_print_user_obj', function (a,b) {
	singlton.changeUser(a,b);
	singlton.print();
});

myEventTest.emit('print_user_obj');
myEventTest.emit('change_print_user_obj' , "Петя" , "45");
console.log("show me all listeners from 'myEventTest' = ", EventEmitter.listenerCount(myEventTest,"change_print_user_obj"));