var evaluate = require( "../../dist/directives/expression" ).evaluate;

describe("core.Template.expression", function(){

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