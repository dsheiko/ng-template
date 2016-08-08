"use strict";
/// <reference path="./ngtemplate.d.ts" />
var ngif_1 = require("./ng-template/ngif");
var ngel_1 = require("./ng-template/ngel");
var ngtext_1 = require("./ng-template/ngtext");
var ngfor_1 = require("./ng-template/ngfor");
var ngswitch_1 = require("./ng-template/ngswitch");
var ngswitchcase_1 = require("./ng-template/ngswitchcase");
var ngswitchcasedefault_1 = require("./ng-template/ngswitchcasedefault");
var ngclasslisttoggle_1 = require("./ng-template/ngclasslisttoggle");
var ngprop_1 = require("./ng-template/ngprop");
var exception_1 = require("./ng-template/exception");
var NgTemplate = (function () {
    /**
     * Initialize template for a given Element
     * If template passed, load it into the Element
     */
    function NgTemplate(el, template) {
        this.el = el;
        this.template = template;
        this.directives = [];
        if (!this.el) {
            throw new exception_1.Exception("(NgTemplate) Invalid first parameter: must be an existing DOM node");
        }
        if (this.template) {
            return;
        }
        this.init([ngfor_1.NgFor, ngswitch_1.NgSwitch, ngswitchcase_1.NgSwitchCase, ngswitchcasedefault_1.NgSwitchCaseDefault, ngif_1.NgIf,
            ngclasslisttoggle_1.NgClassListToggle, ngprop_1.NgProp, ngel_1.NgEl, ngtext_1.NgText]);
    }
    NgTemplate.factory = function (el, template) {
        return new NgTemplate(el, template || null);
    };
    NgTemplate.prototype.init = function (directives) {
        var _this = this;
        directives.forEach(function (Directive) {
            _this.directives.push(new Directive(_this.el));
        });
    };
    NgTemplate.prototype.sync = function (data) {
        // Late initialization: renders from a given template on first sync
        if (this.template) {
            this.el.innerHTML = this.template;
            this.init([ngfor_1.NgFor, ngswitch_1.NgSwitch, ngswitchcase_1.NgSwitchCase, ngswitchcasedefault_1.NgSwitchCaseDefault, ngif_1.NgIf,
                ngclasslisttoggle_1.NgClassListToggle, ngprop_1.NgProp, ngel_1.NgEl, ngtext_1.NgText]);
            this.template = null;
        }
        this.directives.forEach(function (d) {
            d.sync(data, function (el) {
                (new NgTemplate(el)).sync(data);
            });
        });
        return this;
    };
    NgTemplate.prototype.pipe = function (cb, context) {
        if (context === void 0) { context = this; }
        cb.call(context, this.el);
        return this;
    };
    return NgTemplate;
}());
exports.NgTemplate = NgTemplate;
