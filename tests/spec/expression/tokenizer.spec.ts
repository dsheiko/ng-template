import { tokenizer, StringToken, BooleanToken,
  NumberToken, OperatorToken, ReferenceToken } from "../../../src/ng-template/expression/tokenizer";

export default function TokenizerSpec(){
  describe( "Tokenizer", function(){
    describe( "factory", function(){
      it( "recognizes a string single-quoted", function() {
        let expr = `'string'`,
            res = tokenizer( expr );
        expect( res instanceof StringToken ).toBe( true );
      });

    });

    describe( "StringToken", function(){
      describe( ".valid", function(){
        it( "recognizes a string single-quoted", function() {
          let expr = `'string'`;
          expect( StringToken.valid( expr ) ).toBe( true );
        });
        it( "recognizes a string double-quoted", function() {
          let expr = `"string"`;
          expect( StringToken.valid( expr ) ).toBe( true );
        });
        it( "rejects not-a-string", function() {
          let expr = `100`;
          expect( StringToken.valid( expr ) ).toBe( false );
        });
      });
      describe( "#resolveValue", function(){
        it( "resolves pure", function() {
          let expr = `'string'`,
              token = new StringToken( expr ),
              res = token.resolveValue({});
          expect( res ).toBe( "string" );
        });
        // string has no effect for negated
      });
    });


    describe( "BooleanToken", function(){
      describe( ".valid", function(){
        it( "recognizes true", function() {
          let expr = `true`;
          expect( BooleanToken.valid( expr ) ).toBe( true );
        });
        it( "recognizes false", function() {
          let expr = `false`;
          expect( BooleanToken.valid( expr ) ).toBe( true );
        });
        it( "rejects not-a-boolean", function() {
          let expr = `100`;
          expect( BooleanToken.valid( expr ) ).toBe( false );
        });
      });
      describe( "#resolveValue", function(){
        it( "resolves pure", function() {
          let expr = `true`,
              token = new BooleanToken( expr ),
              res = token.resolveValue({});
          expect( res ).toBe( true );
        });
        it( "resolves negated", function() {
          let expr = `true`,
              token = new BooleanToken( expr, true ),
              res = token.resolveValue({});
          expect( res ).toBe( false );
        });
      });
    });


    describe( "NumberToken", function(){
      describe( ".valid", function(){
        it( "recognizes 100", function() {
          let expr = `100`;
          expect( NumberToken.valid( expr ) ).toBe( true );
        });
        it( "recognizes 001", function() {
          let expr = `001`;
          expect( NumberToken.valid( expr ) ).toBe( true );
        });
        it( "rejects NaN", function() {
          let expr = `var`;
          expect( NumberToken.valid( expr ) ).toBe( false );
        });
        it( "rejects var100", function() {
          let expr = `var100`;
          expect( NumberToken.valid( expr ) ).toBe( false );
        });
      });
      describe( "#resolveValue", function(){
        it( "resolves pure", function() {
          let expr = `100`,
              token = new NumberToken( expr ),
              res = token.resolveValue({});
          expect( res ).toBe( 100 );
        });
        it( "resolves negated", function() {
          let expr = `1`,
              token = new NumberToken( expr, true ),
              res = token.resolveValue({});
          expect( Boolean( res ) ).toBe( false );
        });
      });
    });


     describe( "OperatorToken", function(){
      describe( ".valid", function(){
        it( "recognizes +", function() {
          let valid = [ "+", "-", "<", ">", "===", "==", "!==", "!=", "&&", "||" ];
          valid.forEach(( expr: string ) => {
            expect( OperatorToken.valid( expr ) ).toBe( true );
          });
        });
        it( "rejects not-a-boolean", function() {
          let expr = `nope`;
          expect( OperatorToken.valid( expr ) ).toBe( false );
        });
      });
    });


    describe( "ReferenceToken", function(){
      describe( ".valid", function(){
        it( "recognizes foo", function() {
          let expr = `foo`;
          expect( ReferenceToken.valid( expr ) ).toBe( true );
        });
        it( "recognizes foo.bar.baz", function() {
          let expr = `foo.bar.baz`;
          expect( ReferenceToken.valid( expr ) ).toBe( true );
        });
        it( "rejects not-a-ref", function() {
          let expr = `100`;
          expect( ReferenceToken.valid( expr ) ).toBe( false );
        });
        it( "rejects any in context of this", function() {
          let expr = `this.foo`;
          expect( ReferenceToken.valid( expr ) ).toBe( false );
        });
      });
      describe(".findValue", function(){
        it( "finds value in nested object by a specified path e.g. foo.bar.baz.quiz", function() {
          var data = {
            foo: {
              bar: {
                baz: {
                  quiz: "quiz"
                }
              }
            }
          },
          val = ReferenceToken.findValue( "foo.bar.baz.quiz" , data );
          expect( val ).toBe(  "quiz" );
        });
      });
      describe( "#resolveValue", function(){
        it( "resolves pure foo", function() {
          let expr = `foo`,
              token = new ReferenceToken( expr ),
              res = token.resolveValue({ foo: true });
          expect( res ).toBe( true );
        });
        it( "resolves pure foo.bar", function() {
          let expr = `foo.bar`,
              token = new ReferenceToken( expr ),
              res = token.resolveValue({ foo: { bar: true }});
          expect( res ).toBe( true );
        });
        it( "resolves negated", function() {
          let expr = `foo`,
              token = new ReferenceToken( expr, true ),
              res = token.resolveValue({ foo: true });
          expect( res ).toBe( false );
        });
      });
    });



  });

}