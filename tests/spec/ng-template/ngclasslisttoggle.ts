import { NgTemplate } from "../../../src/ngtemplate";
export default function NgClassListToggleSpec(){

  describe("ng-class-list-toggle directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>" )
          .sync({ isHidden: true });
        expect( this.el.innerHTML ).toBe( "<span class=\"is-hidden\"></span>" );
      });

    });
}