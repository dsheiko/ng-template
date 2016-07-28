var AbstractDirective = require( "../../dist/directives/abstract-directive" ).AbstractDirective;

describe("NgTemplate.abstract-directive", function(){
  describe("#getDataKey", function(){
    it( "parses `foo-bar-baz`", function() {
      var res = AbstractDirective.prototype.getDataKey( "foo-bar-baz" );
      expect( res ).to.eql( "fooBarBaz" );
    });
  });
  describe("#getSelector", function(){
    it( "parses `foo-bar-baz`", function() {
      var res = AbstractDirective.prototype.getSelector( "foo-bar-baz" );
      expect( res ).to.eql( "[data-foo-bar-baz]" );
    });
  });
});