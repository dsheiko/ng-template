import { NgTemplate } from "../../../src/ngtemplate";
export default function NgDataSpec(){

  describe("ng-data directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<button data-ng-data=\"'someKey', value\"></button>" )
          .sync({ value: "foo" })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.dataset[ "someKey" ] ).toBe( "foo" );
          })
          .sync({ value: "bar" })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.dataset[ "someKey" ] ).toBe( "bar" );
          });

      });

       it( "processes repeating directives", function() {
        NgTemplate
          .factory( this.el, `<span
            data-ng-data="'lang', 'en'"
            data-ng-data-0="'title', 'title'"
            data-ng-data-8="'dir', 'auto'"></span>` )
          .sync({  })
          .pipe(( el: HTMLElement ) => {
            let target =  el.firstChild as HTMLElement;
            expect( target.dataset[ "lang" ] ).toBe( "en" );
            expect( target.dataset[ "title" ] ).toBe( "title" );
            expect( target.dataset[ "dir" ] ).toBe( "auto" );
          });
      });

    });
}