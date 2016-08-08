var NgFor = require( "../../dist/ng-template/ngfor" ).NgFor;

describe("NgTemplate.ngFor", function(){
    describe("#parseExpr", function(){
      it( "parses `let row of rows`", function() {
        var res = NgFor.prototype.parseExpr( "let row of rows" );
        expect( res.variable ).to.eql( "row" );
        expect( res.iterable ).to.eql( "rows" );
      });
      it( "parses extra-spacing `let  row   of   rows`", function() {
        var res = NgFor.prototype.parseExpr( "let row of rows" );
        expect( res.variable ).to.eql( "row" );
        expect( res.iterable ).to.eql( "rows" );
      });
    });

    describe("#nodesToDocFragment", function(){

      it( "creates headless DOM subtree", function() {
        var el = document.createElement( "div" ),
            doc,
            div = document.createElement( "div" );

        div.innerHTML = "<i>1</i><i>2</i>";
        doc = NgFor.prototype.nodesToDocFragment( div );

        el.appendChild( doc );
        expect( el.innerHTML ).to.eql( "<i>1</i><i>2</i>" );
      });
    });

    describe("#constructor", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
        this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
      });
      it( "populatea node DTOs", function() {
        var ngfor = new NgFor( this.el );
        expect( ngfor.nodes.length ).to.eql( 1 );
      });

      it( "creates node.exp", function() {
        var ngfor = new NgFor( this.el ),
            node = ngfor.nodes.shift(),
            res = "";

        node.exp({ rows: [1,2,3] }, function( val ){
            res += "_" + val;
        });

        expect( res ).to.eql( "_1_2_3" );
      });
    });

    describe("#sync", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });
      it( "span the target element", function() {
        this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
        var ngfor = new NgFor( this.el );
        ngfor.sync({ rows: ["foo", "bar"] });

        expect( this.el.querySelectorAll( "i" ).length ).to.eql( 2 );
      });
    });



});