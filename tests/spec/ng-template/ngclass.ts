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

      it( "processes repeating directives", function() {
        NgTemplate
          .factory( this.el, `<span data-ng-class="'foo', foo" data-ng-class-0="'bar', bar"></span>` )
          .sync({ foo: true, bar: true  })
          .pipe(( el: HTMLElement ) => {
            let target =  el.firstChild as HTMLElement;
            expect( target.classList.contains( "foo" ) ).toBeTruthy();
            expect( target.classList.contains( "bar" ) ).toBeTruthy();
          })
          .sync({ foo: false, bar: true  })
          .pipe(( el: HTMLElement ) => {
            let target =  el.firstChild as HTMLElement;
            expect( target.classList.contains( "foo" ) ).not.toBeTruthy();
            expect( target.classList.contains( "bar" ) ).toBeTruthy();
          });
      });

      it( "processes many repeating directives", function() {
        NgTemplate
          .factory( this.el, `<span
            data-ng-class="'foo', foo"
            data-ng-class-0="'bar', bar"
            data-ng-class-8="'baz', baz"></span>` )
          .sync({ foo: true, bar: true, baz: true  })
          .pipe(( el: HTMLElement ) => {
            let target =  el.firstChild as HTMLElement;
            expect( target.classList.contains( "foo" ) ).toBeTruthy();
            expect( target.classList.contains( "bar" ) ).toBeTruthy();
            expect( target.classList.contains( "baz" ) ).toBeTruthy();
          });
      });

    });
}