# The Reactive Architecture Applied

## Table Of Contents

* [Goals](#goals)
* [Principals](#principals)
* [Architecture Key Aspects](#architecture)
* [Microservices Described](#microservices)

## <a name="goals"></a>Goals

We want systems that are Responsive, Resilient, Elastic and Message Driven. These systems are called Reactive Systems.  Systems built as Reactive Systems are more flexible, loosely-coupled and scalable. This makes them easier to develop and amenable to change. They are significantly more tolerant of failure and when failure does occur they meet it with elegance rather than disaster. Reactive Systems are highly responsive, giving users effective interactive feedback.

* Responsive: The system responds in a timely manner if at all possible.  Responsive systems focus on providing rapid and consistent response times, establishing reliable upper bounds so they deliver a consistent quality of service.

* Resilient: The system stays responsive in the face of failure. This applies not only to highly-available, mission critical systems — any system that is not resilient will be unresponsive after a failure.

* Elastic: The system stays responsive under varying workload. Reactive Systems can react to changes in the input rate by increasing or decreasing the resources allocated to service these inputs.

* Message Driven: Reactive Systems rely on asynchronous message-passing to establish a boundary between components that ensures loose coupling, isolation, location transparency, and provides the means to delegate errors as messages.

## <a name="architecture"></a>Architecture Key Aspects

### Hexagonal (Ports and Adapters)

Also known as 'Ports and Adapters', or clean, or onion architecture, the hexagonal architecture is an application-architecture-style that helps us to focus on our business goals without being tied or jeopardized by our technical frameworks or infrastructure choices.

In this model there is no such thing as 'front-end' (users interactions) or 'back-end' (db) anymore, but two primary areas instead: the inside (with applicative-use-case-handlers and business domain code) and the outside (with all our infrastructure code: db access, messaging & communication bindings, etc). If you now combine this model with the [dependency inversion principle](http://en.wikipedia.org/wiki/Dependency_inversion_principle) which states that High-level modules should not depend on low-level modules. Both should depend on abstractions, you can easily infer that this model dictates that you can only point inwards the hexagon / circle (infrastructure being the low-level stuffs in that context).

Interactions between those two areas (in and out) are achieved by ports and adapters (P/A in the diagram below). In a nutshell, events or clients requests arrive from the outside world at a port, and the technology-specific adapter converts it into a usable procedure call or message and passes it to the application layer.

![Image of Yaktocat](Hexagonal architecture.png)

Key points:

* Input and output ports to facilitate communication with the core Domain Model.

* Adapters are created for each I/O port and consumer. Sitting between clients, on the outside, and the core, on the inside.

* Inputs: HTTP (REST, SOAP), message queue (AMQP), Outputs: persistence, messaging

Strengths and benefits of the hexagonal architecture include:

* Sustainability / Timelessness: by decoupling our application-business code from the tools we are using (i.e. the libraries and frameworks), we make it less vulnerable to the erosion of time and yet another framework fads

* Testability: The usage of ports and adapters to communicate with all our infrastructure (e.g. db, messaging systems, etc) eases the usage of mocks in order to test our applicative services and domain code. Tests could even be written for our application service layer before we decide which technology to be plugged with its corresponding port/adapter (whether REST, SOAP, specific messaging, db, etc)

> The [Boundaries](https://www.youtube.com/watch?v=eOYal8elnZk) video is a great talk on the value of applying the principals and how it improves automated testing.

* Adaptability / Time to market: adding a new way to interact with your application is very easy: you just add a new port/adapter to support this new technology and that's it! You can usually have multiple ways or technologies to interact with your application

* Understandability: Rather than having a solution where use cases are completely lost or mixed within all the technical stuff, this architecture style states the emergence of an applicative-use-case-layer (with all your use case handlers in a dedicated module). The proper location to make our functional intentions stand out.

* Use case driven & [DDD](http://en.wikipedia.org/wiki/Domain-driven_design) compliance:  Indeed, with this architecture style, we design our applications with our use cases in mind; not the number of persistence technologies or binding types we will need to support! Decisions about the choice of frameworks or tools to be used should be deferred until the underlying business goal is understood.

### Command-Query Responsibility Segregation (CQRS)

Separate write operations (commands) from reads (queries).

### Scaling Hexagonal Architecture with Microservices

The term "Microservice Architecture" has sprung up over the last few years to describe a particular way of designing software applications as suites of independently deployable services. This approach is an excellent way to apply the hexagonal architecture to an application such that it can scale over time but maintain the characteristics of maintainability and extensibility.

## <a name="microservices"></a>Microservices Described
Microservice Architecture is an architectural concept that aims to decouple a solution by decomposing functionality into discrete independently deployable services. Think of it as applying many of the principles of [SOLID](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design) at an architectural level, instead of classes you've got services.

In short, the microservice architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

### Characteristics of the Microservice Architecture

As with any definition that outlines common characteristics, not all microservice architectures have all the characteristics described below, but we do expect that most microservice architectures exhibit most characteristics.

* [Services vs Componentization](#components)
* [Smart endpoints and dumb pipes](#endpoints)
* [Decentralized Data Management](#decentralized_data)
* [Infrastructure Automation](#automation)

#### <a name="components"></a>Services vs Componentization
Microservice architectures will use libraries, but their primary way of componentizing their own software is by breaking down into services. We define libraries as components that are linked into a program and called using in-memory function calls, while services are out-of-process components who communicate with a mechanism such as a web service request, or remote procedure call.

One main reason for using services as components (rather than libraries) is that services are independently deployable. If you have an application that consists of a multiple libraries in a single process, a change to any single component results in having to redeploy the entire application. But if that application is decomposed into multiple services, you can expect many single service changes to only require that service to be redeployed. That's not an absolute, some changes will change service interfaces resulting in some coordination, but the aim of a good microservice architecture is to minimize these through cohesive service boundaries and evolution mechanisms in the service contracts.

#### <a name="endpoints"></a>Smart endpoints and dumb pipes
When building communication structures between different processes, many products and approaches stress putting significant smarts into the communication mechanism itself. A good example of this is the Enterprise Service Bus (ESB), where ESB products often include sophisticated facilities for message routing, choreography, transformation, and applying business rules.

The microservice architectures favor an alternative approach: smart endpoints and dumb pipes. Applications built from microservices aim to be as decoupled and as cohesive as possible
* they own their own domain logic and act more as filters in the classical Unix sense
* receiving a request, applying logic as appropriate and producing a response.

These are choreographed using simple RESTish protocols rather than complex protocols such as WS-Choreography or BPEL or orchestration by a central tool.

The second approach in common use is messaging over a lightweight message bus. The infrastructure chosen is typically dumb (dumb as in acts as a message router only) - simple implementations such as RabbitMQ or ZeroMQ don't do much more than provide a reliable asynchronous fabric - the smarts still live in the end points that are producing and consuming messages; in the services.

#### <a name="decentralized_data"></a>Decentralized Data Management
Decentralization of data management, at the most abstract level, means that the conceptual model of the world will differ between systems. This is a common issue when integrating across a large enterprise, the sales view of a customer will differ from the support view.

As well as decentralizing decisions about conceptual models, microservices also decentralize data storage decisions.  Microservices prefer letting each service manage its own database, either different instances of the same database technology, or entirely different database systems.

#### <a name="automation"></a>Infrastructure Automation

Many of the products or systems being built with microservices are being built by teams with extensive experience of Continuous Delivery and it's precursor, Continuous Integration. Teams building software this way make extensive use of infrastructure automation techniques.

Since this isn't an article on Continuous Delivery we will call attention to just a couple of key features here. We want as much confidence as possible that our software is working, so we run lots of automated tests. Promotion of working software 'up' the pipeline means we automate deployment to each new environment.
