var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
/**
 * <span data-ng-switch="exp"></span>
 */
var NgSwitch = (function (_super) {
    __extends(NgSwitch, _super);
    function NgSwitch(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-switch", function (node, expr, evaluate) {
            return {
                el: node,
                exp: evaluate(expr)
            };
        });
    }
    NgSwitch.prototype.update = function (data, cb) {
        this.nodes.forEach(function (node) {
            data["$"] = node.exp.call(node.el, data);
            cb && cb(node.el);
        });
    };
    return NgSwitch;
})(abstract_directive_1.AbstractDirective);
exports.NgSwitch = NgSwitch;
