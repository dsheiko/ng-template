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

       it( "generates nodes on structure", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of foo.bar.baz\" data-ng-text=\"row\"></i>" )
          .sync({ foo: { bar: { baz:
              [ "foo", "bar", "baz" ]
            }}
          });
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

      it( "does not break on reducing", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>" )
          .sync({ rows: [
            { name: "foo" },
            { name: "bar" },
            { name: "baz" }
          ]})
          .sync({ rows: [
            { name: "foo1" },
            { name: "bar1" }
          ]})
          .pipe(( el: HTMLElement ) => {
            let els = el.querySelectorAll( "i" );
            expect( els.length ).toBe( 2 );
            expect( els.item( 0 ).innerHTML ).toBe( "foo1" );
            expect( els.item( 1 ).innerHTML ).toBe( "bar1" );
          });

      });

      it( "does not break on expanding", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>" )
          .sync({ rows: [
            { name: "foo" },
            { name: "bar" }
          ]})
          .sync({ rows: [
            { name: "foo1" },
            { name: "bar1" },
            { name: "baz1" }
          ]})
          .pipe(( el: HTMLElement ) => {
            let els = el.querySelectorAll( "i" );
            expect( els.length ).toBe( 3 );
            expect( els.item( 0 ).innerHTML ).toBe( "foo1" );
            expect( els.item( 1 ).innerHTML ).toBe( "bar1" );
            expect( els.item( 2 ).innerHTML ).toBe( "baz1" );
          });

      });


      it( "does not kill the state of generated items", function() {
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\"><input data-ng-data=\"'name', row.name\" /></i>" )
          .sync({ rows: [
            { name: "foo" }
          ]})
          .pipe(( el: HTMLElement ) => {
            ( el.querySelector( "input" ) as HTMLInputElement ).value = "foo";
          })
          .sync({ rows: [
            { name: "bar" }
          ]})
          .pipe(( el: HTMLElement ) => {
            let input = ( el.querySelector( "input" ) as HTMLInputElement );
            expect( input.dataset[ "name" ] ).toBe( "bar" );
            expect( input.value ).toBe( "foo" );
          });
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


      it( "reduces an indexable list gracefully", function() {
        let firstPasssNodes: Node[],
            secondPasssNodes: Node[];
        NgTemplate
          .factory( this.el, "<i data-ng-for=\"let row of rows\"></i>" )
          .sync({ rows: [ { id: 1 }, { id: 2 }, { id: 3 } ]})
          .pipe(( el: HTMLElement ) => {
            firstPasssNodes = Array.from( el.children );
            expect( firstPasssNodes.length ).toBe( 3 );
          })
          .sync({ rows: [ { id: 1 }, { id: 3 } ]})
          .pipe(( el: HTMLElement ) => {
            secondPasssNodes = Array.from( el.children );
            expect( secondPasssNodes.length ).toBe( 2 );
            expect( firstPasssNodes[ 0 ] ).toBe( secondPasssNodes[ 0 ] );
            expect( firstPasssNodes[ 2 ] ).toBe( secondPasssNodes[ 1 ] );
          });
      });

    });
}