import { NgTemplate } from "../../../src/ngtemplate";
export default function NgIfSpec(){

  describe("ng-if directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "removes the target from the DOM when expression is false", function() {
      NgTemplate
        .factory( this.el, "<span data-ng-if=\"invalid\">Error</span>" )
        .sync({ invalid: false })
        .pipe(( el: HTMLElement ) => {
            // changed to: <ng style="display: none; "></ng>
            expect( el.innerHTML ).not.toMatch( "Error" );
            expect( el.innerHTML ).toMatch( "display" );
        });
    });

    it( "restores the target after removal when expression changes", function(){
      NgTemplate
        .factory( this.el, "<span data-ng-if=\"invalid\">Error</span>" )
        .sync({ invalid: false })
        .pipe(( el: HTMLElement ) => {
          expect( el.innerHTML.indexOf( "Error" ) === -1 ).toBe( true );
         }, this )
        .sync({ invalid: true })
        .pipe(( el: HTMLElement ) => {
          expect( el.innerHTML.indexOf( "Error" ) !== -1 ).toBe( true );
        });
    });

    it( "evaluates compoun expressions (foo > bar)", function() {
      NgTemplate
        .factory( this.el, "<span data-ng-if=\"foo > bar\">Error</span>" )
        .sync({ foo: 10, bar: 0 });
      expect( this.el.innerHTML ).toMatch( "Error" );
    });

    it( "evaluates compoun expressions (foo < bar)", function() {
      NgTemplate
        .factory( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
        .sync({ foo: 10, bar: 0 });
      expect( this.el.innerHTML ).not.toMatch( "Error" );
    });

  });
}