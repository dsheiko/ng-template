export function evaluate( expr: string, wrapper: string = "" ){
    let func:Function,
        code:string = generateCode( expr, wrapper );
    try {
      eval( code );
    } catch( e ) {
    console.log(e);
      throw new EvalError( `Invalid ng* expression ${expr}` );
    }
    return func;
};

function generateCode( expr: string, wrapper: string = "" ):string{
  return `
var func = function( data ){
  var keys = Object.keys( data ),
      vals = keys.map(function( key ){
        return data[ key ];
      }),
      __toArray = function(){
        return [].slice.call( arguments );
      };
  eval("var cb = function(" + keys.join(",") + "){ try { return ${wrapper}(${expr}); } catch( err ) {} };");
  return cb.apply( this, vals );
};`;
}

