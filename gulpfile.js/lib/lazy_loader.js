'use strict';

var Path = require('path');

// Lazy Loader
var LL = {
    internals: {},
    set: function(name, path) {
        if (path.indexOf('.') === 0) {
            path = Path.resolve(path);
        }

        this.internals[name] = {
            path: path,
            requirement: null,
        };

        Object.defineProperty(this, name, {
            get: function() {
                var internal = this.internals[name];
                var requirement = internal.requirement;
                if (!requirement) {
                    requirement = internal.requirement = require(internal.path);
                }
                return requirement;
            },
        });
    },
    setMulti: function(params) {
        var propertys = Object.keys(params);
        for (var i = propertys.length - 1; i >= 0; i--) {
            var property = propertys[i];
            this.set(property, params[property]);
        }
    },
};

exports = module.exports = LL;
