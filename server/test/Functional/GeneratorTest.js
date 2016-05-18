var assert = require('chai').assert;

const Generator = require('../../src/Generator');

describe('Generator', function () {
    var generatedItems = Generator([{ name: "first_name", type: "name.firstName" }, { name: "last_name", type: "name.lastName" }], 10);

    it('should generate an array', function () {
        assert.isArray(generatedItems, ' - valid array');
    });

    it('should contain 10 elements', function () {
        assert.equal(generatedItems.length, 10, ' - counts 10 items');
    });

    it('should contain well formed objects', function () {
        var element = generatedItems[0];

        assert.property(element, 'first_name');
        assert.property(element, 'last_name');
    });
});
