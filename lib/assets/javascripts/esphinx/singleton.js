// require ./support/array

"use strict";

var
    Singleton;

Singleton = (function () {

    // closure (private static attribute)
    var
        instances = [];

    return {
        new: function () {
            instances.push(arguments[0]);
        },

        instances: function () {
            return instances;
        },

        // call with apply(constructor, arguments.flatten())
        instanceExists: function () {
            var
                self = this,
                i;

            if (self instanceof Function) {
                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if ((instances[i]).object instanceof
                            self) {
                            if (arguments.flatten()
                                .isEqualTo((instances[i]).args)) {
                                return instances[i].object;
                            }
                        }

                    }
                }
            }

            return false;
        },

        destroy: function () {
            var
                self = this,
                newInstances = [],
                index;

            instances.forEach(function (v) {
                newInstances.push(v.object);
            });

            if (arguments.length) {
                index = parseInt(newInstances
                    .indexPerEquivalence(arguments[0]), 10);
            } else {
                index = parseInt(newInstances.indexPerEquivalence(self), 10);
            }


            instances.deleteByIndex(instances[index]);

            return Singleton.instances();
        }

    };

})();