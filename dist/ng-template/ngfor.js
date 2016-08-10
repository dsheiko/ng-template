"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = require("./abstract-directive");
var exception_1 = require("./exception");
var counter = 0;
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>
var NgFor = (function (_super) {
    __extends(NgFor, _super);
    function NgFor(el) {
        var _this = this;
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-for", function (node, expr, evaluate, cache) {
            var parsed = _this.parseExpr(expr), outerHTML, id = "id" + (++counter);
            node.dataset["ngNodeId"] = id;
            outerHTML = node.outerHTML;
            // Do not process directives on the first level as all of them about elements generated by ngFor
            ["ngSwitch", "ngSwitchCase", "ngSwitchCaseDefault", "ngIf",
                "ngClassListToggle", "ngProp", "ngEl", "ngText"].forEach(function (key) {
                delete node.dataset[key];
            });
            return {
                el: node,
                parentNode: node.parentNode,
                outerHTML: outerHTML,
                id: id,
                exp: function (data, cb) {
                    var it = [];
                    try {
                        eval("it = data." + parsed.iterable);
                    }
                    catch (err) {
                        throw new exception_1.Exception("NgTemplate variable " + parsed.iterable + " undefined");
                    }
                    if (!Array.isArray(it)) {
                        throw new exception_1.Exception("NgTemplate variable " + parsed.iterable + " must be an array");
                    }
                    if (cache.match(JSON.stringify(it))) {
                        return false;
                    }
                    it.forEach(function (val) {
                        cb(val, parsed.variable || null);
                    });
                    return true;
                }
            };
        });
    }
    NgFor.prototype.parseExpr = function (strRaw) {
        var re = /(let|var)\s+([a-zA-Z0-9\_]+)\s+of\s+/, str = strRaw.trim(), varMatches = str.match(re);
        if (!varMatches || varMatches.length !== 3) {
            throw new exception_1.Exception("Cannot parse ng-for expression: " + strRaw);
        }
        return {
            variable: varMatches[2],
            iterable: str.replace(re, "")
        };
    };
    NgFor.prototype.sync = function (data, cb) {
        var _this = this;
        this.nodes.forEach(function (node) {
            var tmp = document.createElement("div"), isChanged = node.exp(data, function (val, variable) {
                tmp.innerHTML += node.outerHTML;
                data[variable] = val;
                cb && cb(tmp);
            });
            isChanged && _this.buildDOM(node, _this.nodesToDocFragment(tmp));
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
        var items = Array.from(node.parentNode.querySelectorAll("[data-ng-node-id=\"" + node.id + "\"]")), anchor = document.createElement("ng");
        node.parentNode.insertBefore(anchor, items[0]);
        anchor.dataset["ngNodeId"] = node.id;
        items.forEach(function (child) {
            node.parentNode.removeChild(child);
        });
        node.parentNode.replaceChild(doc, anchor);
    };
    return NgFor;
}(abstract_directive_1.AbstractDirective));
exports.NgFor = NgFor;
