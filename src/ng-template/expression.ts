import { Exception } from "./exception";

export function evaluate( expr: string, wrapper: string = "" ){
    let func: Function,
        code: string = generateCode( expr, wrapper );
    try {
      eval( code );
    } catch ( e ) {
      throw new Exception( `Invalid ng* expression ${expr}` );
    }
    return func;
};

export function generateCode( expr: string, wrapper: string = "" ): string{
  return `
func = function( data ){
  var cb,
      code,
      keys = Object.keys( data ),
      vals = keys.map(function( key ){
        return data[ key ];
      }),
      __toArray = function(){
        return [].slice.call( arguments );
      };


  try {
    code = "cb = function(" + keys.join(",") + "){ return ${wrapper}(${expr}); };";
    eval( code );
    return cb.apply( this, vals );
  } catch( err ) {
    console.warn( "Could not evaluate " + code + " ", err );
    return false;
  }
};`;
}

