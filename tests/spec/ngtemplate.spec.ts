import { NgTemplate } from "../../src/ngtemplate";
import NgIfSpec from "./ng-template/ngif";
import NgElSpec from "./ng-template/ngel";
import NgClassListToggleSpec from "./ng-template/ngclasslisttoggle";
import NgPropSpec from "./ng-template/ngprop";
import NgDataSpec from "./ng-template/ngdata";
import NgTextSpec from "./ng-template/ngtext";
import NgForSpec from "./ng-template/ngfor";
import NgSwitchSpec from "./ng-template/ngswitch";
import TransformSpec from "./ng-template/transform";
import SmartEvalSpec from "./ng-template/smarteval";

export default function NgTemplateSpec(){

  describe("NgTemplate", function(){

    NgIfSpec.call( this );

    NgElSpec.call( this );

    NgClassListToggleSpec.call( this );

    NgPropSpec.call( this );

    NgDataSpec.call( this );

    NgTextSpec.call( this );

    NgForSpec.call( this );

    NgSwitchSpec.call( this );

    TransformSpec.call( this );

    SmartEvalSpec.call( this );

//
//    Depricated
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