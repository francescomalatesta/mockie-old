var assert = require('chai').assert;
var expect = require('chai').expect;

const Transformer = require('../../src/Transformer');

describe('Transformer', function () {
    var generatedData = [{ first_name: "Francesco", last_name: "Malatesta" }];

    it('should resolve the transformation strategy in the right way', function () {
        var transformedData = Transformer(generatedData, 'json');

        assert.equal(transformedData, JSON.stringify(generatedData));
    });

    it('should throw an error if the transformation strategy does not exist', function () {
        expect(Transformer).to.throw(Error);
        
        Transformer(generatedData, 'json');
    });
});
