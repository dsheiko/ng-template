import { NgTemplate } from "../../../src/ngtemplate";
export default function ReportSpec(){

  describe("#report", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement (general)", function() {
      let report = NgTemplate
        .factory( this.el, "<span data-ng-text=\"foo.bar.baz\"></span>" )
        .sync({ foo: 10 })
        .report();

      expect( report.log.length ).toBe( 1 );
    });
    it( "evaluates the statement (ngFor)", function() {
      let report = NgTemplate
        .factory( this.el, "<span data-ng-for=\"let item of foo.bar.baz\"></span>" )
        .sync({})
        .report();

      expect( report.log.length ).toBe( 1 );
    });
  });

}