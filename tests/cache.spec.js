var ngTemplate = require( "../dist/ngtemplate" ).ngTemplate,
    util = require( "./test.util.js" );

describe("Cache", function(){

  describe("ng-if directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "modifies the DOM when the expression changes", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
        .sync({ foo: 10, bar: 0 })
        .pipe(function( el ){
          util.observeDOM( el, function(){
            modified = true;
          });
        })
        .sync({ foo: 10, bar: 20 });

        setTimeout(function(){
          expect( modified ).to.eql( true );
          done();
        }, 200 );
    });


    it( "does not modify the DOM when the expression does not change", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
        .sync({ foo: 10, bar: 0 })
        .pipe(function( el ){
          util.observeDOM( el, function(){
            modified = true;
          });
        })
        .sync({ foo: 10, bar: 0 });

      setTimeout(function(){
          expect( modified ).to.eql( false );
          done();
        }, 200 );

    });

    it( "does not modify the DOM when the product of expression does not change", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
        .sync({ foo: 10, bar: 0 })
        .pipe(function( el ){
          util.observeDOM( el, function( ev ){
            modified = true;
          });
        })
        .sync({ foo: 50, bar: 10 });

        setTimeout(function(){
          expect( modified ).to.eql( false );
          done();
        }, 200 );
    });

  });



  describe("ng-text directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "modifies the DOM when the expression changes", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
        .sync({ foo: "Foo", bar: "Bar" })
        .pipe(function( el ){
          util.observeDOM( el.querySelector( "i" ), function(){
            modified = true;
          });
        })
        .sync({ foo: "Foo", bar: "BaZ" });

        setTimeout(function(){
          expect( modified ).to.eql( true );
          done();
        }, 200 );
    });


    it( "does not modify the DOM when the expression does not change", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
        .sync({ foo: "Foo", bar: "Bar" })
        .pipe(function( el ){
          util.observeDOM( el.querySelector( "i" ), function(){
            modified = true;
          });
        })
        .sync({ foo: "Foo", bar: "Bar" });

      setTimeout(function(){
          expect( modified ).to.eql( false );
          done();
        }, 200 );

    });

    it( "does not modify the DOM when the product of expression does not change", function( done ) {
      var modified = false;
      ngTemplate( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
        .sync({ foo: "Foo", bar: "Bar" })
        .pipe(function( el ){
          util.observeDOM( el.querySelector( "i" ), function(){
            modified = true;
          });
        })
        .sync({ foo: "FooBa", bar: "r" });

      setTimeout(function(){
          expect( modified ).to.eql( false );
          done();
        }, 200 );

    });

  });

// Mocha-phantomjs uses phantomjs 1.9.7-15, which doesn't support MutationObserver
// workaround with DOM MutationEvents doesn't catch
// DOMAttrModified - can be enabled for in browser testing

//   describe("ng-class-list-toggle directive", function(){
//
//    beforeEach(function(){
//      this.el = document.createElement( "div" );
//    });
//
//    it( "modifies the DOM when the expression changes", function( done ) {
//      var modified = false;
//      ngTemplate( this.el, "<i data-ng-class-list-toggle=\"foo, bar\"></i>" )
//        .sync({ foo: "foo", bar: true })
//        .pipe(function( el ){
//          util.observeDOM( el.querySelector( "i" ), function(){
//            modified = true;
//          });
//        })
//        .sync({ foo: "foo", bar: false });
//
//        setTimeout(function(){
//          expect( modified ).to.eql( true );
//          done();
//        }, 200 );
//    });
//    it( "does not modify the DOM when the expression does not change", function( done ) {
//      var modified = false;
//      ngTemplate( this.el, "<i data-ng-class-list-toggle=\"foo, bar\"></i>" )
//        .sync({ foo: "foo", bar: true })
//        .pipe(function( el ){
//          util.observeDOM( el.querySelector( "i" ), function(){
//            modified = true;
//          });
//        })
//        .sync({ foo: "foo", bar: true });
//
//        setTimeout(function(){
//          expect( modified ).to.eql( false );
//          done();
//        }, 200 );
//    });
//  });



});