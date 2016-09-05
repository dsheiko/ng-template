import { NgTemplate } from "../../src/ngtemplate";
import { NgFor } from "../../src/ng-template/ngfor";
import { Reporter } from "../../src/ng-template/reporter";

let reporter = new Reporter();

export default function NgForDirectiveSpec(){
  describe("NgTemplate.ngFor", function(){
    
    describe(".createEl", function(){
      it( "creates detached node", function() {
        let el = NgFor.createEl( "li", "<li class='test'><i></i></li>" );
        expect( el.tagName ).toBe( "LI" );
        expect( el.classList.contains( "test" ) ).toBeTruthy();
        expect( (<HTMLElement>el.firstChild).tagName ).toBe( "I" );
      });
      it( "detaches/attaches to DOM", function() {
        let cont = document.createElement( "form" ),
            foo = NgFor.createEl( "input", "<input />" ) as HTMLInputElement,
            bar = NgFor.createEl( "input", "<input />" ) as HTMLInputElement;
        cont.appendChild( foo );
        cont.appendChild( bar );
        ( cont.querySelectorAll( "input" ).item( 0 ) as HTMLInputElement ).value = "foo";
        ( cont.querySelectorAll( "input" ).item( 1 ) as HTMLInputElement ).value = "bar";
        cont.innerHTML = "";
        cont.appendChild( foo );
        cont.appendChild( bar );
        expect( ( cont.querySelectorAll( "input" ).item( 0 ) as HTMLInputElement ).value ).toBe( "foo" );
        expect( ( cont.querySelectorAll( "input" ).item( 1 ) as HTMLInputElement ).value ).toBe( "bar" );
      });
    });
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
              res = node.exp({ rows: [1,2,3] }).join( "," );
          expect( res ).toBe( "1,2,3" );
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