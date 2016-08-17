import { NgTemplate } from "../../../src/ngtemplate";
export default function NgForSpec(){

  describe("ng-for directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "generates nodes from a plain list", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>" )
          .sync({ rows: [ "foo", "bar", "baz" ]});

        expect( this.el.querySelectorAll( "i" ).length ).toBe( 3 );
      });

      it( "generates nodes from a list of objects", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>" )
          .sync({ rows: [
            { name: "foo" },
            { name: "bar" },
            { name: "baz" }
          ]});
        expect( this.el.querySelectorAll( "i" ).length ).toBe( 3 );
        expect( this.el.querySelector( "i" ).innerHTML ).toBe( "foo" );
      });

      it( "does not fall on multiple syncs", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>" )
          .sync({ rows: [ "foo", "bar", "baz" ]})
          .sync({ rows: [ "bar", "foo", "baz" ]})
          .sync({ rows: [ "foo", "bar", "baz" ]});

        expect( this.el.querySelectorAll( "i" ).length ).toBe( 3 );
      });


      it( "generates nodes in a table", function() {
        NgTemplate
          .factory( this.el, "<table><tr data-ng-for=\"let row of rows\">" +
            "<td data-ng-text=\"row\"></td></tr></table>" )
          .sync({ rows: [ "foo", "bar", "baz" ]});
        expect( this.el.querySelectorAll( "td" ).length ).toBe( 3 );
      });


    });
}