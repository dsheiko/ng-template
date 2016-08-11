"use strict";
var exception_1 = require("./exception");
function evaluate(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var func, 
    // make available in the closure
    __toArray = function () {
        return [].slice.call(arguments);
    };
    try {
        func = function (data) {
            var cb, code, keys = Object.keys(data), vals = keys.map(function (key) {
                return data[key];
            });
            try {
                code = "function cb(" + keys.join(",") + ("){ return " + wrapper + "(" + expr + "); };");
                eval(code);
                return cb.apply(this, vals);
            }
            catch (err) {
                console.warn("Could not evaluate " + code + " ", err);
                return false;
            }
        };
    }
    catch (e) {
        throw new exception_1.Exception("Invalid ng* expression " + expr);
    }
    return func;
}
exports.evaluate = evaluate;
;
