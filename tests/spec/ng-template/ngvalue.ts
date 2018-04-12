import { NgTemplate } from "../../../src/ngtemplate";
export default function NgValueSpec(){

 describe("ng-value directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el, "<input data-ng-value=\"foo\"/>" )
          .sync({ foo: "New value" })
          .pipe(function( el: HTMLElement ){
            let input = <HTMLButtonElement>el.querySelector( "input" );
            expect( input.value ).toBe( "New value" );
          })
      });
    });
}