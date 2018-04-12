"use strict";
var ngif_1 = require("./ng-template/ngif");
var ngel_1 = require("./ng-template/ngel");
var ngclass_1 = require("./ng-template/ngclass");
var ngprop_1 = require("./ng-template/ngprop");
var ngattr_1 = require("./ng-template/ngattr");
var ngdata_1 = require("./ng-template/ngdata");
var ngtext_1 = require("./ng-template/ngtext");
var ngfor_1 = require("./ng-template/ngfor");
var ngswitch_1 = require("./ng-template/ngswitch");
var transform_1 = require("./ng-template/transform");
var smarteval_1 = require("./ng-template/smarteval");
var report_1 = require("./ng-template/report");
function NgTemplateSpec() {
    describe("NgTemplate", function () {
        ngif_1.default.call(this);
        ngel_1.default.call(this);
        ngclass_1.default.call(this);
        ngprop_1.default.call(this);
        ngattr_1.default.call(this);
        ngdata_1.default.call(this);
        ngtext_1.default.call(this);
        ngfor_1.default.call(this);
        ngswitch_1.default.call(this);
        transform_1.default.call(this);
        smarteval_1.default.call(this);
        report_1.default.call(this);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgTemplateSpec;
