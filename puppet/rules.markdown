# Rules of Thumb
This document has some handy rules that should be read at least once in the context of writing and architecting infrastrcture code with Puppet.

1. **Do not include a class inside a class of another module except in the profile and role modules.**
	* Modules should be atomic: *Modules should configure a service or thing and that thing only.*
	* Including a class of an external module is indication that it should be a profile, not an atomic module. 
