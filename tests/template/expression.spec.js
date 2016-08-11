var expression = require( "../../dist/ng-template/expression" ),
    evaluate = expression.evaluate,
    findValue = expression.findValue,
    isParsableExpr = expression.isParsableExpr,
    removeNegotiation = expression.removeNegotiation,
    getWrapperFunction = expression.getWrapperFunction;

describe("NgTemplate.expression", function(){

  it( "evaluates fn({ foo: true }) => true", function() {
    var fn = evaluate( "foo", "Boolean" );
    expect( fn({ foo: true }) ).to.be.ok;
  });
  it( "evaluates fn({ foo: false }) => false", function() {
    var fn = evaluate( "foo", "Boolean" );
    expect( fn({ foo: false }) ).not.to.be.ok;
  });

  it( "evaluates fn({ foo: 'foo' }) => foo", function() {
    var fn = evaluate( "foo", "String" );
    expect( fn({ foo: "foo" }) ).to.eql( "foo" );
  });

  it( "evaluates fn({ foo: 'foo' }) => 'foo'", function() {
    var fn = evaluate( "foo", "String" );
    expect( fn({ foo: "'foo'" }) ).to.eql( "'foo'" );
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
    expect( val ).to.eql( "quiz" );
  });
});

describe("NgTemplate.isParsableExpr", function(){
  it( "tests foo.bar.baz.quiz", function() {
    var val = isParsableExpr( "foo.bar.baz.quiz" );
    expect( val ).to.be.ok;
  });
  it( "tests $some100_", function() {
    var val = isParsableExpr( "$some100_" );
    expect( val ).to.be.ok;
  });
  it( "tests foo.bar + baz.quiz", function() {
    var val = isParsableExpr( "foo.bar + baz.quiz" );
    expect( val ).to.be.not.ok;
  });
});

describe("NgTemplate.removeNegotiation", function(){
  it( "tests !foo.bar.baz.quiz", function() {
    var val = removeNegotiation( "!foo.bar.baz.quiz" );
    expect( val ).to.eql( "foo.bar.baz.quiz" );
  });
  it( "tests !  foo.bar.baz.quiz", function() {
    var val = removeNegotiation( "!  foo.bar.baz.quiz" );
    expect( val ).to.eql( "foo.bar.baz.quiz" );
  });
   it( "tests foo.bar.baz.quiz", function() {
    var val = removeNegotiation( "foo.bar.baz.quiz" );
    expect( val ).to.eql( "foo.bar.baz.quiz" );
  });
});

describe("NgTemplate.getWrapperFunction", function(){
  it( "tests Boolean", function() {
    var fn = function(){},
        ret = getWrapperFunction( "Boolean", fn );
    expect( ret ).to.eql( Boolean );
  });
  it( "tests __toArray", function() {
    var fn = function(){},
        ret = getWrapperFunction( "__toArray", fn );
    expect( ret ).to.eql( fn );
  });
});
