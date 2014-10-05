# Javascript Coding Standards

This is a living document and new ideas for improving the code around us are always welcome.

# Manifesto

All code in any code-base should look like a single person typed it, no matter how many people contributed.

## Table of Contents
 * [JavaScript Files](#jsfiles)
 * [Whitespace](#whitespace)
 * [Beautiful Syntax](#spacing)
 * [Variable and function names](#naming)
 * [Variable hoisting](#hoisting)
 * [Build & Test Tools](#tools)

## Style Guide

1. <a name="jsfiles">JavaScript Files</a>
	- JavaScript programs should be stored in and delivered as .js files.

	- JavaScript files should be named all lower case with a dash as word seperator if needed.

	- JavaScript code should not be embedded in HTML files unless the code is specific to a single session. Code in HTML adds significantly to pageweight with no opportunity for mitigation by caching and compression.

1. <a name="whitespace">Whitespace</a>
	- Indention - We use soft indents (spaces) size of two.
		- Never mix spaces and tabs.

	- Remove all end of line white space.

	- Add spaces and line breaks when/where readability gets compromised otherwise.

	```code
	'use strict';

	module.exports = function(PackageService, SettingService) {

	    return (require('./../classes/Controller.js')).extend(
	        {
	            service: PackageService
	        },
	        {
	            // Get 3 most popular packages
	            popularAction: function() {
	                PackageService.find({
	                        limit: 3,
	                        order: 'views DESC'
	                    })
	                    .then(this.proxy('send'))
	                    .fail(this.proxy('handleException'));
	            },
	            // Create a package
	            postAction: function() {
	                var data = this.req.body;

	                if (data.id) {
	                    return this.putAction();
	                }

	                PackageService
	                    .create(data)
	                    .then(this.proxy('send'))
	                    .fail(this.proxy('handleException'));
	            },
	            // Update a package
	            putAction: function() {
	                this.send(403, 'Updates are not allowed');
	            }
	        }
	    );
	};
	```

1. <a name="spacing">Beautiful Syntax</a>

	- Use of Var

	Multiple var statements for each declaration followed by a semi-collon with a comment describing usage.

	```code
	var foo = 'Hello';
	var name = 'World';
	```

	- Quotes

	Use single quotes for all javascript files and double quotes for html and templates

	```code
	var foo = 'Hello World';
	```

	- Function arguments

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

	- Blocks

	When you're writing blocks (or array items), you start them on the same line.

	```code
	define([
	        'app',
	        'highlightjs'
	    ],
	    function( app, hljs ) {
	        'use strict';

	        app.controller( 'Home', [
	            '$scope',
	            ...
	            function( $scope, ... ) {

	                // Init $scope properties
	                // $scope helpers
	                $scope.helpers = {
	                    ...
	                };
	            }
	        ]
	    }
	);
	```

1. <a name="naming">Variable and function names</a>

	- Naming size

	We don't write variable or function names that are too big, but we don't like having very short names as well.

	The variable and function names are also somewhat descriptive of what they're doing. They don't require a lot of thinking about what they are.

	Example:
	```code
	module.exports = function( Service ) {

	    return ( require('./../classes/Controller.js') ).extend(
	        {
	            service: Service,
	        },
	        {
	            groupedAction: function() {
	                Service.getSettingsGroups()
	                    .then( this.proxy( 'send' ) )
	                    .fail( this.proxy( 'handleEx' ) );
	            },

	            postAction: function() {
	                var tmpId = 0,
	                    settingObject = this.req.body;

	                ...
	            }
	        });
	};
	```

	- Variable and function names are in camelCase.

1. <a name="jsfiles">Variable hoisting</a>

  Always declare variables at the top of their scope (the top of global code and the top of function code) so it's clear which variables are function scoped (local) and which are resolved on the scope chain.

  A description of variable hoisting can be found <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting">here</a>

1. <a name="tools">Build & Test Tools</a>

	All JavaScript files must pass the jshint rules provided by the build process.  The build process is automated with Grunt. Therefore the files should pass the following command:

	```shell
	grunt jshint
	```

	All JavaScript files must have a corresponding unit test.  Unit testing is automated with Grunt and can be executed with the following command:

	```shell
	grunt unit
	```
