var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
/**
 * <span data-ng-switch-default></span>
 */
var NgSwitchCaseDefault = (function (_super) {
    __extends(NgSwitchCaseDefault, _super);
    function NgSwitchCaseDefault(el) {
        _super.call(this);
        this.el = el;
        this.nodes = this.initNodes(el, "ng-switch-case-default", function (node, expr, evaluate) {
            return {
                el: node,
                outerHTML: node.outerHTML,
                exp: evaluate(expr)
            };
        });
    }
    NgSwitchCaseDefault.prototype.update = function (data) {
        if (!this.nodes.length) {
            return;
        }
        if (!this.el.innerHTML) {
            var node = this.nodes.shift();
            this.el.innerHTML = node.outerHTML;
        }
    };
    return NgSwitchCaseDefault;
})(abstract_directive_1.AbstractDirective);
exports.NgSwitchCaseDefault = NgSwitchCaseDefault;
