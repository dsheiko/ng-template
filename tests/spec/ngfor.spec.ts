import { NgTemplate } from "../../src/ngtemplate";
import { NgFor } from "../../src/ng-template/ngfor";
import { Reporter } from "../../src/ng-template/reporter";

let reporter = new Reporter();

export default function NgForDirectiveSpec(){
  describe("NgTemplate.ngFor", function(){
      describe("#parseExpr", function(){
        it( "parses `let row of rows`", function() {
          var res = NgFor.prototype.parseExpr( "let row of rows" );
          expect( res.variable ).toBe( "row" );
          expect( res.iterable ).toBe( "rows" );
        });
        it( "parses extra-spacing `let  row   of   rows`", function() {
          var res = NgFor.prototype.parseExpr( "let row of rows" );
          expect( res.variable ).toBe( "row" );
          expect( res.iterable ).toBe( "rows" );
        });
      });

      describe("#nodesToDocFragment", function(){

        it( "creates headless DOM subtree", function() {
          var el = document.createElement( "div" ),
              doc: HTMLElement,
              div = document.createElement( "div" );

          div.innerHTML = "<i>1</i><i>2</i>";
          doc = (<any>NgFor.prototype).nodesToDocFragment( div );

          el.appendChild( doc );
          expect( el.innerHTML ).toBe( "<i>1</i><i>2</i>" );
        });
      });

      describe("#constructor", function(){
        beforeEach(function(){
          this.el = document.createElement( "div" );
          this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
        });
        it( "populatea node DTOs", function() {
          var ngfor = new NgFor( this.el, reporter );
          expect( ngfor.nodes.length ).toBe( 1 );
        });

        it( "creates node.exp", function() {
          var ngfor = new NgFor( this.el, reporter ),
              node = ngfor.nodes.shift(),
              res = "";

          node.exp({ rows: [1,2,3] }, function( val: string ){
              res += "_" + val;
          });

          expect( res ).toBe( "_1_2_3" );
        });
      });

      describe("#sync", function(){
        beforeEach(function(){
          this.el = document.createElement( "div" );
        });
        it( "span the target element", function() {
          this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
          var ngfor = new NgFor( this.el, reporter );
          ngfor.sync({ rows: ["foo", "bar"] }, NgTemplate );
          expect( this.el.querySelectorAll( "i" ).length ).toBe( 2 );
        });
      });



  });
}