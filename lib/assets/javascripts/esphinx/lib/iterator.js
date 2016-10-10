var
    Iterator;
    //Symbol;

Iterator = (function () {
    "use strict";

    var
        count = function (object, value) {
            var
                length = Object.keys(object).length;

            if (value) {
                Object.defineProperties(object, {
                    length: {
                        get: function () {
                            return length;
                        },
                        set: function (value) {
                            if (value == length) {
                                length = value;
                            }
                        }
                    }
                });
            }

            return length;
        };

    return {

        isIterable: function (object) {
          if (object) {
            //if (window.Symbol && typeof object[Symbol.iterator]) {
                 if ((typeof object == "object" ||
                    typeof object == "string") &&
                    object.hasOwnProperty("length")) {
                    return true;
              }

            }

            return false;
        },

        // each: function (enumerable, callback, recursive = false) {
        each: function (enumerable, callback, recursive) {
            var
                trail = [],
                value,
                children;

            if (Iterator.isIterable(enumerable)) {
                enumerable = Array.from(enumerable);
            }

            if (arguments[3] instanceof Array) {
                trail = arguments[3];
            }

            if (typeof callback == "boolean") {
                callback = recursive;
                recursive = arguments[1];
            }

            if (typeof recursive !== "boolean") { recursive = false; }

            // attributes not enumerable must not be counted. Because this don't use .getOwnPropertyNames() here
            Object.keys(enumerable).forEach(function (key) {
                value = enumerable[key];

                if (recursive) {

                    if (value instanceof Node) {
                        children = value.children;
                    } else if (Iterator.isIterable(value)) {
                        children = value;
                    }

                    if (children) {
                        if (children.length) {
                            callback(value, key, trail);
                            value = children;
                        }
                    }

                    if (Iterator.isIterable(value) ||
                        Object.getPrototypeOf(value) ==
                        Object.getPrototypeOf({})) {
                        // call a function recursively doesn't replace values
                        // of the current loop, neither break it, unless the return instruction is called, but just defines a new
                        // loop with a new value to be run.
                        // debugger
                        Iterator.each(value, callback, recursive,
                            trail.concat(key));
                    } else {
                        callback(value, key, trail);
                    }
                } else {
                    callback(value, key, trail);
                }

            });

        },

        asIterable: function (object) {
            var
                length = count(object),
                newObject = {};

            Object.assign(newObject, object);

            Object.defineProperties(newObject, {
                length: {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = count(object);
                        if (value == length) {
                            length = value;
                        }
                    }
                }
                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return newObject;
        },

        toIterable: function (object) {
            var
                length = count(object);

            Object.defineProperties(object, {
                length: {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = count(object);
                        if (value == length) {
                            length = value;
                        }
                    }
                }
                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return object;
        }

    };

})();