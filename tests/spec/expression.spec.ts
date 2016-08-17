import { evaluate, findValue, isParsableExpr, removeNegotiation, getWrapperFunction,
    isNumber, isBool, isString, propValueReference } from "../../src/ng-template/expression";

export default function ExpressionSpec(){
  describe("NgTemplate.expression", function(){

    it( "evaluates fn({ foo: true }) => true", function() {
      var fn = evaluate( "foo", "Boolean" );
      expect( fn({ foo: true }) ).toBe( true );
    });
    it( "evaluates fn({ foo: false }) => false", function() {
      var fn = evaluate( "foo", "Boolean" );
      expect( fn({ foo: false }) ).toBe( false );
    });

    it( "evaluates fn({ foo: 'foo' }) => foo", function() {
      var fn = evaluate( "foo", "String" );
      expect( fn({ foo: "foo" }) ).toBe(  "foo" );
    });

    it( "evaluates fn({ foo: 'foo' }) => 'foo'", function() {
      var fn = evaluate( "foo", "String" );
      expect( fn({ foo: "'foo'" }) ).toBe(  "'foo'" );
    });

  });

  describe("NgTemplate.findValue", function(){

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
      val = findValue( "foo.bar.baz.quiz" , data );
      expect( val ).toBe(  "quiz" );
    });
  });

  describe("NgTemplate.isParsableExpr", function(){
    it( "tests foo.bar.baz.quiz", function() {
      var val = isParsableExpr( "foo.bar.baz.quiz" );
      expect( val ).toBe( true );
    });
    it( "tests $some100_", function() {
      var val = isParsableExpr( "$some100_" );
      expect( val ).toBe( true );
    });
    it( "tests foo.bar + baz.quiz", function() {
      var val = isParsableExpr( "foo.bar + baz.quiz" );
      expect( val ).toBe( false );
    });
  });

  describe("NgTemplate.removeNegotiation", function(){
    it( "tests !foo.bar.baz.quiz", function() {
      var val = removeNegotiation( "!foo.bar.baz.quiz" );
      expect( val ).toBe(  "foo.bar.baz.quiz" );
    });
    it( "tests !  foo.bar.baz.quiz", function() {
      var val = removeNegotiation( "!  foo.bar.baz.quiz" );
      expect( val ).toBe(  "foo.bar.baz.quiz" );
    });
     it( "tests foo.bar.baz.quiz", function() {
      var val = removeNegotiation( "foo.bar.baz.quiz" );
      expect( val ).toBe(  "foo.bar.baz.quiz" );
    });
  });

  describe("NgTemplate.propValueReference", function(){
    it( "tests 'prop',variable", function() {
      var fn = propValueReference( "'prop'", "variable" ),
          ret = fn({ variable: "foo" });
      expect( ret.join(",") ).toBe(  "prop,foo" );
    });
    it( "tests 'prop',variable", function() {
      var fn = propValueReference( "'prop'", "foo.bar.baz" ),
          ret = fn({ foo: {
              bar: {
                baz: "baz"
              }
          }});
      expect( ret.join(",") ).toBe(  "prop,baz" );
    });
  });


  describe("NgTemplate.getWrapperFunction", function(){
    it( "tests Boolean", function() {
      var ret = getWrapperFunction( "Boolean" );
      expect( ret ).toBe(  Boolean );
    });
  });

  describe("NgTemplate.isNumber", function(){
    it( "tests 12345", function() {
      var ret = isNumber( "12345" );
      expect( ret ).toBe( true );
    });
    it( "tests var12345", function() {
      var ret = isNumber( "var12345" );
      expect( ret ).toBe( false );
    });
    it( "tests 122 + 12345", function() {
      var ret = isNumber( "122 + 12345" );
      expect( ret ).toBe( false );
    });
  });

  describe("NgTemplate.isBool", function(){
    it( "tests true", function() {
      var ret = isBool( "true" );
      expect( ret ).toBe( true );
    });
    it( "tests false", function() {
      var ret = isBool( "false" );
      expect( ret ).toBe( true );
    });
    it( "tests 12345", function() {
      var ret = isBool( "12345" );
      expect( ret ).toBe( false );
    });
  });

  describe("NgTemplate.isString", function(){
    it( "tests 'string'", function() {
      var ret = isString( "'string'" );
      expect( ret ).toBe( true );
    });
    it( "tests \"string\"", function() {
      var ret = isString( "\"string\"" );
      expect( ret ).toBe( true );
    });
    it( "tests 'string' + 'string'", function() {
      var ret = isString( "'string' + 'string'" );
      expect( ret ).toBe( false );
    });
    it( "tests 123", function() {
      var ret = isString( "123" );
      expect( ret ).toBe( false );
    });
    it( "tests var", function() {
      var ret = isString( "var" );
      expect( ret ).toBe( false );
    });
  });
}