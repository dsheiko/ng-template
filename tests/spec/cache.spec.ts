import { NgTemplate } from "../../src/ngtemplate";
import { observeDOM } from "../test.util";

export default function CacheSpec(){
  describe("Cache", function(){

    describe("ng-if directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "modifies the DOM when the expression changes", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
          .sync({ foo: 10, bar: 0 })
          .pipe(function( el: HTMLElement ){
            observeDOM( el, function(){
              modified = true;
            });
          })
          .sync({ foo: 10, bar: 20 });

          setTimeout(function(){
            expect( modified ).toBe( true );
            done();
          }, 200 );
      });


      it( "does not modify the DOM when the expression does not change", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
          .sync({ foo: 10, bar: 0 })
          .pipe(function( el: HTMLElement ){
            observeDOM( el, function(){
              modified = true;
            });
          })
          .sync({ foo: 10, bar: 0 });

        setTimeout(function(){
            expect( modified ).toBe( false );
            done();
          }, 200 );

      });

      it( "does not modify the DOM when the product of expression does not change", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
          .sync({ foo: 10, bar: 0 })
          .pipe(function( el: HTMLElement ){
            observeDOM( el, function(){
              modified = true;
            });
          })
          .sync({ foo: 50, bar: 10 });

          setTimeout(function(){
            expect( modified ).toBe( false );
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
        NgTemplate
          .factory( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
          .sync({ foo: "Foo", bar: "Bar" })
          .pipe(function( el: HTMLElement ){
            observeDOM( el.querySelector( "i" ), function(){
              modified = true;
            });
          })
          .sync({ foo: "Foo", bar: "BaZ" });

          setTimeout(function(){
            expect( modified ).toBe( true );
            done();
          }, 200 );
      });


      it( "does not modify the DOM when the expression does not change", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
          .sync({ foo: "Foo", bar: "Bar" })
          .pipe(function( el: HTMLElement ){
            observeDOM( el.querySelector( "i" ), function(){
              modified = true;
            });
          })
          .sync({ foo: "Foo", bar: "Bar" });

        setTimeout(function(){
            expect( modified ).toBe( false );
            done();
          }, 200 );

      });

      it( "does not modify the DOM when the product of expression does not change", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<i data-ng-text=\"foo + bar\"></i>" )
          .sync({ foo: "Foo", bar: "Bar" })
          .pipe(function( el: HTMLElement ){
            observeDOM( el.querySelector( "i" ), function(){
              modified = true;
            });
          })
          .sync({ foo: "FooBa", bar: "r" });

        setTimeout(function(){
            expect( modified ).toBe( false );
            done();
          }, 200 );

      });

    });

     describe("ng-class directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "modifies the DOM when the expression changes", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<i data-ng-class=\"foo, bar\"></i>" )
          .sync({ foo: "foo", bar: true })
          .pipe(function( el: HTMLElement ){
            observeDOM( el.querySelector( "i" ), function(){
              modified = true;
            });
          })
          .sync({ foo: "foo", bar: false });

          setTimeout(function(){
            expect( modified ).toBe( true );
            done();
          }, 200 );
      });
      it( "does not modify the DOM when the expression does not change", function( done ) {
        var modified = false;
        NgTemplate
          .factory( this.el, "<i data-ng-class=\"foo, bar\"></i>" )
          .sync({ foo: "foo", bar: true })
          .pipe(function( el: HTMLElement ){
            observeDOM( el.querySelector( "i" ), function(){
              modified = true;
            });
          })
          .sync({ foo: "foo", bar: true });

          setTimeout(function(){
            expect( modified ).toBe( false );
            done();
          }, 200 );
      });
    });



  });
}