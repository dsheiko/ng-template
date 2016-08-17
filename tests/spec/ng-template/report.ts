import { NgTemplate } from "../../../src/ngtemplate";
export default function ReportSpec(){

  describe("#report", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      let report = NgTemplate
        .factory( this.el, "<span data-ng-text=\"foo.bar.baz\"></span>" )
        .sync({ foo: 10 })
        .report();

      expect( report.errors.length ).toBe( 1 );  
    });
  });

}