"use strict";
var exception_1 = require("./exception");
function evaluate(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var func, code = generateCode(expr, wrapper);
    try {
        eval(code);
    }
    catch (e) {
        throw new exception_1.Exception("Invalid ng* expression " + expr);
    }
    return func;
}
exports.evaluate = evaluate;
;
function generateCode(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    return "\nfunc = function( data ){\n  var cb,\n      code,\n      keys = Object.keys( data ),\n      vals = keys.map(function( key ){\n        return data[ key ];\n      }),\n      __toArray = function(){\n        return [].slice.call( arguments );\n      };\n\n\n  try {\n    code = \"cb = function(\" + keys.join(\",\") + \"){ return " + wrapper + "(" + expr + "); };\";\n    eval( code );\n    return cb.apply( this, vals );\n  } catch( err ) {\n    console.warn( \"Could not evaluate \" + code + \" \", err );\n    return false;\n  }\n};";
}
exports.generateCode = generateCode;
