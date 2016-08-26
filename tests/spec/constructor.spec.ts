import { NgTemplate } from "../../src/ngtemplate";

export default function ConstructorSpec(){
  describe("Constructor", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });
    describe("Options", function(){

      it( "invokes the passed callbacks", function() {
        var called: string[] = [];
        NgTemplate
          .factory( this.el, `<i data-ng-text="foo"></i>`, {
            willMount: function(){
              called.push( "willMount" );
            },
            didMount: function(){
              called.push( "didMount" );
            }
          })
          .sync({ foo: "foo" });
          expect( called ).toContain( "willMount" );
          expect( called ).toContain( "didMount" );

      });
    });

  });
}