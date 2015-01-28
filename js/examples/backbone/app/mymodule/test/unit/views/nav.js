define(function(require) {
    var testPath = 'mymodule/views/nav';

    var should = require('chai').should();

    var UnderTest = require(testPath);

    describe(testPath, function() {

        beforeEach(function() {
            this.underTest = new UnderTest();
        });

        it('Exists', function() {
            should.exist(this.underTest);
        });

    });
});
