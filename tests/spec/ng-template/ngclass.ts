import { NgTemplate } from "../../../src/ngtemplate";
export default function NgClassSpec(){

  describe("ng-class directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-class=\"'is-hidden', isHidden\"></span>" )
          .sync({ isHidden: true })
          .pipe(( el: HTMLElement ) => {
            expect( el.innerHTML ).toBe( "<span class=\"is-hidden\"></span>" );
          });
      });

    });
}