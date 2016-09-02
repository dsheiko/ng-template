import { NgTemplate } from "../../../src/ngtemplate";
export default function NgAttrSpec(){

   describe("ng-attr directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<input data-ng-attr=\"'required', required\">" )
          .sync({ required: true })
          .pipe(function( el: HTMLElement ){
            var input = <HTMLInputElement>el.querySelector( "input" );
            expect( input.hasAttribute( "required" ) ).toBe( true );
          })
          .sync({ required: false })
          .pipe(function( el: HTMLButtonElement ){
            var input = <HTMLInputElement>el.querySelector( "input" );
            expect( input.hasAttribute( "required" ) ).toBe( false );
          });

      });

    });
}