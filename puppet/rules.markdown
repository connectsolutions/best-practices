# Rules of Thumb
This document has some handy rules that should be read at least once in the context of writing and architecting infrastrcture code with Puppet.

1. **Do not include a class inside a class of another module except in the profile and role modules.**
	* Modules should be atomic: *Modules should configure a service or thing and that thing only.*
	* Including a class of an external module is indication that it should be a profile, not an atomic module. 

2. **Do not use hiera lookups in atomic modules:** Modules should be modular, they should not ship with defualt values in their params.pp and should require any extra configuration to run out of the box. Hiera data should override these default values when you declare them in a given profile. 

3. **Defition of "IT'S WORKING":** 
	* You can clone either the module or the monolithic repo in which the module resides, and the data for that module (puppet-configuration) onto a machine that has the puppet agent installed, classify that node with the it's role and the code runs, without error, and post-run checks for services being up and everything else check out. 
