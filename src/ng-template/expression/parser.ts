import { tokenizer, InvalidToken, Token } from "./tokenizer";

export class ParserException extends Error {
  constructor( message: string ) {
    super( message );
    this.name = "NgTemplateParserException",
    this.message = message;
  }
}

export class Parser {

  static split( expr: string ): string[] {
    let re = /(\+|\-|\<|\>|===|==|\!==|\!=|\&\&|\|\|)/;

    return expr
      .split( re )
      .map( ( i: string ) => i.trim() )
      .filter( ( i: string ) => Boolean( i ))
  }

  static parse( expr: string ): Token[] {
    let reQuote: RegExp = /[\'\"]/i;
    // If it has a string, too risky to parse for composite
    if ( reQuote.test( expr ) ) {
      let token: Token = tokenizer( expr );
      return token instanceof InvalidToken ? [] : [ token ];
    }
    let com = Parser.split( expr );
    // case 3: foo + bar
    // case 1: foo (no operators found)
    if ( com.length !== 3 && com.length !== 1 ) {
      return [];
    }
    return com.map( ( i: string ) => tokenizer( i ) );
  }
}
