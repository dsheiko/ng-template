import { NgTemplate } from "../../src/ngtemplate";
import { NgIfSpec }  from "./ng-template/ngif";

export default function NgTemplateSpec(){

  describe("NgTemplate", function(){

    NgIfSpec.call( this );


    describe("ng-el directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates expression on element (string literal)", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>" )
          .sync({});

        expect( this.el.innerHTML ).not.toMatch( "Pristine" );
        expect( this.el.innerHTML ).toMatch( "New value" );
      });
      it( "evaluates expression on element (tpl variable)", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-el=\"this.innerHTML=text\">Pristine</span>" )
          .sync({ text: "New value" })
          .pipe(function(){
            expect( this.el.innerHTML ).not.toMatch( "Pristine" );
            expect( this.el.innerHTML ).toMatch( "New value" );
           }, this )
          .sync({ text: "Changed value" });
        expect( this.el.innerHTML ).toMatch( "Changed value" );
      });
    });


    describe("ng-class-list-toggle directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>" )
          .sync({ isHidden: true });
        expect( this.el.innerHTML ).toBe( "<span class=\"is-hidden\"></span>" );
      });

    });


    describe("ng-prop directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<button data-ng-prop=\"'disabled', isDisabled\"></button>" )
          .sync({ isDisabled: true })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.disabled ).toBe( true );
          })
          .sync({ isDisabled: false })
          .pipe(function( el: HTMLButtonElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.disabled ).toBe( false );
          });

      });

    });

    describe("ng-data directive", function(){

      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the expression", function() {
        NgTemplate
          .factory( this.el, "<button data-ng-data=\"'someKey', value\"></button>" )
          .sync({ value: "foo" })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.dataset[ "someKey" ] ).toBe( "foo" );
          })
          .sync({ value: "bar" })
          .pipe(function( el: HTMLElement ){
            let btn = <HTMLButtonElement>el.querySelector( "button" );
            expect( btn.dataset[ "someKey" ] ).toBe( "bar" );
          });

      });

    });


    describe("ng-text directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
          .sync({ foo: "New value" });
        expect( this.el.innerHTML ).not.toMatch( "Pristine" );
        expect( this.el.innerHTML ).toMatch( "New value" );
      });
      it( "escapes output", function() {
        NgTemplate
          .factory( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
          .sync({ foo: "<button>" });
        expect( this.el.innerHTML ).not.toMatch( "<button>" );
      });
    });




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


     describe("ng-switch/data-ng-switch-case directives", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el,
              "<div data-ng-switch='theCase'>" +
              "<i data-ng-switch-case='1'>FOO</i>" +
              "<i data-ng-switch-case='2'>BAR</i>" +
              "</div>" )
          .sync({ theCase: 1 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>FOO</i>" );
          })
          .sync({ theCase: 2 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>BAR</i>" );
          });
      });
    });



    describe("ng-switch-case-default directive", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates the statement", function() {
        NgTemplate
          .factory( this.el,
              "<div data-ng-switch='theCase'>" +
              "<i data-ng-switch-case='1'>FOO</i>" +
              "<i data-ng-switch-case='2'>BAR</i>" +
              "<i data-ng-switch-case-default>DEFAULT</i>" +
              "</div>" )
          .sync({ theCase: 1 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>FOO</i>" );
          })
          .sync({ theCase: 3 })
          .pipe(function( el: HTMLElement ){
            expect( el.innerHTML ).toBe( "<i>DEFAULT</i>" );
          });
      });
    });


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


    describe("smart evaluation", function(){
      beforeEach(function(){
        this.el = document.createElement( "div" );
      });

      it( "evaluates a number", function() {
        NgTemplate
          .factory( this.el,
              "<i data-ng-text='100'></i>" )
          .sync({})
          .pipe(function( el: HTMLElement ){
            let child = <HTMLElement>el.firstChild;
            expect( child.innerHTML ).toBe( "100" );
          });
      });
      it( "evaluates a string", function() {
        NgTemplate
          .factory( this.el,
              "<i data-ng-text='\"string\"'></i>" )
          .sync({})
          .pipe(function( el: HTMLElement ){
            let child = <HTMLElement>el.firstChild;
            expect( child.innerHTML ).toBe( "string" );
          });
      });

      it( "evaluates a boolean", function() {
        NgTemplate
          .factory( this.el,
              "<i data-ng-if='true'></i>" )
          .sync({})
          .pipe(function( el: HTMLElement ){
            expect( Boolean( el.querySelector( "i" ) ) ).toBe( true );
          });

        NgTemplate
          .factory( this.el,
              "<i data-ng-if='false'></i>" )
          .sync({})
          .pipe(function( el: HTMLElement ){
            expect( Boolean( el.querySelector( "i" ) ) ).toBe( false );
          });
      });

    });
//
//    describe( "#on (handling NgTemplate events)", function(){
//
//      beforeEach(function(){
//        this.el = document.createElement( "div" );
//      });
//
//      it( "fires error event on undefined ref", function( done ) {
//        var tpl = new NgTemplate( this.el, "<span data-ng-text=\"foo.bar.baz\"></span>" );
//        tpl
//          .on( "error", function( err: string ){
//            expect( err.length ).toBe( true );
//            done();
//          })
//          .sync({ foo: 10 });
//      });
//
//    });


  });
}