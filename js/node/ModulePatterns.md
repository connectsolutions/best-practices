# Design Patterns for Node.js Modules

## Manifesto

### Create small modules

Do it the unix-way:

> Developers should build a program out of simple parts connected by well defined interfaces, so problems are local, and parts of the program can be replaced in future versions to support new features.

Do not build Deathstars - keep it simple, a module should do one thing well.

### Avoid this and new

Binding to a specific context in Node is not a win, because Node involves passing around lots of callbacks, and heavy use of higher-level functions to manage control flow. Using a functional style will save you a lot of trouble.

Of course there are some cases when prototypes can be more efficient, but if possible try to avoid them.

## Overview
The goal of this article is to identify and illustrate useful patterns for module interface design and to help you understand when and how to use them in your own work.

The following are the primary patterns, many of which can be used in combination. They are:

* Exports a Namespace
* Exports a Function
* Exports a Constructor
* Exports a Singleton

## Require fundamentals
In Node, requiring a file is requiring the module it defines. All modules have a reference to an implicit module object whose property module exports is what is returned when you call require. A reference to module.exports is also available as exports.

Require makes it as if there were an implicit line at the beginning of each module that reads:

```
var exports = module.exports = {};
```
If you want to export a function, you have to assign it to module.exports.  Assigning a function to exports would just reassign the exports reference but module.exports would still point at the original empty object.

So we can define a module function.js that exports a function:
```
module.exports = function () {
  return {name: 'Jane'};
};
```
and require it with:
```
var func = require('./function');
```
An important behavior of require is that it caches the value of module.exports and returns that same value for all future calls to require. It caches based on the absolute file path of the required file. So if you want your module to be able to return different values, you should have it export a function that can then be invoked to return a new value.

To demonstrate with the Node REPL:
```
$ node
> f1 = require('/Users/nicknance/dev/coso/best-practices/js/node/scripts/function');
[Function]
> f2 = require('./scripts/function'); // Same location
[Function]
> f1 === f2
true
> f1() === f2()
false
```
You can see that require is returning the same function instance but that the objects returned by that function are different instances for each call.

For more detail on Node's module system the [core docs](http://nodejs.org/api/modules.html)
provide good detail and are worth a read.

And now on to the interface patterns.

## Exports a Namespace
A simple and common pattern is to export an object with several properties is to use functions.  This allows the code requiring the module to pull in a collection of related functionality under a single namespace.

We use the following pattern:
```
function readFile(path, options, callback) {
  //
}

function getFileNames(path, options, callback) {
  //
}

exports.readFile = readFile;
exports.getFileNames = getFileNames;
```
This first defines the functionality of the module and then define the functionality to expose for public use.  It is important to understand when defining this type of module that the code and it's state are shared throughout the life of the application.  It is important to manage state within the scope of each individual function.

We use the pattern because it makes it easier to expose functionality to unit testing using the following method:
```
if (process.env.NODE_ENV === 'test') {
  exports.parsePath = parsePath;
}
```

## Exports a Function
Another pattern is to export a function as the interface to a module. A common use of this pattern is to export a factory function that returns an object when invoked.  We see this when using Express.js:
```
var express = require('express');
var app = express();

app.get('/hello', function (req, res) {
  res.send "Hi there! We're using Express v" + express.version;
});
```
The function exported by Express is used to create a new Express application.  In your own use of this pattern, your factory function may take arguments used to configure or initialize the object returned.

We use the following pattern to export a function
```
module.exports = function createApplication() {
  ....
}
```
When exporting a function, it is good practice to name the function so that it will show up in stack traces. Note the stack trace differences in these two examples:
```
// bomb1.js
module.exports = function () {
  throw new Error('boom');
};
```
```
// bomb2.js
module.exports = function bomb() {
  throw new Error('boom');
};
```
When demonstrated with Node REPL:
```
$ node
> bomb = require('./scripts/bomb1');
[Function]
> bomb()
Error: boom
    at module.exports (/Users/nicknance/dev/coso/best-practices/js/node/scripts/bomb1.js:3:9)
    at repl:1:2
    ...
> bomb = require('./scripts/bomb2');
[Function: bomb]
> bomb()
Error: boom
    at bomb (/Users/nicknance/dev/coso/best-practices/js/node/scripts/bomb2.js:3:9)
    at repl:1:2
    ...
```

## Exports a Constructor
We define classes in JavaScript with constructor functions and create instances of classes with the new keyword.
```
function Person(name) {
  if ( this instanceof Person ) {
    this.name = name;
  } else {
    return new Person(name);
  }
}

Person.prototype.greet = function() {
  return "Hi, I'm Jane.";
};

var person = new Person('Jane');
console.log(person.greet()); // prints: Hi, I'm Jane
```

### Try to avoid `this` and `new`
Even though it is best to avoid the use of new and this in Node, at times we need this capability.  

For this pattern we implement a class-per-file and export the constructor to make our project organization clear and to make it easy for teammates to find the implementation of a class.
```
var Person = require('./person');

var person = new Person('Jane');
```
The implementation should look like:
```
function concatName(firstName, lastName) {
  return firstName + ' ' + lastName;
}

function Person(firstName, lastName) {
  this.name = concatName(firstName, lastName);
}

Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

module.exports = Person;
```
## Exports a Singleton
Export a singleton when you want all users of your module to share the state and behavior of a single class instance.

Because require caches the value assigned to module.exports, all calls to require will return this same instance ensuring that it is a singleton in our application. We use an object-oriented design to encapsulate and decouple functionality, maintain state and support readability and comprehension, while creating a simple interface to users by creating and exporting an instance of the class.

This pattern can be implemented as:
```
function UptimeCalculator() {
  //...
}

module.exports = exports = new UptimeCalculator();
```

## Examples
The Node REPL examples presented in this document can be found within this repo at:
`js/node/scripts`

I have included fully implemented examples that illustrate the use of private and public properties for each pattern presented above.  These modules include a complete mocha test suite that verifies the expected behavior of each module. There are a few extra details that can be teased out of these examples that I have not presented in this article.  You should find it worth your time to review them along with the test suite.

These examples can be found in `js/node/examples`.  Use the following steps to run the test suite from the examples directory:
* npm install
* gulp tests
