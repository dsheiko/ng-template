"use strict";
var ngif_1 = require("./ng-template/ngif");
var ngel_1 = require("./ng-template/ngel");
var ngclasslisttoggle_1 = require("./ng-template/ngclasslisttoggle");
var ngprop_1 = require("./ng-template/ngprop");
var ngdata_1 = require("./ng-template/ngdata");
var ngtext_1 = require("./ng-template/ngtext");
var ngfor_1 = require("./ng-template/ngfor");
var ngswitch_1 = require("./ng-template/ngswitch");
var transform_1 = require("./ng-template/transform");
var smarteval_1 = require("./ng-template/smarteval");
function NgTemplateSpec() {
    describe("NgTemplate", function () {
        ngif_1.default.call(this);
        ngel_1.default.call(this);
        ngclasslisttoggle_1.default.call(this);
        ngprop_1.default.call(this);
        ngdata_1.default.call(this);
        ngtext_1.default.call(this);
        ngfor_1.default.call(this);
        ngswitch_1.default.call(this);
        transform_1.default.call(this);
        smarteval_1.default.call(this);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgTemplateSpec;
