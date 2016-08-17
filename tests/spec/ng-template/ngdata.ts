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

    });
}