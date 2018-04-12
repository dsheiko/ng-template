import { NgTemplate } from "../../../src/ngtemplate";
export default function NgIdSpec(){

 describe("ng-id directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-id=\"foo\"/>" )
          .sync({ foo: "bar" })
          .pipe(function( el: HTMLElement ){
            let span = <HTMLButtonElement>el.querySelector( "#bar" );
            expect( span ).toBeTruthy();
          })
      });
    });
}