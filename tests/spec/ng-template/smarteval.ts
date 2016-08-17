import { NgTemplate } from "../../../src/ngtemplate";
export default function SmartEvalSpec(){

  describe("smart evaluation", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates a number", function() {
      NgTemplate
        .factory( this.el,
            "<i data-ng-text='100'></i>" )
        .sync({})
        .pipe(function( el: HTMLElement ){
          let child = <HTMLElement>el.firstChild;
          expect( child.innerHTML ).toBe( "100" );
        });
    });
    it( "evaluates a string", function() {
      NgTemplate
        .factory( this.el,
            "<i data-ng-text='\"string\"'></i>" )
        .sync({})
        .pipe(function( el: HTMLElement ){
          let child = <HTMLElement>el.firstChild;
          expect( child.innerHTML ).toBe( "string" );
        });
    });

    it( "evaluates a boolean", function() {
      NgTemplate
        .factory( this.el,
            "<i data-ng-if='true'></i>" )
        .sync({})
        .pipe(function( el: HTMLElement ){
          expect( Boolean( el.querySelector( "i" ) ) ).toBe( true );
        });

      NgTemplate
        .factory( this.el,
            "<i data-ng-if='false'></i>" )
        .sync({})
        .pipe(function( el: HTMLElement ){
          expect( Boolean( el.querySelector( "i" ) ) ).toBe( false );
        });
    });

  });
}