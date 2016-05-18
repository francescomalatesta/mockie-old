var assert = require('chai').assert;

const JsonTransformer = require('../../../src/Transformers/JsonTransformer');

describe('JsonTransformer', function () {
    it('should return a well formed json string', function () {
        assert.equal('[{"first_name":"Francesco","last_name":"Malatesta"},{"first_name":"John","last_name":"Foo Bar"}]', JsonTransformer([
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
