var assert = require('chai').assert;

const CsvTransformer = require('../../src/Transformers/CsvTransformer');

describe('CsvTransformer', function () {
    it('should return a well formed csv string', function () {
        var expected = "first_name,last_name\nFrancesco,Malatesta\nJohn,Foo Bar";
        assert.equal(expected, CsvTransformer([
            {
                "first_name": "Francesco",
                "last_name": "Malatesta"
            },
            {
                "first_name": "John",
                "last_name": "Foo Bar"
            }
        ]));
    });
});
