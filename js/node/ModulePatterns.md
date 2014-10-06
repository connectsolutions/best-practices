# Design Patterns for Node.js Modules

When you write a module, what options do you have for designing its interface?
My goal is to identify and illustrate useful patterns for module interface design
and to help you understand when and how to use them in your own work.

I discuss seven patterns below, many of which can be used in combination. They are:

* Exports a Namespace
* Exports a Function
* Exports a Constructor
* Exports a Singleton

## Require fundamentals
In Node requiring a file is requiring the module it defines. All modules have a
reference to an implicit module object whose property module.exports is what is
returned when you call require. A reference to module.exports is also
available as exports.

It's as if there were an implicit line at the beginning of each module that reads:

```
var exports = module.exports = {};
```
If you want to export a function, you have to assign it to module.exports.
Assigning a function to exports would just reassign the exports reference but
module.exports would still point at the original empty object.

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
An important behavior of require is that it caches the value of module.exports
and returns that same value for all future calls to require. It caches based on
the absolute file path of the required file. So if you want your module to be
able to return different values, you should have it export a function that can
then be invoked to return a new value.
