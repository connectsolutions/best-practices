# Backbone Best Practices

This is a living document and new ideas for improving the code around us are always welcome.

## Table of Contents
 * [Better Backbone Code](#rules)
 * [CoSo Philisophy](#philosophy)
 * [Architecture](#architecture)

##<a href="rules"></a>8 Rules for Better Backbone Code
####1. Views are Data-Less

* Data belongs to models not views. Next time you find yourself storing data inside a view (or worse: the DOM), stop and move it into the model.

* If you don’t have a model, create one, it’s easy:

* You can now listen to change events on all your data or even easily sync it with your server and create a real time experience.

####2. Views may point to one and only one Model

* Views which need to reference more than one Model are warning signs that you're trying to do too much with one class. Instead, break your large View into two or more Views. The View's model should always be stored as this.model.

* Similarly, Views should point to no more than one collection.

####3. DOM Events only affect models

* When a DOM event occurs, such as a click on a button, don’t let it change the view itself. Change the model.

* Changing the DOM without changing a state means you keep your state on the DOM. This rule will keep you from having an inconsistent state.

* If a click on a “read more” link was made, don’t expand the view, just change the model:  Ok, but how will the view actually change? Good question, the next rule answers that.

####4. DOM Changes only when the model changes

* Events are awesome - use them. The easiest approach is to render again after each change:

* A much better approach is to only change what’s needed:

* The view is always synced with the model. It doesn’t matter how the model was changed: following an action, from a fetch or from a console debugging session - the view will always stay up to date.

####5. What is bound must be unbound

* When a view is removed from the DOM using the `remove` method, it must unbind from all the events it is bound to.

* If you've used `on` for binding, it's your duty to use `off` for unbinding. Without unbinding, the garbage collector can't release the memory for you and your apps performance will degrade.

* That's where `listenTo` comes in. It tracks what the view is bound to and unbinds it on a remove. Backbone does this by calling `stopListening` just before removing itself from the DOM:

####6. Always be chainable

* Always return `this` from the `render` and `remove` functions. This allows you to chain actions:

* This is the convention, do not break it.

####7. Events are better than callbacks

* It's better to react upon events than waiting for callbacks.

* Backbone models fire 'sync' and 'error' events by default so we can use these events instead of providing callbacks. Consider these two alternatives:

This is much better:

* It doesn't matter how or where a model will be fetched, the handleSuccess/handleError methods will be called.

####8. Views are scoped

* A view should never(!) operate on a DOM other than its own.

* The view has a reference to its own DOM element at 'el' and also a jQuery element '$el'.

* This means you must never use jQuery directly:

* Always scope yourself to your own DOM element instead:

* If you need to alter a different view, just trigger an event and let the other view do its thing. You can also use Backbone as a global Pub/Sub system.

## <a name="philosophy"></a>The CoSo Philosophy

1. Overview

	- Views should be responsible for display, input, updating the model and coordinating the creation of other views.

	- Models / Collections should be responsible for maintaining application state, processing business logic and syncing with the server.

	- Templates should stay logic-less.  If there is a need for conditionally displaying a portion of a template it should be broken into a separate template and the render logic should apply the template when necessary.

2. Views

	- Views should avoid creating models / collections.  They should be passed in as options when the view is created.  The options used to pass in the collection / model shouldn't be the standard model / collection used by Backbone.  When the view is initialized it should set the this.model or this.collection based on the options parameters that are passed in.  See Example Below:

	```code
	var MyView = Backbone.View.extend({
	    initialize: function(options) {
	        if (!options || options.users)
	            throw new Error('Missing users option');
	        this.collection = options.users;
		};
	});

	var users = new Backbone.Collection();

	var view = new MyView({users: users});
	```

	- A views render method should be as simple as possible and able to be called multiple times without performance impact, memory leaks or adversely effecting the DOM.

	- Views should fetch data on the model / collection in seperate load method after setting up the necessary event handlers needed to render the page when the fetch is completed.  Render should not fetch data.  Callbacks should not be used when calling the fetch to render the page.  The render should be wired to a model / collection event handler.

	Views should pass this into the template in the render to allow for the template to be able to call helper functions implemented in the view to simplify the templates.

	- A view should always listen to it's model or collection for necessary changes and call render

	- Sub views should never call functionality on the parent or even assume where it should be appended in the DOM.  The parent should create a view and append in the DOM (where possible) and then rendered.  If the sub view needs to communicate a change to the parent it should do this via events.

	When views create sub views they must make sure they call remove on each sub view before they are removed.  This is usually handled by overriding Backbone remove and calling remove on all the sub views before calling the super class remove.

3. Models & Collections

	- Models & Collections should be rigorous about maintaining state locally and sync with the server only when necessary.  This would include things like adding and removing from a collection should happen locally without a round trip to the server.  This also would include pagination, searching and sorting to occur client side as much as possible.

	- Collections should follow a singleton / factor model to help support maintaining state across the application.  See example below:

## <a href="architecture"></a>Architecture

1. Application
  - Each application should have a very thin super class of View, Model, Collection and Router that defines project specific common functionality across the project.  This provides a central place for common overrides to be managed.

  - There should be a global app based on a Backbone.View.  The details of this module is defined below.

  - Each major subsystem should have a module router defined based on Backbone.Router.  Each router should be passed an instance of the app module when it is created.  The details of the module router are defined below.

2. Application View
  - The global App should handle the application login / logout

  - It is responsible for the application view port and its state based on login / logout

  - It should wait to execute Backbone.history.start until the user is logged in or the existing session is validated

  - The App should provide a showView function to allow an App Module to be swapped out in the main window when needed.  As part of the swap it should remove the previous module

  - The app should manage user security by instantiating only the modules the user should have access to at any given time

3. Module Router  

  - Module routers should listen to router events and react to the events that are relevant to their area of concern in the application

  - It should create and maintain relative collections in memory

  - It should create views as needed and pass in needed collections or new created modules as needed.
