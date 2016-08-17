import { NgTemplate } from "../../../src/ngtemplate";
export default function TransformSpec(){

  describe("transformers", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      NgTemplate
        .factory( this.el,
            "<div data-ng-text='transform(raw)'></div>" )
        .sync({
          raw: 100,
          transform: function( num: number ) {
            return num + "500";
          }
        })
        .pipe(function( el: HTMLElement ){
          expect( el.innerHTML ).toBe( "<div>100500</div>" );
        });
    });
  });

}