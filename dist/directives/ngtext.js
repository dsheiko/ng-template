var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
/**
 * <span data-ng-text="foo">...</span>
 */
var NgText = (function (_super) {
    __extends(NgText, _super);
    function NgText(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-text", function (node, expr, evaluate) {
            return {
                el: node,
                exp: evaluate(expr, "String")
            };
        });
    }
    NgText.prototype.update = function (data) {
        var _this = this;
        this.nodes.forEach(function (node) {
            _this.setText(node.el, node.exp.call(node.el, data));
        });
    };
    return NgText;
})(abstract_directive_1.AbstractDirective);
exports.NgText = NgText;
