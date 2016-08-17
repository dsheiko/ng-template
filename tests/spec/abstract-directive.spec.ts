import { AbstractDirective } from "../../src/ng-template/abstract-directive";

export default function AbstractDirectiveSpec(){

describe("NgTemplate.abstract-directive", function(){
    describe("#getDataKey", function(){
      it( "parses `foo-bar-baz`", function() {
        var res = (<any>AbstractDirective.prototype).getDataKey( "foo-bar-baz" );
        expect( res ).toBe( "fooBarBaz" );
      });
    });
    describe("#getSelector", function(){
      it( "parses `foo-bar-baz`", function() {
        var res = (<any>AbstractDirective.prototype).getSelector( "foo-bar-baz" );
        expect( res ).toBe( "[data-foo-bar-baz]" );
      });
    });
  });

}