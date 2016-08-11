"use strict";
var exception_1 = require("./exception");
/**
 * Removes leading negotiation
 */
function removeNegotiation(expr) {
    var re = /^\!\s*/;
    return expr.replace(re, "");
}
exports.removeNegotiation = removeNegotiation;
/**
 * Return true of expression can be used as a path e.g. foo.bar.baz.quiz
 */
function isParsableExpr(expr) {
    var re = /^[a-zA-Z_\$][a-zA-Z0-9\._\$]+$/;
    return re.test(expr);
}
exports.isParsableExpr = isParsableExpr;
/**
 * Find value in nested object by a specified path e.g. foo.bar.baz.quiz
 */
function findValue(path, data) {
    var value = data;
    path.split("\.").forEach(function (key) {
        if (!(key in value)) {
            throw new exception_1.Exception("Cannot resolve path " + path);
        }
        value = value[key];
    });
    return value;
}
exports.findValue = findValue;
function getWrapperFunction(fnName, toArray) {
    return fnName === "__toArray" ? toArray : window[fnName];
}
exports.getWrapperFunction = getWrapperFunction;
function evaluate(exprRaw, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var func, expr = exprRaw.trim(), positiveExpr = removeNegotiation(expr), 
    // make available in the closure
    __toArray = function () {
        return [].slice.call(arguments);
    };
    if (!expr.length) {
        return function () {
            return "";
        };
    }
    if (isParsableExpr(positiveExpr)) {
        return function (data) {
            var exprVal = findValue(positiveExpr, data), val = positiveExpr === expr ? exprVal : !exprVal;
            if (!wrapper) {
                return val;
            }
            var wrapFn = getWrapperFunction(wrapper, __toArray);
            return wrapFn(val);
        };
    }
    try {
        func = function (data) {
            var cb, code, keys = Object.keys(data), vals = keys.map(function (key) {
                return data[key];
            });
            try {
                code = "cb = function(" + keys.join(",") + ("){ return " + wrapper + "(" + expr + "); };");
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
