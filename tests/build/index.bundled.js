(function(){
/* jshint unused: false */
/**
 * @typedef module
 * @type {object}
 * @property {string} id - the identifier for the module.
 * @property {string} filename - the fully resolved filename to the module.
 * @property {module} parent - the module that required this one.
 * @property {module[]} children - the module objects required by this one.
 * @property {boolean} loaded - whether or not the module is done loading, or is in the process of loading
 */
/**
	*
	* Define scope for `require`
	*/
var _require = (function(){
	var /**
			* Store modules (types assigned to module.exports)
			* @type {module[]}
			*/
			imports = [],
			/**
			 * Store the code that constructs a module (and assigns to exports)
			 * @type {*[]}
			 */
			factories = [],
			/**
			 * @type {module}
			 */
			module = {},
			/**
			 * Implement CommonJS `require`
			 * http://wiki.commonjs.org/wiki/Modules/1.1.1
			 * @param {string} filename
			 * @returns {*}
			 */
			__require = function( filename ) {

				if ( typeof imports[ filename ] !== "undefined" ) {
					return imports[ filename ].exports;
				}
				module = {
					id: filename,
					filename: filename,
					parent: module,
					children: [],
					exports: {},
					loaded: false
				};
				if ( typeof factories[ filename ] === "undefined" ) {
					throw new Error( "The factory of " + filename + " module not found" );
				}
				// Called first time, so let's run code constructing (exporting) the module
				imports[ filename ] = factories[ filename ]( _require, module.exports, module,
          typeof window !== "undefined" ? window : global );
				imports[ filename ].loaded = true;
				if ( imports[ filename ].parent.children ) {
					imports[ filename ].parent.children.push( imports[ filename ] );
				}
				return imports[ filename ].exports;
			};
	/**
	 * Register module
	 * @param {string} filename
	 * @param {function(module, *)} moduleFactory
	 */
	__require.def = function( filename, moduleFactory ) {
		factories[ filename ] = moduleFactory;
	};
	return __require;
}());
// Must run for UMD, but under CommonJS do not conflict with global require
if ( typeof require === "undefined" ) {
	require = _require;
}
_require.def( "tests/build/tests/index.spec.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_spec_1 = _require( "tests/build/tests/spec/ngtemplate.spec.js" );
//CacheSpec();
//AbstractDirectiveSpec();
//ExpressionSpec();
ngtemplate_spec_1.default();


  return module;
});

_require.def( "tests/build/tests/spec/ngtemplate.spec.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgTemplateSpec() {
    describe("NgTemplate", function () {
        describe("ng-if directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("removes the target from the DOM when expression is false", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                    .sync({ invalid: false });
                // changed to: <ng style="display: none; "></ng>
                expect(this.el.innerHTML).not.toMatch("Error");
                expect(this.el.innerHTML).toMatch("display");
            });
            it("restores the target after removal when expression changes", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                    .sync({ invalid: false })
                    .pipe(function () {
                    expect(this.el.innerHTML.indexOf("Error") === -1).toBe(true);
                }, this)
                    .sync({ invalid: true });
                expect(this.el.innerHTML.indexOf("Error") !== -1).toBe(true);
            });
            it("evaluates compoun expressions (foo > bar)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo > bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 });
                expect(this.el.innerHTML).toMatch("Error");
            });
            it("evaluates compoun expressions (foo < bar)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo < bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 });
                expect(this.el.innerHTML).not.toMatch("Error");
            });
        });
        describe("ng-el directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates expression on element (string literal)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>")
                    .sync({});
                expect(this.el.innerHTML).not.toMatch("Pristine");
                expect(this.el.innerHTML).toMatch("New value");
            });
            it("evaluates expression on element (tpl variable)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-el=\"this.innerHTML=text\">Pristine</span>")
                    .sync({ text: "New value" })
                    .pipe(function () {
                    expect(this.el.innerHTML).not.toMatch("Pristine");
                    expect(this.el.innerHTML).toMatch("New value");
                }, this)
                    .sync({ text: "Changed value" });
                expect(this.el.innerHTML).toMatch("Changed value");
            });
        });
        describe("ng-class-list-toggle directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>")
                    .sync({ isHidden: true });
                expect(this.el.innerHTML).toBe("<span class=\"is-hidden\"></span>");
            });
        });
        describe("ng-prop directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<button data-ng-prop=\"'disabled', isDisabled\"></button>")
                    .sync({ isDisabled: true })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.disabled).toBe(true);
                })
                    .sync({ isDisabled: false })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.disabled).toBe(false);
                });
            });
        });
        describe("ng-data directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<button data-ng-data=\"'someKey', value\"></button>")
                    .sync({ value: "foo" })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.dataset["someKey"]).toBe("foo");
                })
                    .sync({ value: "bar" })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.dataset["someKey"]).toBe("bar");
                });
            });
        });
        describe("ng-text directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                    .sync({ foo: "New value" });
                expect(this.el.innerHTML).not.toMatch("Pristine");
                expect(this.el.innerHTML).toMatch("New value");
            });
            it("escapes output", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                    .sync({ foo: "<button>" });
                expect(this.el.innerHTML).not.toMatch("<button>");
            });
        });
        describe("ng-for directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("generates nodes from a plain list", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>")
                    .sync({ rows: ["foo", "bar", "baz"] });
                expect(this.el.querySelectorAll("i").length).toBe(3);
            });
            it("generates nodes from a list of objects", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                    .sync({ rows: [
                        { name: "foo" },
                        { name: "bar" },
                        { name: "baz" }
                    ] });
                expect(this.el.querySelectorAll("i").length).toBe(3);
                expect(this.el.querySelector("i").innerHTML).toBe("foo");
            });
            it("does not fall on multiple syncs", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>")
                    .sync({ rows: ["foo", "bar", "baz"] })
                    .sync({ rows: ["bar", "foo", "baz"] })
                    .sync({ rows: ["foo", "bar", "baz"] });
                expect(this.el.querySelectorAll("i").length).toBe(3);
            });
            it("generates nodes in a table", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<table><tr data-ng-for=\"let row of rows\">" +
                    "<td data-ng-text=\"row\"></td></tr></table>")
                    .sync({ rows: ["foo", "bar", "baz"] });
                expect(this.el.querySelectorAll("td").length).toBe(3);
            });
        });
        describe("ng-switch/data-ng-switch-case directives", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-switch='theCase'>" +
                    "<i data-ng-switch-case='1'>FOO</i>" +
                    "<i data-ng-switch-case='2'>BAR</i>" +
                    "</div>")
                    .sync({ theCase: 1 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>FOO</i>");
                })
                    .sync({ theCase: 2 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>BAR</i>");
                });
            });
        });
        describe("ng-switch-case-default directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-switch='theCase'>" +
                    "<i data-ng-switch-case='1'>FOO</i>" +
                    "<i data-ng-switch-case='2'>BAR</i>" +
                    "<i data-ng-switch-case-default>DEFAULT</i>" +
                    "</div>")
                    .sync({ theCase: 1 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>FOO</i>");
                })
                    .sync({ theCase: 3 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>DEFAULT</i>");
                });
            });
        });
        describe("transformers", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-text='transform(raw)'></div>")
                    .sync({
                    raw: 100,
                    transform: function (num) {
                        return num + "500";
                    }
                })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<div>100500</div>");
                });
            });
        });
        describe("smart evaluation", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates a number", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text='100'></i>")
                    .sync({})
                    .pipe(function (el) {
                    var child = el.firstChild;
                    expect(child.innerHTML).toBe("100");
                });
            });
            it("evaluates a string", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text='\"string\"'></i>")
                    .sync({})
                    .pipe(function (el) {
                    var child = el.firstChild;
                    expect(child.innerHTML).toBe("string");
                });
            });
            it("evaluates a boolean", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-if='true'></i>")
                    .sync({})
                    .pipe(function (el) {
                    expect(Boolean(el.querySelector("i"))).toBe(true);
                });
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-if='false'></i>")
                    .sync({})
                    .pipe(function (el) {
                    expect(Boolean(el.querySelector("i"))).toBe(false);
                });
            });
        });
        //
        //    describe( "#on (handling NgTemplate events)", function(){
        //
        //      beforeEach(function(){
        //        this.el = document.createElement( "div" );
        //      });
        //
        //      it( "fires error event on undefined ref", function( done ) {
        //        var tpl = new NgTemplate( this.el, "<span data-ng-text=\"foo.bar.baz\"></span>" );
        //        tpl
        //          .on( "error", function( err: string ){
        //            expect( err.length ).toBe( true );
        //            done();
        //          })
        //          .sync({ foo: 10 });
        //      });
        //
        //    });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgTemplateSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ngtemplate.js", function( _require, exports, module, global ){
"use strict";
/// <reference path="./ngtemplate.d.ts" />
var ngif_1 = _require( "tests/build/src/ng-template/ngif.js" );
var ngel_1 = _require( "tests/build/src/ng-template/ngel.js" );
var ngtext_1 = _require( "tests/build/src/ng-template/ngtext.js" );
var ngfor_1 = _require( "tests/build/src/ng-template/ngfor.js" );
var ngswitch_1 = _require( "tests/build/src/ng-template/ngswitch.js" );
var ngswitchcase_1 = _require( "tests/build/src/ng-template/ngswitchcase.js" );
var ngswitchcasedefault_1 = _require( "tests/build/src/ng-template/ngswitchcasedefault.js" );
var ngclasslisttoggle_1 = _require( "tests/build/src/ng-template/ngclasslisttoggle.js" );
var ngprop_1 = _require( "tests/build/src/ng-template/ngprop.js" );
var ngdata_1 = _require( "tests/build/src/ng-template/ngdata.js" );
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var mediator_1 = _require( "tests/build/src/ng-template/mediator.js" );
var DIRECTIVES = [ngfor_1.NgFor, ngswitch_1.NgSwitch, ngswitchcase_1.NgSwitchCase, ngswitchcasedefault_1.NgSwitchCaseDefault, ngif_1.NgIf,
    ngclasslisttoggle_1.NgClassListToggle, ngdata_1.NgData, ngprop_1.NgProp, ngel_1.NgEl, ngtext_1.NgText];
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
        this.template || this.init(DIRECTIVES);
    }
    NgTemplate.factory = function (el, template) {
        return new NgTemplate(el, template || null);
    };
    /**
     * Subscribe for NgTemplate events
     */
    NgTemplate.prototype.on = function (ev, cb, context) {
        mediator_1.mediator.on(ev, cb, context);
        return this;
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
            this.init(DIRECTIVES);
            this.template = null;
        }
        this.directives.forEach(function (d) {
            d.sync(data, NgTemplate);
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

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngif.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <span data-ng-if="expression">Error</span>
 */
var NgIf = (function (_super) {
    __extends(NgIf, _super);
    function NgIf(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-if", function (node, expr, evaluate, cache) {
            return {
                el: node,
                anchor: document.createElement("ng"),
                exp: evaluate(expr, "Boolean"),
                cache: cache
            };
        });
    }
    NgIf.prototype.sync = function (data) {
        var _this = this;
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (val) {
                if (val) {
                    return _this.enable(node);
                }
                _this.disable(node);
            });
        });
    };
    NgIf.prototype.disable = function (node) {
        if (node.anchor.parentNode) {
            return;
        }
        node.anchor.style.display = "none";
        node.el.parentNode.insertBefore(node.anchor, node.el);
        node.el.parentNode.removeChild(node.el);
    };
    NgIf.prototype.enable = function (node) {
        if (!node.anchor.parentNode) {
            return;
        }
        node.anchor.parentNode.insertBefore(node.el, node.anchor);
        node.anchor.parentNode.removeChild(node.anchor);
    };
    return NgIf;
}(abstract_directive_1.AbstractDirective));
exports.NgIf = NgIf;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngtext.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <span data-ng-text="foo">...</span>
 */
var NgText = (function (_super) {
    __extends(NgText, _super);
    function NgText(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-text", function (node, expr, evaluate, cache) {
            return {
                el: node,
                exp: evaluate(expr, "String"),
                cache: cache
            };
        });
    }
    NgText.prototype.sync = function (data) {
        var _this = this;
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (val) {
                _this.setText(node.el, val);
            });
        });
    };
    return NgText;
}(abstract_directive_1.AbstractDirective));
exports.NgText = NgText;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngfor.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
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
                "ngClassListToggle", "ngData", "ngProp", "ngEl", "ngText"].forEach(function (key) {
                if (node.dataset[key]) {
                    delete node.dataset[key];
                }
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
    /**
     * Create for generated list elements a permitted parent elements
     */
    NgFor.createParentEl = function (el) {
        var map = {
            "TR": "tbody",
            "THEAD": "table",
            "TFOOT": "table",
            "TBODY": "table",
            "COLGROUP": "table",
            "CAPTION": "table",
            "TD": "tr",
            "TH": "tr",
            "COL": "colgroup",
            "FIGCAPTION": "figure",
            "LEGEND": "fieldset",
            "LI": "ul",
            "DT": "dl",
            "DD": "dl",
        };
        var child = el.tagName.toUpperCase(), parent = child in map ? map[child] : "div";
        return document.createElement(parent);
    };
    NgFor.prototype.sync = function (data, Ctor) {
        var _this = this;
        this.nodes.forEach(function (node) {
            var el = NgFor.createParentEl(node.el), container = NgFor.createParentEl(node.el), tpl = new Ctor(el, node.outerHTML);
            var isChanged = node.exp(data, function (val, variable) {
                data[variable] = val;
                tpl.sync(data);
                container.innerHTML += el.innerHTML;
            });
            isChanged && _this.buildDOM(node, _this.nodesToDocFragment(container));
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

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngel.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <span data-ng-el="this.setAttribute('ss', 11)">Error</span>
 */
var NgEl = (function (_super) {
    __extends(NgEl, _super);
    function NgEl(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-el", function (node, expr, evaluate) {
            return {
                el: node,
                exp: evaluate(expr)
            };
        });
    }
    NgEl.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.exp.call(node.el, data);
        });
    };
    return NgEl;
}(abstract_directive_1.AbstractDirective));
exports.NgEl = NgEl;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngswitch.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <span data-ng-switch="exp"></span>
 */
var NgSwitch = (function (_super) {
    __extends(NgSwitch, _super);
    function NgSwitch(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-switch", function (node, expr, evaluate, cache) {
            return {
                el: node,
                exp: evaluate(expr),
                cache: cache
            };
        });
    }
    NgSwitch.prototype.sync = function (data, Ctor) {
        this.nodes.forEach(function (node) {
            var tpl = new Ctor(node.el, node.outerHTML);
            node.cache.evaluate(node.exp.call(node.el, data), function (val) {
                data["$"] = val;
                tpl.sync(data);
            });
        });
    };
    return NgSwitch;
}(abstract_directive_1.AbstractDirective));
exports.NgSwitch = NgSwitch;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngswitchcase.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
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
    NgSwitchCase.prototype.sync = function (data) {
        if (!this.nodes.length) {
            return;
        }
        var match = this.nodes.find(function (node) {
            return data["$"] === node.exp.call(node.el, data);
        });
        this.el.innerHTML = match ? match.outerHTML : "";
    };
    return NgSwitchCase;
}(abstract_directive_1.AbstractDirective));
exports.NgSwitchCase = NgSwitchCase;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngswitchcasedefault.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
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
    NgSwitchCaseDefault.prototype.sync = function (data) {
        if (!this.nodes.length) {
            return;
        }
        if (!this.el.innerHTML) {
            var node = this.nodes.shift();
            this.el.innerHTML = node.outerHTML;
        }
    };
    return NgSwitchCaseDefault;
}(abstract_directive_1.AbstractDirective));
exports.NgSwitchCaseDefault = NgSwitchCaseDefault;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngclasslisttoggle.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <i data-ng-class-list-toggle="'is-hidden', isHidden"></i>
 */
var NgClassListToggle = (function (_super) {
    __extends(NgClassListToggle, _super);
    function NgClassListToggle(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-class-list-toggle", function (node, expr, evaluate, cache) {
            return {
                el: node,
                exp: evaluate(expr, "__toArray"),
                cache: cache
            };
        });
    }
    NgClassListToggle.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (args) {
                node.el.classList.toggle(args[0], args[1]);
            });
        });
    };
    return NgClassListToggle;
}(abstract_directive_1.AbstractDirective));
exports.NgClassListToggle = NgClassListToggle;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngprop.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <i data-ng-prop="'disabled', isDisabled"></i>
 */
var NgProp = (function (_super) {
    __extends(NgProp, _super);
    function NgProp(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-prop", function (node, expr, evaluate, cache) {
            return {
                el: node,
                exp: evaluate(expr, "__toArray"),
                cache: cache
            };
        });
    }
    NgProp.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (args) {
                var el = node.el;
                el[args[0]] = args[1];
            });
        });
    };
    return NgProp;
}(abstract_directive_1.AbstractDirective));
exports.NgProp = NgProp;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngdata.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <i data-ng-data="'someKey', value"></i>
 */
var NgData = (function (_super) {
    __extends(NgData, _super);
    function NgData(el) {
        _super.call(this);
        this.nodes = this.initNodes(el, "ng-data", function (node, expr, evaluate, cache) {
            return {
                el: node,
                exp: evaluate(expr, "__toArray"),
                cache: cache
            };
        });
    }
    NgData.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (args) {
                var el = node.el;
                el.dataset[args[0]] = args[1];
            });
        });
    };
    return NgData;
}(abstract_directive_1.AbstractDirective));
exports.NgData = NgData;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/exception.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Custom exception extending Error
 * @param {string} message
 */
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(message) {
        _super.call(this, message);
        this.name = "NgTemplateError",
            this.message = message;
    }
    return Exception;
}(Error));
exports.Exception = Exception;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/mediator.js", function( _require, exports, module, global ){
"use strict";
var eventemitter_1 = _require( "tests/build/src/ng-template/eventemitter.js" );
exports.mediator = new eventemitter_1.EventEmitter();

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/abstract-directive.js", function( _require, exports, module, global ){
"use strict";
var expression_1 = _require( "tests/build/src/ng-template/expression.js" );
var cache_1 = _require( "tests/build/src/ng-template/cache.js" );
var AbstractDirective = (function () {
    function AbstractDirective() {
    }
    AbstractDirective.prototype.initNodes = function (el, identifier, cb) {
        var datakey = this.getDataKey(identifier), selector = this.getSelector(identifier);
        return Array.from(el.querySelectorAll(selector)).map(function (el) {
            var expr = el.dataset[datakey];
            delete el.dataset[datakey];
            return cb(el, expr, expression_1.evaluate, new cache_1.Cache());
        });
    };
    /**
     * Converts foo-bar-baz to `[data-foo-bar-baz]`
     */
    AbstractDirective.prototype.getSelector = function (raw) {
        return "[data-" + raw + "]";
    };
    /**
     * Converts foo-bar-baz to fooBarBaz
     */
    AbstractDirective.prototype.getDataKey = function (raw) {
        return raw
            .split("-").map(function (part, inx) {
            if (!inx) {
                return part;
            }
            return part.substr(0, 1).toUpperCase() + part.substr(1);
        })
            .join("");
    };
    /**
     * researched strategies
     * el.innerText = str; - no standard
     * el.textContent = str; - fast
     * el.appendChild( document.createTextNode( str ) ) - slower
     */
    AbstractDirective.prototype.setText = function (el, str) {
        el.textContent = str;
    };
    AbstractDirective.prototype.escape = function (str) {
        var div = document.createElement("div");
        this.setText(div, str);
        return div.innerHTML;
    };
    return AbstractDirective;
}());
exports.AbstractDirective = AbstractDirective;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/eventemitter.js", function( _require, exports, module, global ){
"use strict";
var EventEmitter = (function () {
    function EventEmitter() {
        this.eventQueue = [];
    }
    /**
     * Trigger callbacks for the given event
     * @example
     * this.trigger( "myevent", 1, 2, 3 );
     */
    EventEmitter.prototype.trigger = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.eventQueue.forEach(function (dto) {
            if (dto.event !== event) {
                return;
            }
            dto.callback.apply(dto.context, args);
        }, this);
    };
    /**
     * Just like on, but causes the bound callback to fire only once before being removed.
     */
    EventEmitter.prototype.once = function (ev, cb, context) {
        this.off(ev, cb);
        this.on(ev, cb, context);
        return this;
    };
    /**
     * Subscribe a cb hundler for a given event in the object scope
     */
    EventEmitter.prototype.on = function (ev, cb, context) {
        this.eventQueue.push({
            event: ev,
            callback: cb,
            context: context || { event: ev }
        });
        return this;
    };
    /**
     * Unsubscribe a cb hundler
     *
     */
    EventEmitter.prototype.off = function (ev, target) {
        this.eventQueue = this.eventQueue.filter(function (task) {
            return task.event !== ev || task.callback.toString() !== target.toString();
        });
        return this;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/expression.js", function( _require, exports, module, global ){
"use strict";
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var mediator_1 = _require( "tests/build/src/ng-template/mediator.js" );
function toArray() {
    return [].slice.call(arguments);
}
;
function isNumber(expr) {
    var re = /^\d+$/;
    return re.test(expr);
}
exports.isNumber = isNumber;
function isBool(expr) {
    var re = /^(true|false)$/i;
    return re.test(expr);
}
exports.isBool = isBool;
function isString(expr) {
    var single = /^\'[^\']+\'$/i, double = /^\"[^\"]+\"$/i;
    return single.test(expr) || double.test(expr);
}
exports.isString = isString;
/**
 * Removes leading negotiation
 */
function removeNegotiation(expr) {
    var re = /^\!\s*/;
    return expr.replace(re, "");
}
exports.removeNegotiation = removeNegotiation;
/**
 * Return true of expression can be used as a path e.g. foo.bar.baz.quiz
 */
function isParsableExpr(expr) {
    var re = /^[a-zA-Z_\$][a-zA-Z0-9\._\$]+$/;
    return expr.substr(0, 5) !== "this." && re.test(expr);
}
exports.isParsableExpr = isParsableExpr;
/**
 * Find value in nested object by a specified path e.g. foo.bar.baz.quiz
 */
function findValue(path, data) {
    var value = data;
    path.split("\.").forEach(function (key) {
        if (typeof value !== "object") {
            throw new exception_1.Exception("'" + path + "' is undefined");
        }
        if (!(key in value)) {
            throw new exception_1.Exception("'" + path + "' is undefined");
        }
        value = value[key];
    });
    return value;
}
exports.findValue = findValue;
function getWrapperFunction(fnName) {
    return window[fnName];
}
exports.getWrapperFunction = getWrapperFunction;
function strategyReference(expr, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var positiveExpr = removeNegotiation(expr);
    return function (data) {
        try {
            var exprVal = findValue(positiveExpr, data), val = positiveExpr === expr ? exprVal : !exprVal;
            if (!wrapper) {
                return val;
            }
            var wrapFn = getWrapperFunction(wrapper);
            return wrapFn(val);
        }
        catch (err) {
            if (err instanceof exception_1.Exception) {
                mediator_1.mediator.trigger("error", err.message);
                return "";
            }
            throw new SyntaxError("Invalid ng* expression " + expr);
        }
    };
}
function strategyString(expr) {
    return function () {
        // strip quotes
        return expr.substr(1, expr.length - 2);
    };
}
function strategyBool(expr) {
    return function () {
        return expr.toUpperCase() === "TRUE";
    };
}
function strategyNumber(expr) {
    return function () {
        return Number(expr);
    };
}
function strategyNull() {
    return function () {
        return "";
    };
}
function propValueReference(propRaw, expr) {
    var prop = propRaw.substr(1, propRaw.length - 2), positiveExpr = removeNegotiation(expr);
    return function (data) {
        try {
            var exprVal = findValue(positiveExpr, data), val = positiveExpr === expr ? exprVal : !exprVal;
            return [prop, val];
        }
        catch (err) {
            if (err instanceof exception_1.Exception) {
                mediator_1.mediator.trigger("error", err.message);
                return [prop, ""];
            }
            throw new SyntaxError("Invalid ng* expression " + expr);
        }
    };
}
exports.propValueReference = propValueReference;
function evaluate(exprRaw, wrapper) {
    if (wrapper === void 0) { wrapper = ""; }
    var func, expr = exprRaw.trim(), positiveExpr = removeNegotiation(expr), 
    // make available in the closure
    __toArray = toArray, 
    // when e.g. ('propName', value)
    exprArgs;
    try {
        if (wrapper === "__toArray") {
            exprArgs = expr.split(",");
            if (exprArgs.length !== 2) {
                throw new exception_1.Exception("Invalid group expression " + expr + " - must be \"expr, expr\"");
            }
            exprArgs = exprArgs.map(function (i) { return i.trim(); });
            // case: 'propName', some.value
            if (isString(exprArgs[0])
                && !isNumber(exprArgs[1])
                && !isBool(exprArgs[1])
                && !isString(exprArgs[1])
                && isParsableExpr(exprArgs[1])) {
                return propValueReference(exprArgs[0], exprArgs[1]);
            }
        }
        if (!expr.length) {
            return strategyNull();
        }
        if (isNumber(expr)) {
            return strategyNumber(expr);
        }
        if (isBool(expr)) {
            return strategyBool(expr);
        }
        if (isString(expr)) {
            return strategyString(expr);
        }
        if (isParsableExpr(positiveExpr)) {
            return strategyReference(expr, wrapper);
        }
        // Standard strategy
        func = function (data) {
            var cb, code, keys = Object.keys(data), vals = keys.map(function (key) {
                return data[key];
            });
            try {
                code = "cb = function(" + keys.join(",") + ("){ return " + wrapper + "(" + expr + "); };");
                eval(code);
                return cb.apply(this, vals);
            }
            catch (err) {
                mediator_1.mediator.trigger("Could not evaluate " + code);
            }
        };
    }
    catch (err) {
        if (err instanceof exception_1.Exception) {
            mediator_1.mediator.trigger("error", err.message);
            return strategyNull();
        }
        throw new SyntaxError("Invalid ng* expression " + expr);
    }
    return func;
}
exports.evaluate = evaluate;
;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/cache.js", function( _require, exports, module, global ){
"use strict";
var Cache = (function () {
    function Cache() {
    }
    Cache.prototype.match = function (exVal) {
        if (exVal === this.cache) {
            return true;
        }
        this.cache = exVal;
        return false;
    };
    Cache.prototype.evaluate = function (exVal, cb) {
        if (this.match(exVal)) {
            return;
        }
        cb(exVal);
    };
    return Cache;
}());
exports.Cache = Cache;
;

  module.exports = exports;


  return module;
});

(function(){
_require( "tests/build/tests/index.spec.js" );
}());
}());