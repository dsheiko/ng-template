var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>
var NgFor = (function (_super) {
    __extends(NgFor, _super);
    function NgFor(el) {
        var _this = this;
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-for", function (node, expr, evaluate) {
            var parsed = _this.parseExpr(expr), outerHTML = node.outerHTML, anchor = document.createElement("a");
            node.parentNode.replaceChild(anchor, node);
            return {
                el: anchor,
                anchor: anchor,
                outerHTML: outerHTML,
                exp: function (data, cb) {
                    var it = [];
                    try {
                        eval("it = data." + parsed.iterable);
                    }
                    catch (err) {
                        throw new EvalError("Template variable " + parsed.iterable + " undefined");
                    }
                    if (!Array.isArray(it)) {
                        throw new Error("Template variable " + parsed.iterable + " must be an array");
                    }
                    return it.forEach(function (val) {
                        return cb(val, parsed.variable);
                    });
                }
            };
        });
    }
    NgFor.prototype.parseExpr = function (strRaw) {
        var re = /(let|var)\s+([a-zA-Z0-9\_]+)\s+of\s+/, str = strRaw.trim(), varMatches = str.match(re);
        if (!varMatches || varMatches.length !== 3) {
            throw new Error("Cannot parse ng-for expression: " + strRaw);
        }
        return {
            variable: varMatches[2],
            iterable: str.replace(re, "")
        };
    };
    NgFor.prototype.update = function (data, cb) {
        var _this = this;
        this.nodes.forEach(function (node) {
            var tmp = document.createElement("div");
            node.exp(data, function (val, variable) {
                tmp.innerHTML += node.outerHTML;
                data[variable] = val;
                cb && cb(tmp);
            });
            _this.buildDOM(node, _this.nodesToDocFragment(tmp));
        });
    };
    /**
     * Create headless DOM subtree
     */
    NgFor.prototype.nodesToDocFragment = function (div) {
        var doc = document.createDocumentFragment();
        Array.from(div.children).forEach(function (child) { return doc.appendChild(child); });
        return doc;
    };
    NgFor.prototype.buildDOM = function (node, doc) {
        var parent = node.anchor.parentNode;
        parent.replaceChild(doc, node.anchor);
        node.anchor = doc;
    };
    return NgFor;
})(abstract_directive_1.AbstractDirective);
exports.NgFor = NgFor;
