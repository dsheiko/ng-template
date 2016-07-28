var ngTemplate = require( "../dist/ngtemplate" ).ngTemplate;

describe("NgTemplate", function(){

  describe("ng-if directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "removes the target from the DOM when expression is false", function() {
      ngTemplate( this.el, "<span data-ng-if=\"invalid\">Error</span>" )
        .update({ invalid: false });

      // changed to: <ng style="display: none; "></ng>
      expect( this.el.innerHTML ).to.not.have.string( "Error" );
      expect( this.el.innerHTML ).to.have.string( "display" );
    });

    it( "restores the target after removal when expression changes", function(){
      ngTemplate( this.el, "<span data-ng-if=\"invalid\">Error</span>" )
        .update({ invalid: false })
        .pipe(function(){
          expect( this.el.innerHTML.indexOf( "Error" ) === -1 ).to.be.ok;
         }, this )
        .update({ invalid: true });

      expect( this.el.innerHTML.indexOf( "Error" ) !== -1 ).to.be.ok;
    });

    it( "evaluates compoun expressions (foo > bar)", function() {
      ngTemplate( this.el, "<span data-ng-if=\"foo > bar\">Error</span>" )
        .update({ foo: 10, bar: 0 });
      expect( this.el.innerHTML ).to.have.string( "Error" );
    });

    it( "evaluates compoun expressions (foo < bar)", function() {
      ngTemplate( this.el, "<span data-ng-if=\"foo < bar\">Error</span>" )
        .update({ foo: 10, bar: 0 });
      expect( this.el.innerHTML ).to.not.have.string( "Error" );
    });

  });


  describe("ng-el directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates expression on element (string literal)", function() {
      ngTemplate( this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>" )
        .update({});

      expect( this.el.innerHTML ).to.not.have.string( "Pristine" );
      expect( this.el.innerHTML ).to.have.string( "New value" );
    });
    it( "evaluates expression on element (tpl variable)", function() {
      ngTemplate( this.el, "<span data-ng-el=\"this.innerHTML=text\">Pristine</span>" )
        .update({ text: "New value" })
        .pipe(function(){
          expect( this.el.innerHTML ).to.not.have.string( "Pristine" );
          expect( this.el.innerHTML ).to.have.string( "New value" );
         }, this )
        .update({ text: "Changed value" }).outerHTML;
      expect( this.el.innerHTML ).to.have.string( "Changed value" );
    });
  });


  describe("ng-class-list-toggle directive", function(){

    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the expression", function() {
      ngTemplate( this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>" )
        .update({ isHidden: true });
      expect( this.el.innerHTML ).to.eql( "<span class=\"is-hidden\"></span>" );
    });

  });


  describe("ng-text directive", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      ngTemplate( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
        .update({ foo: "New value" });
      expect( this.el.innerHTML ).to.not.have.string( "Pristine" );
      expect( this.el.innerHTML ).to.have.string( "New value" );
    });
    it( "escapes output", function() {
      ngTemplate( this.el, "<span data-ng-text=\"foo\">Pristine</span>" )
        .update({ foo: "<button>" });
      expect( this.el.innerHTML ).to.not.have.string( "<button>" );
    });
  });


  describe("ng-for directive", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "generates nodes from a plain list", function() {
      ngTemplate( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>" )
        .update({ rows: [ "foo", "bar", "baz" ]});
      expect( this.el.innerHTML ).to.eql( "<i>foo</i><i>bar</i><i>baz</i>" );
    });

    it( "generates nodes from a list of objects", function() {
      ngTemplate( this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>" )
        .update({ rows: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz" }
        ]});
      expect( this.el.innerHTML ).to.eql( "<i>foo</i><i>bar</i><i>baz</i>" );
    });

  });


   describe("ng-switch/data-ng-switch-case directives", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      ngTemplate( this.el,
            "<div data-ng-switch='theCase'>" +
            "<i data-ng-switch-case='1'>FOO</i>" +
            "<i data-ng-switch-case='2'>BAR</i>" +
            "</div>" )
        .update({ theCase: 1 })
        .pipe(function( el ){
          expect( el.innerHTML ).to.eql( "<i>FOO</i>" );
        })
        .update({ theCase: 2 })
        .pipe(function( el ){
          expect( el.innerHTML ).to.eql( "<i>BAR</i>" );
        });
    });
  });



  describe("ng-switch-case-default directive", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      ngTemplate( this.el,
            "<div data-ng-switch='theCase'>" +
            "<i data-ng-switch-case='1'>FOO</i>" +
            "<i data-ng-switch-case='2'>BAR</i>" +
            "<i data-ng-switch-case-default>DEFAULT</i>" +
            "</div>" )
        .update({ theCase: 1 })
        .pipe(function( el ){
          expect( el.innerHTML ).to.eql( "<i>FOO</i>" );
        })
        .update({ theCase: 3 })
        .pipe(function( el ){
          expect( el.innerHTML ).to.eql( "<i>DEFAULT</i>" );
        });
    });
  });


  describe("transformers", function(){
    beforeEach(function(){
      this.el = document.createElement( "div" );
    });

    it( "evaluates the statement", function() {
      ngTemplate( this.el,
            "<div data-ng-text='transform(raw)'></div>" )
        .update({
          raw: 100,
          transform: function( num ) {
            return num + "500";
          }
        })
        .pipe(function( el ){
          expect( el.innerHTML ).to.eql( "<div>100500</div>" );
        });
    });
  });


});