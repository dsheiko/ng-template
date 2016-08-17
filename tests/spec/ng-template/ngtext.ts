import { NgTemplate } from "../../../src/ngtemplate";
export default function NgElSpec(){

 describe("ng-text directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
          .sync({ foo: "New value" });
        expect( this.el.innerHTML ).not.toMatch( "Pristine" );
        expect( this.el.innerHTML ).toMatch( "New value" );
      });
      it( "escapes output", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
          .sync({ foo: "<button>" });
        expect( this.el.innerHTML ).not.toMatch( "<button>" );
      });
    });
}