function evaluate(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var func, code = generateCode(expr, wrapper);
    try {
        eval(code);
    }
    catch (e) {
        console.log(e);
        throw new EvalError("Invalid ng* expression " + expr);
    }
    return func;
}
exports.evaluate = evaluate;
;
function generateCode(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    return "\nvar func = function( data ){\n  var keys = Object.keys( data ),\n      vals = keys.map(function( key ){\n        return data[ key ];\n      }),\n      __toArray = function(){\n        return [].slice.call( arguments );\n      };\n  eval(\"var cb = function(\" + keys.join(\",\") + \"){ return " + wrapper + "(" + expr + "); };\");\n  return cb.apply( this, vals );\n};";
}
