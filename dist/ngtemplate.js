/// <reference path="./d/ngtemplate.d.ts" />
var ngif_1 = require("./directives/ngif");
var ngel_1 = require("./directives/ngel");
var ngtext_1 = require("./directives/ngtext");
var ngfor_1 = require("./directives/ngfor");
var ngswitch_1 = require("./directives/ngswitch");
var ngswitchcase_1 = require("./directives/ngswitchcase");
var ngswitchcasedefault_1 = require("./directives/ngswitchcasedefault");
var ngclasslisttoggle_1 = require("./directives/ngclasslisttoggle");
var ngprop_1 = require("./directives/ngprop");
var NgTemplate = (function () {
    /**
     * Initialize template for a given Element
     * If template passed, load it into the Element
     */
    function NgTemplate(el, template) {
        this.el = el;
        this.directives = [];
        if (!el) {
            throw new Error("(NgTemplate) Invalid first parameter: must be an existing DOM node");
        }
        if (template) {
            this.el.innerHTML = template;
        }
        this.factory([ngfor_1.NgFor, ngswitch_1.NgSwitch, ngswitchcase_1.NgSwitchCase, ngswitchcasedefault_1.NgSwitchCaseDefault, ngif_1.NgIf,
            ngclasslisttoggle_1.NgClassListToggle, ngprop_1.NgProp, ngel_1.NgEl, ngtext_1.NgText]);
    }
    NgTemplate.factory = function (el, template) {
        return new NgTemplate(el, template || null);
    };
    NgTemplate.prototype.factory = function (directives) {
        var _this = this;
        directives.forEach(function (Directive) {
            _this.directives.push(new Directive(_this.el));
        });
    };
    NgTemplate.prototype.sync = function (data) {
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
})();
exports.NgTemplate = NgTemplate;
