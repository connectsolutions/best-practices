Backbone Best Practices
=======================

# Table of Contents
* Philosophy

# Philosophy

* Views should be responsible for display, input, updating the model and coordinating the creation of other views.

* Models / Collections should be responsible for maintaining application state, processing business logic and syncing with the server.

* Applications should be divided up into modules (functional groups).  Multiple routers should be created to handle the routes unique to each module.  Routers should be responsible bootstraping and caching the necessary models, collections and views needed by the module.  It should inject collections & models into views when they are created.

* There should be a single App module extended from view that is responsible for initial application bootstraping, creating all the routers and manage the application page structure (header, body, footer).

# Views

* Views should never create models / collections.  They should be passed in as options when the view is created.  The options used to pass in the collection / model shouldn't be the standard model / collection used by Backbone.  When the view is initialized it should set the this.model or this.collection based on the options parameters that are passed in.  See Example Below:
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

* A views render method should be as simple as possible and able to be called multiple times without performance impact or adversly effecting the DOM.

* Views should fetch data on the model / collection in seperate load method after setting up the necessary event handlers needed to render the page when the fetch is completed.  Render should not fetch data.  Callbacks should not be used when calling the fetch to render the page.  The render should be wired to a model / collection event handler.
Views should pass this into the template in the render to allow for the template to be able to call helper functions implemented in the view to simplify the templates.

* A view should always listen to it's model or collection for necessary changes and call render

* Sub views should never call functionality on the parent or even assume where it should be appended in the DOM.  The parent should create a view and append in the DOM (where possible) and then rendered.  If the sub view needs to communicate a change to the parent it should do this via events.
When views create sub views they must make sure they call remove on each sub view before they are removed.  This is usually handled by overriding Backbone remove and calling remove on all the sub views before calling the super class remove.

# Collections & Models

* Collections / Models should be rigorous about maintaining state locally and sync with the server only when necessary.  This would include things like adding and removing from a collection should happen locally without a round trip to the server.  This also would include pagination, searching and sorting to occur client side as much as possible.

* Collections should follow a singleton / factor model to help support maintaining state across the application.  See example below:
