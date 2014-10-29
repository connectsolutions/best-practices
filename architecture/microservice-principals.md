# 10 Principals of a CoSo Microservice

The article defines the requirements that must be followed by each microservice implementation before being considered for production deployment.  

## Index

* [Single purpose](#single-purpose)
* [Decoupled](#decoupled)
* [Encapsulated](#encapsulated)
* [Message Queue](#messaging)
* [Restful](#restful)
* [Registration](#registration)
* [Self monitoring](#monitoring)
* [Logging](#logging)
* [Continuous Integration](#ci)
* [Auto deployable](#deployment)

### <a name="single-purpose"></a>Single purpose

A [microservice](http://en.wikipedia.org/wiki/Microservices) should have a single purpose.  Do one thing and do it well.  The [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) states that every (service) should have a single responsibility, and that responsibility should be entirely encapsulated by the context. In most cases this should result in a single end point.

### <a name="decoupled"></a>Decoupled

A microservice should have limited dependencies on the rest of the system.  If dependencies can't be avoided, their end points should be discovered / retrieved from the application architecture and not driven by configuration.

### <a name="encapsulated"></a>Encapsulated

A microservice should [encapsulate](http://en.wikipedia.org/wiki/Encapsulation_%28object-oriented_programming%29) and manage it's own data.  This includes decentralizing the conceptual models and data storage.  Each service should protect is't data from direct access by other services.

Hiding the internals of the service protects its integrity by preventing users from setting the internal data of the service into an invalid or inconsistent state. A supposed benefit of encapsulation is that it can reduce system complexity, and thus increase robustness, by allowing the developer to limit the inter-dependencies between software components

### <a name="messaging"></a>Message Queue

A microservice must support the [message queue](http://en.wikipedia.org/wiki/Message_queue) defined by the application architecture.  This includes using the queue to publish events to the application for registration, heart beats and logging. In most cases the service will register as a publisher and subscriber of application events.  The application will use the queue to notify the microservice of an event that will trigger it to take action.

### <a name="restful"></a>RESTful

If a service supports direct access via an end point, the end point must support the [REST](http://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints) architectural style.  It must use [JSON](http://en.wikipedia.org/wiki/JSON) as the data transfer format.

Requiring the use of REST and JSON provides a language indendpent approach to interprocess communication.

### <a name="registration"></a>Registration

A microservice must emit a registration event on the message queue each time it starts up.  Each application architecture is free to define the registration process for its' architecture.  However, it is required that each service support this registration process via the messaging queue.

It is expected that these registration events will be collected by a service that will offer the ability to view the registered services and their associated documentation.

### <a name="monitoring"></a>Monitoring

It is expected that each microservice will implement techniques to monitor its self as well as other services it may depend on.  This includes but is not limited to sending an heart beat at a defined interval.  Each application is free to define the required heart beat interval.  

Another example of self monitoring is sending pushing an error event into the message queue if a service is unable to access a dependent service.

### <a name="logging"></a>Logging

The logging of warning and error events must be accomplished by publishing these events to the message queue to support a common collection and management process.

### <a name="ci"></a>Continuous Integration

Each service is expected to follow the practice of [continues integration](http://en.wikipedia.org/wiki/Continuous_integration) which includes but is not limited to:

* Regular integration of changes to the mainline
* Automated build process
* Automated tests that minimally include a set of smoke tests

### <a name="deployment"></a>Auto Deployable

A service must be deployed via an automated deployment mechanism.  This includes the initial bare medal deployment as well as each tagged release.

Most distributed application architectures will have to many microservices to allow manual deployment to be achievable without significant time and energy.
