import { Exception } from "./exception";

/**
 * Removes leading negotiation
 */
export function removeNegotiation( expr: string ){
  let re: RegExp = /^\!\s*/;
  return expr.replace( re, "" );
}
/**
 * Return true of expression can be used as a path e.g. foo.bar.baz.quiz
 */
export function isParsableExpr( expr: string ){
  let re: RegExp = /^[a-zA-Z_\$][a-zA-Z0-9\._\$]+$/;
  return re.test( expr );
}
/**
 * Find value in nested object by a specified path e.g. foo.bar.baz.quiz
 */
export function findValue( path: string, data: NgTemplate.DataMap ): string | number | boolean {
  let value: any = data;
  path.split( "\." ).forEach(( key: string ) => {
    if ( !( key in value ) ) {
      throw new Exception( `Cannot resolve path ${path}` );
    }
    value = value[ key ];
  });
  return value;
}


export function getWrapperFunction( fnName: string, toArray: Function ){
  return fnName === "__toArray" ? toArray : (<any>window)[ fnName ];
}

export function evaluate( exprRaw: string, wrapper: string = "" ){
    let func: Function,
        expr = exprRaw.trim(),
        positiveExpr = removeNegotiation( expr ),
        // make available in the closure
        __toArray = function(){
          return [].slice.call( arguments );
        };

    if ( !expr.length ) {
      return function(){
        return "";
      };
    }
    if ( isParsableExpr( positiveExpr ) ) {
      return function( data: any ){
        let exprVal = findValue( positiveExpr, data ),
            val = positiveExpr === expr ? exprVal : !exprVal;
        if ( !wrapper ) {
          return val;
        }
        let wrapFn = getWrapperFunction( wrapper, __toArray );
        return wrapFn( val );
      };
    }

    try {
      func = function( data: any ){
        var cb: Function,
            code: string,
            keys = Object.keys( data ),
            vals = keys.map(function( key ){
              return data[ key ];
            });

        try {
          code = "cb = function(" + keys.join(",") + `){ return ${wrapper}(${expr}); };`;
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

