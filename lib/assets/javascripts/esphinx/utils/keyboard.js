var
    esPhinx;

(function($) {
    "use strict";

    $.extend({

        deleteKeysPattern: function() {
            var
                stringPattern = "",

                callback = function(key) {
                    stringPattern += key + "|";
                };

            ["Backspace", "Delete"].forEach(callback);

            return stringPattern.slice(0, stringPattern.length -1);
        },

        functionKeysPattern: function() {
            var
                stringPattern = "",
                i = 0;

            while (i++ <= 11) {
                if(i < 12) {
                    stringPattern += "F" + i + "|";
                } else {
                    stringPattern += "F" + i;
                }
            }

            return stringPattern.slice(0, stringPattern.length -1);
        },

        editKeysPattern: function() {
            var
                stringPattern = "",

                callback = function(key) {
                    stringPattern += key + "|";
                };

            ["Enter", "Insert"].forEach(callback);

            return stringPattern.slice(0, stringPattern.length -1);
        },

        modifierKeysPattern: function() {
            var
                stringPattern = "",

                callback = function(key) {
                    stringPattern += key + "|";
                };

            ["Shift", "Control", "Alt", "AltGraph"].forEach(callback);

            return stringPattern.slice(0, stringPattern.length -1);
        },

        navigationKeysPattern: function() {
            var
                stringPattern = "",

                directionalIteratorBlock = function(key) {
                    stringPattern += "Arrow" + key + "|";
                },

                horizontalDirectionalIteratorBlock = function(key) {
                    stringPattern += "Page" + key + "|";
                },

                callback = function(key) {
                    stringPattern += key + "|";
                };

            ["Left", "Right", "Up", "Down"].forEach(directionalIteratorBlock);

            ["Up", "Down"].forEach(horizontalDirectionalIteratorBlock);

            ["Home", "End"].forEach(callback);

            return stringPattern.slice(0, stringPattern.length -1);
        },

        systemKeysPattern: function() {
            var
                stringPattern = "",

                callback = function(key) {
                    stringPattern += key + "|";
                };

            ["Escape", "Pause"].forEach(callback);

            return stringPattern.slice(0, stringPattern.length -1);
        },

        nonCharacterKeysPattern: function() {
            return $.systemKeysPattern() + "|" + $.navigationKeysPattern() +
              "|" + $.modifierKeysPattern() + "|" + $.editKeysPattern() + "|" +
              $.functionKeysPattern();
        }

    });

})(esPhinx);