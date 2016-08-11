import { Exception } from "./exception";

export function evaluate( expr: string, wrapper: string = "" ){
    let func: Function,
        // make available in the closure
        __toArray = function(){
          return [].slice.call( arguments );
        };

    try {
      func = function( data: any ){
        var cb: Function,
            code: string,
            keys = Object.keys( data ),
            vals = keys.map(function( key ){
              return data[ key ];
            });

        try {
          code = "function cb(" + keys.join(",") + `){ return ${wrapper}(${expr}); };`;
          eval( code );
          return cb.apply( this, vals );
        } catch ( err ) {
          console.warn( "Could not evaluate " + code + " ", err );
          return false;
        }
      };
    } catch ( e ) {
      throw new Exception( `Invalid ng* expression ${expr}` );
    }
    return func;
};

