var assert = require('chai').assert;

const XmlTransformer = require('../../../src/Transformers/XmlTransformer');

describe('XmlTransformer', function () {
    it('should return a well formed xml string', function () {
        var expected = `<?xml version="1.0" encoding="UTF-8"?>\n<items>\n\t<item>\n\t\t<first_name>Francesco</first_name>\n\t\t<last_name>Malatesta</last_name>\n\t</item>\n\t<item>\n\t\t<first_name>John</first_name>\n\t\t<last_name>Foo Bar</last_name>\n\t</item>\n</items>`;

        assert.equal(expected, XmlTransformer([
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
