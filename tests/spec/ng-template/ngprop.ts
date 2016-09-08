import { NgTemplate } from "../../../src/ngtemplate";
export default function NgPropSpec(){

   describe("ng-prop directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<button data-ng-prop=\"'disabled', isDisabled\"></button>" )
          .sync({ isDisabled: true })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.disabled ).toBe( true );
          })
          .sync({ isDisabled: false })
          .pipe(function( el: HTMLButtonElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.disabled ).toBe( false );
          });

      });

      it( "processes repeating directives", function() {
        NgTemplate
          .factory( this.el, `<span
            data-ng-prop="'lang', 'en'"
            data-ng-prop-0="'title', 'title'"
            data-ng-prop-8="'dir', 'auto'"></span>` )
          .sync({  })
          .pipe(( el: HTMLElement ) => {
            let target =  el.firstChild as HTMLElement;
            expect( target.lang ).toBe( "en" );
            expect( target.title ).toBe( "title" );
            expect( target.dir ).toBe( "auto" );
          });
      });

    });
}