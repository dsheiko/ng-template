var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
/**
 * <span data-ng-switch="exp"></span>
 */
var NgSwitchCase = (function (_super) {
    __extends(NgSwitchCase, _super);
    function NgSwitchCase(el) {
        _super.call(this);
        this.el = el;
        this.nodes = this.initNodes(el, "ng-switch-case", function (node, expr, evaluate) {
            return {
                el: node,
                outerHTML: node.outerHTML,
                exp: evaluate(expr)
            };
        });
    }
    NgSwitchCase.prototype.update = function (data) {
        if (!this.nodes.length) {
            return;
        }
        var match = this.nodes.find(function (node) {
            return data["$"] === node.exp.call(node.el, data);
        });
        this.el.innerHTML = match ? match.outerHTML : "";
    };
    return NgSwitchCase;
})(abstract_directive_1.AbstractDirective);
exports.NgSwitchCase = NgSwitchCase;
