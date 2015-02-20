# ETL (Extract, Transform, Load) Processing

Node streams provide a natural design pattern for ETL. The Extract portion is a Readable stream, Transform is a Transform stream, and Load is a Write stream. Constructing these three and then using the .pipe() command accomplishes everything an ETL process needs to do.

An alternate toolset might be the use of Promises, as in the Bluebird library, but there is an important weakness to this approach: when the size of the data is unknown, as in a potentially large SQL result set, streams will push one data "item" at a time, while a promise will load them all into an array before pushing them to the next function. The potential for performance or memory problems resulting from this makes me think streams are a better solution.

### Naming Patterns

In order to clarify the purpose of individual files in an ETL process, they should be named in such a way as to clearly identify their function. Using the reader/transformer/writer appellations as part of a filename, along with some identifier for the type of data being operated on, makes it obvious to code reviewers and maintainers. Additionally, 'reader', 'transformer', and 'writer' cause the files to list in a directory in order of their function, as a result of serendipitous synergy with alphabetical order.

```
call-detail-reader.js
call-detail-transformer.js
call-detail-writer.js
```
or
```
read-call-detail.js
transform-call-detail.js
write-call-detail.js
```
The first is probably preferable, since it allows multiple types of data ETLs to be stored in the same directory and maintain a grouping that makes visual sense to the observer:

```
call-detail-reader.js
call-detail-transformer.js
call-detail-writer.js
usage-billing-reader.js
usage-billing-transformer.js
usage-billing-writer.js
```

This is not to say that a bunch of disparate ETL processes should just be lumped together in one directory, but related ones could be grouped to cut down on the directory count.

### SQL Templates

All raw SQL commands should be stored in template files in an SQL subdirectory rather than inline in the Javascript files:

```sql
DECLARE @id INT = <%= id %>
SELECT * FROM SomeTable WHERE id = @id
```

An SQL template is accessed using the filesystem's readFile command:

```javascript
var fs = require('fs');
var filename = __dirname + '/sql/something.sql';
fs.readFile(filename, function(err, data) {
  if (err) throw err;

  var sql = data.toString();

  // run the query and do whatever with the results
});
```

If the SQL query has parameters as in the example above, they can be templated with the `lodash` library:

```javascript
var fs = require('fs');
var _ = require('lodash');

var filename = __dirname + '/sql/something.sql';
fs.readFile(filename, function(err, data) {
  if (err) throw err;

  var tpl = _.template(data.toString());
  sql = tpl({
    id: searchId
  });

  // run the query and do whatever with the results
});
```

### Callbacks

Functions that take callbacks as a parameter should follow the "standard form" where the first parameter is an options block and the second parameter is a callback that takes an error as its first parameter and successful values as its second:

```javascript
var callback = function(err, data) {
  // check error
  // do stuff
};

var options = {
  parameter1: something,
  parameter2: somethingElse
};

var myFunction = function(options, callback) {
  // do stuff
  // call callback
};
```

[This blog post](http://blog.vullum.io/javascript-flow-callback-hell-vs-async-vs-highland/) has some interesting things to say about managing callback layers. Generally we should be striving to keep the layers of callbacks minimized using libraries like `async` or `highland`, or by explicitly naming functions and pulling them out of the callback nest.

Anonymous callback functions should only be used where creating them makes it easier to follow the flow of the program than naming them would do.  For example, in the following code:

```javascript
var importUsageForDates = function(options, callback) {
  async.parallel([function(asyncCallback) {
    options.readFunction = Reader.getOutboundCalls;
    makePipeline(options, asyncCallback);
  }, function(asyncCallback) {
    options.readFunction = Reader.getInboundCalls;
    makePipeline(options, asyncCallback);
  }, function(asyncCallback) {
    options.readFunction = Reader.getOutboundConferenceCalls;
    makePipeline(options, asyncCallback);
  }, function(asyncCallback) {
    options.readFunction = Reader.getInboundConferenceCalls;
    makePipeline(options, asyncCallback);
  }], callback);

};
```

Naming each of the `async` array functions would be unwieldy and confusing, but including the body of the `makePipeline` function in each layer would make the whole thing messier and harder to understand.
