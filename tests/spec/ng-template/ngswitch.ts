import { NgTemplate } from "../../../src/ngtemplate";
export default function NgSwitchSpec(){

  describe("ng-switch/data-ng-switch-case directives", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el,
              "<div data-ng-switch='theCase'>" +
              "<i data-ng-switch-case='1'>FOO</i>" +
              "<i data-ng-switch-case='2'>BAR</i>" +
              "</div>" )
          .sync({ theCase: 1 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>FOO</i>" );
          })
          .sync({ theCase: 2 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>BAR</i>" );
          });
      });
    });

     describe("ng-switch-case-default directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el,
              "<div data-ng-switch='theCase'>" +
              "<i data-ng-switch-case='1'>FOO</i>" +
              "<i data-ng-switch-case='2'>BAR</i>" +
              "<i data-ng-switch-case-default>DEFAULT</i>" +
              "</div>" )
          .sync({ theCase: 1 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>FOO</i>" );
          })
          .sync({ theCase: 3 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>DEFAULT</i>" );
          });
      });
    });
}