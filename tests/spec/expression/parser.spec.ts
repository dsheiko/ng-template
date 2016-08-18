import { Parser } from "../../../src/ng-template/expression/parser";
import { ReferenceToken, OperatorToken, NumberToken, StringToken, BooleanToken } from "../../../src/ng-template/expression/tokenizer";

export default function ParserSpec(){
  describe( "Parser", function(){
    describe( ".split", function(){

      it( "parses by Arithmetic operators (+/-)", function() {
        let expr = 'foo + bar.baz - 10',
            res = Parser.split( expr );
        expect( res ).toContain( "foo" );
        expect( res ).toContain( "bar.baz" );
        expect( res ).toContain( "10" );
        expect( res ).toContain( "+" );
        expect( res ).toContain( "-" );
      });

      it( "parses by Relational operators (</>)", function() {
        let expr = 'foo > bar.baz < 10',
            res = Parser.split( expr );
        expect( res ).toContain( "foo" );
        expect( res ).toContain( "bar.baz" );
        expect( res ).toContain( "10" );
        expect( res ).toContain( ">" );
        expect( res ).toContain( "<" );
      });

       it( "parses by Equality operators (===/!==/==/!=)", function() {
        let expr = 'foo === bar.baz !== 10 == 100 != false',
            res = Parser.split( expr );

        expect( res ).toContain( "foo" );
        expect( res ).toContain( "bar.baz" );
        expect( res ).toContain( "10" );
        expect( res ).toContain( "==" );
        expect( res ).toContain( "!==" );
        expect( res ).toContain( "==" );
        expect( res ).toContain( "!=" );
        expect( res ).toContain( "100" );
        expect( res ).toContain( "false" );
      });

      it( "parses by Binary logical operators (&&/||)", function() {
        let expr = 'foo && bar.baz || 10',
            res = Parser.split( expr );
        expect( res ).toContain( "foo" );
        expect( res ).toContain( "bar.baz" );
        expect( res ).toContain( "10" );
        expect( res ).toContain( "&&" );
        expect( res ).toContain( "||" );
      });

      it( "return a single element for not parsable", function() {
        let expr = 'foo.bar.baz',
            res = Parser.split( expr );
        expect( res.length ).toBe( 1 );
      });

    });


    describe( ".parse", function(){

      it( "tokenizes simple expression", function() {
        let expr = 'foo + 100',
            res = Parser.parse( expr );
        expect( res.length ).toBe( 3 );
        expect( res.shift() instanceof ReferenceToken ).toBe( true );
        expect( res.shift() instanceof OperatorToken ).toBe( true );
        expect( res.shift() instanceof NumberToken ).toBe( true );
      });

      it( "tokenizes simple expression with string", function() {
        let expr = `foo + "bar"`,
            res = Parser.parse( expr );

        expect( res.length ).toBe( 3 );
        expect( res.shift() instanceof ReferenceToken ).toBe( true );
        expect( res.shift() instanceof OperatorToken ).toBe( true );
        expect( res.shift() instanceof StringToken ).toBe( true );
      });

      it( "tokenizes simple expression with boolean", function() {
        let expr = `foo && true`,
            res = Parser.parse( expr );
        expect( res.length ).toBe( 3 );
        expect( res.shift() instanceof ReferenceToken ).toBe( true );
        expect( res.shift() instanceof OperatorToken ).toBe( true );
        expect( res.shift() instanceof BooleanToken ).toBe( true );
      });

      it( "rejects 4+ members", function() {
        let expr = 'foo + 100 + bar',
            res = Parser.parse( expr );
        expect( res.length ).toBe( 0 );
      });

      it( "rejects 2 members", function() {
        let expr = 'foo +',
            res = Parser.parse( expr );
        expect( res.length ).toBe( 0 );
      });

      it( "rejects with a string that contains expression", function() {
        let expr = `foo + "bar + baz"`,
            res = Parser.parse( expr );
        expect( res.length ).toBe( 0 );
      });


      it( "exists early on a string", function() {
        let expr = `"string"`,
            res = Parser.parse( expr );
        expect( res.shift() instanceof StringToken ).toBe( true );
      });

      it( "exists early on a spaced string", function() {
        let expr = ` "string" `,
            res = Parser.parse( expr );
        expect( res.shift() instanceof StringToken ).toBe( true );
      });


    });
  });

}