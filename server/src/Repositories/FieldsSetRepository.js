'use strict';

var DbEngine = require('tingodb')();

module.exports = function () {
    var db = new DbEngine.Db('/usr/src/server/.data', {});

    return {
        loadSets: function (onSuccess, onError) {
            var collection = db.collection('fields_sets');

            collection.find().toArray(function(err, sets) {
                if(err) {
                    onError(err);
                } else {
                    onSuccess(sets);
                }

                db.close();
            });
        },
        
        addSet: function (fields, name, onError, onSuccess) {
            var collection = db.collection('fields_sets');
            collection.insert({ name: name, fields: fields }, onError, onSuccess);
        }
    }
};
