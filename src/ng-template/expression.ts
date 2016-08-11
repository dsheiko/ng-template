import { Exception } from "./exception";

function toArray(){
  return [].slice.call( arguments );
};

export function isNumber( expr: string ){
  let re: RegExp = /^\d+$/;
  return re.test( expr );
}
export function isBool( expr: string ){
  let re: RegExp = /^(true|false)$/i;
  return re.test( expr );
}
export function isString( expr: string ){
  let single: RegExp = /^\'[^\']+\'$/i,
      double: RegExp = /^\"[^\"]+\"$/i;
  return single.test( expr ) || double.test( expr );
}


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

export function getWrapperFunction( fnName: string ){
  return fnName === "__toArray" ? toArray : (<any>window)[ fnName ];
}



function strategyReference( expr: string, wrapper: string = "" ) {
  let func: Function,
      positiveExpr = removeNegotiation( expr );

    return function( data: any ){
      let exprVal = findValue( positiveExpr, data ),
          val = positiveExpr === expr ? exprVal : !exprVal;
      if ( !wrapper ) {
        return val;
      }
      let wrapFn = getWrapperFunction( wrapper );
      return wrapFn( val );
    };

}

function strategyString( expr: string ) {
  return function(){
    // strip quotes
    return expr.substr( 1, expr.length - 2 );
  };
}

function strategyBool( expr: string ) {
  return function(){
     return expr.toUpperCase() === "TRUE";
  };
}

function strategyNumber( expr: string ) {
  return function(){
    return Number( expr );
  };
}

function strategyNull() {
  return function(){
    return "";
  };
}

export function evaluate( exprRaw: string, wrapper: string = "" ){
    let func: Function,
        expr = exprRaw.trim(),
        positiveExpr = removeNegotiation( expr ),
        // make available in the closure
        __toArray = toArray;

    if ( !expr.length ) {
      return strategyNull();
    }

    if ( isNumber( expr ) ) {
      return strategyNumber( expr );
    }

    if ( isBool( expr ) ) {
      return strategyBool( expr );
    }

    if ( isString( expr ) ) {
      return strategyString( expr );
    }

    if ( isParsableExpr( positiveExpr ) ) {
      return strategyReference( expr, wrapper );
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

