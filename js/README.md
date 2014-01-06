Javascript Coding Standards
===========================

# CoSo Coding Style Manifesto
All code in any code-base should look like a single person typed it, no matter how many people contributed.

# Table of Contents
* JavaScript Files
* Whitespace
* Beatiful Syntax
* Build & Test Tools

# JavaScript Files
JavaScript programs should be stored in and delivered as .js files.

JavaScript files should be named all lower case with a dash as word seperator if needed.

JavaScript code should not be embedded in HTML files unless the code is specific to a single session. Code in HTML adds significantly to pageweight with no opportunity for mitigation by caching and compression.

# Whitespace

* Indention
We use soft indents (spaces) size of two.

Remove all end of line white space.

# Beatiful Syntax

* Use of Var
Multiple var statements for each declaration followed by a semi-collon with a comment describing usage.
```code
var foo = 'Hello';
var name = 'World';
```

* Quotes
Use single quotes for all javascript files and double quotes for html and templates
```code
var foo = 'Hello World';
```

* Function arguments
whitespace around arguments.
```code
console.log( 'Hello World' );
```

Use a single space after keywords like function. Ex:

```code
function foo( a, b ) {
	....
}
```

# Build & Test Tools
All JavaScript files must pass the jshint rules provided by the build process.  The build process is automated with Grunt. Therefore the files should pass the following command:
```shell
grunt jshint
```
All JavaScript files must have a corresponding unit test.  Unit testing is automated with Grunt and can be executed with the following command:
```shell
grunt unit
```
