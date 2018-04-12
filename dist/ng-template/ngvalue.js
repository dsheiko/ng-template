"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
/**
 * <input data-ng-value="foo"></i>
 */
var NgValue = (function (_super) {
    __extends(NgValue, _super);
    function NgValue(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-value", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "String", reporter),
                cache: cache
            };
        });
    }
    NgValue.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (val) {
                var el = node.el;
                el["value"] = val;
            });
        });
    };
    NgValue.selector = "ng-value";
    return NgValue;
}(abstract_directive_1.AbstractDirective));
exports.NgValue = NgValue;