var EventEmitter = require( "../dist/ng-template/eventemitter" ).EventEmitter;

describe( "EventEmitter", function(){

  describe("#trigger/#on", function(){
    it( "fires/catches events with payload", function( done ) {
      var mediator = new EventEmitter();
      mediator.on( "foo", function( bar, baz ){
        expect( bar ).to.eql( "bar" );
        expect( baz ).to.eql( "baz" );
        done();
      });
      mediator.trigger( "foo", "bar", "baz" );
    });

     it( "keeps to the context", function( done ) {
      var mediator = new EventEmitter();
      this.quiz = "quiz";
      mediator.on( "foo", function( bar ){
        expect( bar ).to.eql( "bar" );
        expect( this.quiz ).to.eql( "quiz" );
        done();
      }, this );

      mediator.trigger( "foo", "bar" );
    });

  });

});