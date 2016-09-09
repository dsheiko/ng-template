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
var cache_spec_1 = _require( "tests/build/tests/spec/cache.spec.js" );
var parser_spec_1 = _require( "tests/build/tests/spec/expression/parser.spec.js" );
var tokenizer_spec_1 = _require( "tests/build/tests/spec/expression/tokenizer.spec.js" );
var abstract_directive_spec_1 = _require( "tests/build/tests/spec/abstract-directive.spec.js" );
var ngfor_spec_1 = _require( "tests/build/tests/spec/ngfor.spec.js" );
var expression_spec_1 = _require( "tests/build/tests/spec/expression.spec.js" );
var ngtemplate_spec_1 = _require( "tests/build/tests/spec/ngtemplate.spec.js" );
var constructor_spec_1 = _require( "tests/build/tests/spec/constructor.spec.js" );
tokenizer_spec_1.default();
parser_spec_1.default();
expression_spec_1.default();
cache_spec_1.default();
abstract_directive_spec_1.default();
ngfor_spec_1.default();
ngtemplate_spec_1.default();
constructor_spec_1.default();


  return module;
});

_require.def( "tests/build/tests/spec/cache.spec.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
var test_util_1 = _require( "tests/build/tests/test.util.js" );
function CacheSpec() {
    describe("Cache", function () {
        describe("ng-if directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("modifies the DOM when the expression changes", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo < bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el, function () {
                        modified = true;
                    });
                })
                    .sync({ foo: 10, bar: 20 });
                setTimeout(function () {
                    expect(modified).toBe(true);
                    done();
                }, 200);
            });
            it("does not modify the DOM when the expression does not change", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo < bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el, function () {
                        modified = true;
                    });
                })
                    .sync({ foo: 10, bar: 0 });
                setTimeout(function () {
                    expect(modified).toBe(false);
                    done();
                }, 200);
            });
            it("does not modify the DOM when the product of expression does not change", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo < bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el, function () {
                        modified = true;
                    });
                })
                    .sync({ foo: 50, bar: 10 });
                setTimeout(function () {
                    expect(modified).toBe(false);
                    done();
                }, 200);
            });
        });
        describe("ng-text directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("modifies the DOM when the expression changes", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text=\"foo + bar\"></i>")
                    .sync({ foo: "Foo", bar: "Bar" })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el.querySelector("i"), function () {
                        modified = true;
                    });
                })
                    .sync({ foo: "Foo", bar: "BaZ" });
                setTimeout(function () {
                    expect(modified).toBe(true);
                    done();
                }, 200);
            });
            it("does not modify the DOM when the expression does not change", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text=\"foo + bar\"></i>")
                    .sync({ foo: "Foo", bar: "Bar" })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el.querySelector("i"), function () {
                        modified = true;
                    });
                })
                    .sync({ foo: "Foo", bar: "Bar" });
                setTimeout(function () {
                    expect(modified).toBe(false);
                    done();
                }, 200);
            });
            it("does not modify the DOM when the product of expression does not change", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text=\"foo + bar\"></i>")
                    .sync({ foo: "Foo", bar: "Bar" })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el.querySelector("i"), function () {
                        modified = true;
                    });
                })
                    .sync({ foo: "FooBa", bar: "r" });
                setTimeout(function () {
                    expect(modified).toBe(false);
                    done();
                }, 200);
            });
        });
        describe("ng-class directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("modifies the DOM when the expression changes", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-class=\"foo, bar\"></i>")
                    .sync({ foo: "foo", bar: true })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el.querySelector("i"), function () {
                        modified = true;
                    });
                })
                    .sync({ foo: "foo", bar: false });
                setTimeout(function () {
                    expect(modified).toBe(true);
                    done();
                }, 200);
            });
            it("does not modify the DOM when the expression does not change", function (done) {
                var modified = false;
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-class=\"foo, bar\"></i>")
                    .sync({ foo: "foo", bar: true })
                    .pipe(function (el) {
                    test_util_1.observeDOM(el.querySelector("i"), function () {
                        modified = true;
                    });
                })
                    .sync({ foo: "foo", bar: true });
                setTimeout(function () {
                    expect(modified).toBe(false);
                    done();
                }, 200);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CacheSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/expression/parser.spec.js", function( _require, exports, module, global ){
"use strict";
var parser_1 = _require( "tests/build/src/ng-template/expression/parser.js" );
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
function ParserSpec() {
    describe("Parser", function () {
        describe(".split", function () {
            it("parses by Arithmetic operators (+/-)", function () {
                var expr = 'foo + bar.baz - 10', res = parser_1.Parser.split(expr);
                expect(res).toContain("foo");
                expect(res).toContain("bar.baz");
                expect(res).toContain("10");
                expect(res).toContain("+");
                expect(res).toContain("-");
            });
            it("parses by Relational operators (</>)", function () {
                var expr = 'foo > bar.baz < 10', res = parser_1.Parser.split(expr);
                expect(res).toContain("foo");
                expect(res).toContain("bar.baz");
                expect(res).toContain("10");
                expect(res).toContain(">");
                expect(res).toContain("<");
            });
            it("parses by Equality operators (===/!==/==/!=)", function () {
                var expr = 'foo === bar.baz !== 10 == 100 != false', res = parser_1.Parser.split(expr);
                expect(res).toContain("foo");
                expect(res).toContain("bar.baz");
                expect(res).toContain("10");
                expect(res).toContain("==");
                expect(res).toContain("!==");
                expect(res).toContain("==");
                expect(res).toContain("!=");
                expect(res).toContain("100");
                expect(res).toContain("false");
            });
            it("parses by Binary logical operators (&&/||)", function () {
                var expr = 'foo && bar.baz || 10', res = parser_1.Parser.split(expr);
                expect(res).toContain("foo");
                expect(res).toContain("bar.baz");
                expect(res).toContain("10");
                expect(res).toContain("&&");
                expect(res).toContain("||");
            });
            it("return a single element for not parsable", function () {
                var expr = 'foo.bar.baz', res = parser_1.Parser.split(expr);
                expect(res.length).toBe(1);
            });
        });
        describe(".parse", function () {
            it("tokenizes simple expression", function () {
                var expr = 'foo + 100', res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(3);
                expect(res.shift() instanceof tokenizer_1.ReferenceToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.OperatorToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.NumberToken).toBe(true);
            });
            it("tokenizes simple expression with string", function () {
                var expr = "foo + \"bar\"", res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(3);
                expect(res.shift() instanceof tokenizer_1.ReferenceToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.OperatorToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.StringToken).toBe(true);
            });
            it("tokenizes simple expression with boolean", function () {
                var expr = "foo && true", res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(3);
                expect(res.shift() instanceof tokenizer_1.ReferenceToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.OperatorToken).toBe(true);
                expect(res.shift() instanceof tokenizer_1.BooleanToken).toBe(true);
            });
            it("rejects 4+ members", function () {
                var expr = 'foo + 100 + bar', res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(0);
            });
            it("rejects 2 members", function () {
                var expr = 'foo +', res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(0);
            });
            it("rejects with a string that contains expression", function () {
                var expr = "foo + \"bar + baz\"", res = parser_1.Parser.parse(expr);
                expect(res.length).toBe(0);
            });
            it("exists early on a string", function () {
                var expr = "\"string\"", res = parser_1.Parser.parse(expr);
                expect(res.shift() instanceof tokenizer_1.StringToken).toBe(true);
            });
            it("exists early on a spaced string", function () {
                var expr = " \"string\" ", res = parser_1.Parser.parse(expr);
                expect(res.shift() instanceof tokenizer_1.StringToken).toBe(true);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ParserSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/expression/tokenizer.spec.js", function( _require, exports, module, global ){
"use strict";
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
function TokenizerSpec() {
    describe("Tokenizer", function () {
        describe("factory", function () {
            it("recognizes a string single-quoted", function () {
                var expr = "'string'", res = tokenizer_1.tokenizer(expr);
                expect(res instanceof tokenizer_1.StringToken).toBe(true);
            });
        });
        describe("StringToken", function () {
            describe(".valid", function () {
                it("recognizes a string single-quoted", function () {
                    var expr = "'string'";
                    expect(tokenizer_1.StringToken.valid(expr)).toBe(true);
                });
                it("recognizes a string double-quoted", function () {
                    var expr = "\"string\"";
                    expect(tokenizer_1.StringToken.valid(expr)).toBe(true);
                });
                it("rejects not-a-string", function () {
                    var expr = "100";
                    expect(tokenizer_1.StringToken.valid(expr)).toBe(false);
                });
            });
            describe("#resolveValue", function () {
                it("resolves pure", function () {
                    var expr = "'string'", token = new tokenizer_1.StringToken(expr), res = token.resolveValue({});
                    expect(res).toBe("string");
                });
                // string has no effect for negated
            });
        });
        describe("BooleanToken", function () {
            describe(".valid", function () {
                it("recognizes true", function () {
                    var expr = "true";
                    expect(tokenizer_1.BooleanToken.valid(expr)).toBe(true);
                });
                it("recognizes false", function () {
                    var expr = "false";
                    expect(tokenizer_1.BooleanToken.valid(expr)).toBe(true);
                });
                it("rejects not-a-boolean", function () {
                    var expr = "100";
                    expect(tokenizer_1.BooleanToken.valid(expr)).toBe(false);
                });
            });
            describe("#resolveValue", function () {
                it("resolves pure", function () {
                    var expr = "true", token = new tokenizer_1.BooleanToken(expr), res = token.resolveValue({});
                    expect(res).toBe(true);
                });
                it("resolves negated", function () {
                    var expr = "true", token = new tokenizer_1.BooleanToken(expr, true), res = token.resolveValue({});
                    expect(res).toBe(false);
                });
            });
        });
        describe("NumberToken", function () {
            describe(".valid", function () {
                it("recognizes 100", function () {
                    var expr = "100";
                    expect(tokenizer_1.NumberToken.valid(expr)).toBe(true);
                });
                it("recognizes 001", function () {
                    var expr = "001";
                    expect(tokenizer_1.NumberToken.valid(expr)).toBe(true);
                });
                it("rejects NaN", function () {
                    var expr = "var";
                    expect(tokenizer_1.NumberToken.valid(expr)).toBe(false);
                });
                it("rejects var100", function () {
                    var expr = "var100";
                    expect(tokenizer_1.NumberToken.valid(expr)).toBe(false);
                });
            });
            describe("#resolveValue", function () {
                it("resolves pure", function () {
                    var expr = "100", token = new tokenizer_1.NumberToken(expr), res = token.resolveValue({});
                    expect(res).toBe(100);
                });
                it("resolves negated", function () {
                    var expr = "1", token = new tokenizer_1.NumberToken(expr, true), res = token.resolveValue({});
                    expect(Boolean(res)).toBe(false);
                });
            });
        });
        describe("OperatorToken", function () {
            describe(".valid", function () {
                it("recognizes +", function () {
                    var valid = ["+", "-", "<", ">", "===", "==", "!==", "!=", "&&", "||"];
                    valid.forEach(function (expr) {
                        expect(tokenizer_1.OperatorToken.valid(expr)).toBe(true);
                    });
                });
                it("rejects not-a-boolean", function () {
                    var expr = "nope";
                    expect(tokenizer_1.OperatorToken.valid(expr)).toBe(false);
                });
            });
        });
        describe("ReferenceToken", function () {
            describe(".valid", function () {
                it("recognizes foo", function () {
                    var expr = "foo";
                    expect(tokenizer_1.ReferenceToken.valid(expr)).toBe(true);
                });
                it("recognizes foo.bar.baz", function () {
                    var expr = "foo.bar.baz";
                    expect(tokenizer_1.ReferenceToken.valid(expr)).toBe(true);
                });
                it("rejects not-a-ref", function () {
                    var expr = "100";
                    expect(tokenizer_1.ReferenceToken.valid(expr)).toBe(false);
                });
                it("rejects any in context of this", function () {
                    var expr = "this.foo";
                    expect(tokenizer_1.ReferenceToken.valid(expr)).toBe(false);
                });
            });
            describe(".findValue", function () {
                it("finds value in nested object by a specified path e.g. foo.bar.baz.quiz", function () {
                    var data = {
                        foo: {
                            bar: {
                                baz: {
                                    quiz: "quiz"
                                }
                            }
                        }
                    }, val = tokenizer_1.ReferenceToken.findValue("foo.bar.baz.quiz", data);
                    expect(val).toBe("quiz");
                });
            });
            describe("#resolveValue", function () {
                it("resolves pure foo", function () {
                    var expr = "foo", token = new tokenizer_1.ReferenceToken(expr), res = token.resolveValue({ foo: true });
                    expect(res).toBe(true);
                });
                it("resolves pure foo.bar", function () {
                    var expr = "foo.bar", token = new tokenizer_1.ReferenceToken(expr), res = token.resolveValue({ foo: { bar: true } });
                    expect(res).toBe(true);
                });
                it("resolves negated", function () {
                    var expr = "foo", token = new tokenizer_1.ReferenceToken(expr, true), res = token.resolveValue({ foo: true });
                    expect(res).toBe(false);
                });
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TokenizerSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/abstract-directive.spec.js", function( _require, exports, module, global ){
"use strict";
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
function AbstractDirectiveSpec() {
    describe("NgTemplate.abstract-directive", function () {
        describe("#getDataKey", function () {
            it("parses `foo-bar-baz`", function () {
                var res = abstract_directive_1.AbstractDirective.prototype.getDataKey("foo-bar-baz");
                expect(res).toBe("fooBarBaz");
            });
        });
        describe("#getSelector", function () {
            it("parses `foo-bar-baz`", function () {
                var res = abstract_directive_1.AbstractDirective.prototype.getSelector("foo-bar-baz");
                expect(res).toBe("[data-foo-bar-baz]");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractDirectiveSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ngfor.spec.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
var ngfor_1 = _require( "tests/build/src/ng-template/ngfor.js" );
var reporter_1 = _require( "tests/build/src/ng-template/reporter.js" );
var reporter = new reporter_1.Reporter();
function NgForDirectiveSpec() {
    describe("NgTemplate.ngFor", function () {
        describe(".createEl", function () {
            it("creates detached node", function () {
                var el = ngfor_1.NgFor.createEl("li", "<li class='test'><i></i></li>");
                expect(el.tagName).toBe("LI");
                expect(el.classList.contains("test")).toBeTruthy();
                expect(el.firstChild.tagName).toBe("I");
            });
            it("detaches/attaches to DOM", function () {
                var cont = document.createElement("form"), foo = ngfor_1.NgFor.createEl("input", "<input />"), bar = ngfor_1.NgFor.createEl("input", "<input />");
                cont.appendChild(foo);
                cont.appendChild(bar);
                cont.querySelectorAll("input").item(0).value = "foo";
                cont.querySelectorAll("input").item(1).value = "bar";
                cont.innerHTML = "";
                cont.appendChild(foo);
                cont.appendChild(bar);
                expect(cont.querySelectorAll("input").item(0).value).toBe("foo");
                expect(cont.querySelectorAll("input").item(1).value).toBe("bar");
            });
        });
        describe("#parseExpr", function () {
            it("parses `let row of rows`", function () {
                var res = ngfor_1.NgFor.prototype.parseExpr("let row of rows");
                expect(res.variable).toBe("row");
                expect(res.iterable).toBe("rows");
            });
            it("parses extra-spacing `let  row   of   rows`", function () {
                var res = ngfor_1.NgFor.prototype.parseExpr("let row of rows");
                expect(res.variable).toBe("row");
                expect(res.iterable).toBe("rows");
            });
        });
        describe("#constructor", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
            });
            it("populatea node DTOs", function () {
                var ngfor = new ngfor_1.NgFor(this.el, reporter);
                expect(ngfor.nodes.length).toBe(1);
            });
            it("creates node.exp", function () {
                var ngfor = new ngfor_1.NgFor(this.el, reporter), node = ngfor.nodes.shift(), res = node.exp({ rows: [1, 2, 3] }).join(",");
                expect(res).toBe("1,2,3");
            });
        });
        describe("#sync", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("span the target element", function () {
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
                var ngfor = new ngfor_1.NgFor(this.el, reporter);
                ngfor.sync({ rows: ["foo", "bar"] }, ngtemplate_1.NgTemplate);
                expect(this.el.querySelectorAll("i").length).toBe(2);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgForDirectiveSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/expression.spec.js", function( _require, exports, module, global ){
"use strict";
var expression_1 = _require( "tests/build/src/ng-template/expression.js" );
var reporter_1 = _require( "tests/build/src/ng-template/reporter.js" );
function ExpressionSpec() {
    describe("expression", function () {
        beforeEach(function () {
            this.reporter = new reporter_1.Reporter();
        });
        describe("compile", function () {
            beforeEach(function () {
                this.reporter = new reporter_1.Reporter();
            });
            describe("expression cases", function () {
                it("evaluates foo", function () {
                    var fn = expression_1.compile("foo", "Boolean", this.reporter);
                    expect(fn({ foo: true })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                    fn = expression_1.compile(" foo ", "Boolean", this.reporter);
                    expect(fn({ foo: true })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates !foo", function () {
                    var fn = expression_1.compile("!foo", "Boolean", this.reporter);
                    expect(fn({ foo: true })).toBe(false);
                    expect(this.reporter.isParsed()).toBe(true);
                    fn = expression_1.compile(" !foo ", "Boolean", this.reporter);
                    expect(fn({ foo: true })).toBe(false);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo + bar", function () {
                    var fn = expression_1.compile("foo + bar", "", this.reporter);
                    expect(fn({ foo: 1, bar: 1 })).toBe(2);
                    expect(this.reporter.isParsed()).toBe(true);
                    fn = expression_1.compile(" foo + bar ", "", this.reporter);
                    expect(fn({ foo: 1, bar: 1 })).toBe(2);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo - bar", function () {
                    var fn = expression_1.compile("foo - bar", "", this.reporter);
                    expect(fn({ foo: 3, bar: 1 })).toBe(2);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo == bar", function () {
                    var fn = expression_1.compile("foo == bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 2 })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo != bar", function () {
                    var fn = expression_1.compile("foo != bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 3 })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo === bar", function () {
                    var fn = expression_1.compile("foo === bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 2 })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo !== bar", function () {
                    var fn = expression_1.compile("foo !== bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 3 })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo && bar", function () {
                    var fn = expression_1.compile("foo && bar", "Boolean", this.reporter);
                    expect(fn({ foo: true, bar: false })).toBe(false);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo && !bar", function () {
                    var fn = expression_1.compile("foo && !bar", "Boolean", this.reporter);
                    expect(fn({ foo: true, bar: false })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo || bar", function () {
                    var fn = expression_1.compile("foo || bar", "Boolean", this.reporter);
                    expect(fn({ foo: true, bar: false })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo > bar", function () {
                    var fn = expression_1.compile("foo > bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 1 })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo < bar", function () {
                    var fn = expression_1.compile("foo < bar", "Boolean", this.reporter);
                    expect(fn({ foo: 2, bar: 1 })).toBe(false);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo + 10", function () {
                    var fn = expression_1.compile("foo + 10", "", this.reporter);
                    expect(fn({ foo: 1 })).toBe(11);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo === 'foo'", function () {
                    var fn = expression_1.compile("foo === 'foo'", "Boolean", this.reporter);
                    expect(fn({ foo: "foo" })).toBe(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates 'prop', foo", function () {
                    var fn = expression_1.compile("'prop', foo", "__toArray", this.reporter), res = fn({ foo: 1 });
                    expect(res).toContain("prop");
                    expect(res).toContain(1);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates 'prop', foo + 1", function () {
                    var fn = expression_1.compile("'prop', foo + 1", "__toArray", this.reporter), res = fn({ foo: 1 });
                    expect(res).toContain("prop");
                    expect(res).toContain(2);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates 'prop', foo + bar", function () {
                    var fn = expression_1.compile("'prop', foo + bar", "__toArray", this.reporter), res = fn({ foo: 1, bar: 1 });
                    expect(res).toContain("prop");
                    expect(res).toContain(2);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates 'prop', foo === 'foo'", function () {
                    var fn = expression_1.compile("'prop', foo === 'foo'", "__toArray", this.reporter), res = fn({ foo: "foo" });
                    expect(res).toContain("prop");
                    expect(res).toContain(true);
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates foo, bar", function () {
                    var fn = expression_1.compile("foo, bar", "__toArray", this.reporter), res = fn({ foo: "foo", bar: "bar" });
                    expect(res).toContain("foo");
                    expect(res).toContain("bar");
                    expect(this.reporter.isParsed()).toBe(true);
                });
                it("evaluates this.className - reports parser missed", function () {
                    var el = document.createElement("div"), fn = expression_1.compile("this.className", "", this.reporter), res = fn.call(el, {}), msg = this.reporter.get("errors")[0];
                    expect(msg.startsWith("NGT0001")).toBe(true);
                });
            });
            describe("data sync", function () {
                it("evaluates `foo` { foo: true }", function () {
                    var fn = expression_1.compile("foo", "Boolean", this.reporter);
                    expect(fn({ foo: true })).toBe(true);
                    expect(this.reporter.get("tokens").length).toBe(1);
                });
                it("evaluates `foo` { foo: false }", function () {
                    var fn = expression_1.compile("foo", "Boolean", this.reporter);
                    expect(fn({ foo: false })).toBe(false);
                });
                it("evaluates `foo` { foo: `foo` }", function () {
                    var fn = expression_1.compile("foo", "String", this.reporter);
                    expect(fn({ foo: "foo" })).toBe("foo");
                });
                it("evaluates `foo` { foo: `'foo'` }", function () {
                    var fn = expression_1.compile("foo", "String", this.reporter);
                    expect(fn({ foo: "'foo'" })).toBe("'foo'");
                });
            });
        });
        describe("tryOptimalStrategy", function () {
            it("evaluates foo + bar", function () {
                var fn = expression_1.tryOptimalStrategy("foo + bar", "", this.reporter), res = fn({ foo: 2, bar: 3 });
                expect(res).toBe(5);
                expect(this.reporter.get().tokens.length).toBe(3);
            });
            it("evaluates foo", function () {
                var fn = expression_1.tryOptimalStrategy("foo", "", this.reporter), res = fn({ foo: 2 });
                expect(res).toBe(2);
                expect(this.reporter.get().tokens.length).toBe(1);
            });
            it("evaluates foo with wrapper Boolean", function () {
                var fn = expression_1.tryOptimalStrategy("foo", "Boolean", this.reporter), res = fn({ foo: 2 });
                expect(res).toBe(true);
            });
            it("evaluates foo with wrapper String", function () {
                var fn = expression_1.tryOptimalStrategy("foo", "String", this.reporter), res = fn({ foo: 2 });
                expect(res).toBe("2");
            });
        });
        describe("tryGroupStrategy", function () {
            it("evaluates foo, bar", function () {
                var fn = expression_1.tryGroupStrategy("foo, bar", this.reporter), res = fn({ foo: 2, bar: 3 });
                expect(res).toContain(2);
                expect(res).toContain(3);
                expect(this.reporter.get().tokens.length).toBe(2);
            });
            it("evaluates foo, bar", function () {
                var fn = expression_1.tryGroupStrategy("foo + 2, bar + 2", this.reporter), res = fn({ foo: 2, bar: 3 });
                expect(res).toContain(4);
                expect(res).toContain(5);
                expect(this.reporter.get().tokens.length).toBe(6);
            });
        });
        describe("fallbackStrategy", function () {
            it("evaluates foo, bar", function () {
                var fn = expression_1.fallbackStrategy("foo + bar", "", this.reporter), res = fn({ foo: 2, bar: 3 });
                expect(res).toBe(5);
            });
            it("evaluates foo, bar", function () {
                var fn = expression_1.fallbackStrategy("foo, bar", "__toArray", this.reporter), res = fn({ foo: 2, bar: 3 });
                expect(res).toContain(2);
                expect(res).toContain(3);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExpressionSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ngtemplate.spec.js", function( _require, exports, module, global ){
"use strict";
var ngif_1 = _require( "tests/build/tests/spec/ng-template/ngif.js" );
var ngel_1 = _require( "tests/build/tests/spec/ng-template/ngel.js" );
var ngclass_1 = _require( "tests/build/tests/spec/ng-template/ngclass.js" );
var ngprop_1 = _require( "tests/build/tests/spec/ng-template/ngprop.js" );
var ngattr_1 = _require( "tests/build/tests/spec/ng-template/ngattr.js" );
var ngdata_1 = _require( "tests/build/tests/spec/ng-template/ngdata.js" );
var ngtext_1 = _require( "tests/build/tests/spec/ng-template/ngtext.js" );
var ngfor_1 = _require( "tests/build/tests/spec/ng-template/ngfor.js" );
var ngswitch_1 = _require( "tests/build/tests/spec/ng-template/ngswitch.js" );
var transform_1 = _require( "tests/build/tests/spec/ng-template/transform.js" );
var smarteval_1 = _require( "tests/build/tests/spec/ng-template/smarteval.js" );
var report_1 = _require( "tests/build/tests/spec/ng-template/report.js" );
function NgTemplateSpec() {
    describe("NgTemplate", function () {
        ngif_1.default.call(this);
        ngel_1.default.call(this);
        ngclass_1.default.call(this);
        ngprop_1.default.call(this);
        ngattr_1.default.call(this);
        ngdata_1.default.call(this);
        ngtext_1.default.call(this);
        ngfor_1.default.call(this);
        ngswitch_1.default.call(this);
        transform_1.default.call(this);
        smarteval_1.default.call(this);
        report_1.default.call(this);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgTemplateSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/constructor.spec.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function ConstructorSpec() {
    describe("Constructor", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        describe("Options", function () {
            it("invokes the passed callbacks", function () {
                var called = [];
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text=\"foo\"></i>", {
                    willMount: function () {
                        called.push("willMount");
                    },
                    didMount: function () {
                        called.push("didMount");
                    }
                })
                    .sync({ foo: "foo" });
                expect(called).toContain("willMount");
                expect(called).toContain("didMount");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConstructorSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ngtemplate.js", function( _require, exports, module, global ){
"use strict";
var ngif_1 = _require( "tests/build/src/ng-template/ngif.js" );
var ngel_1 = _require( "tests/build/src/ng-template/ngel.js" );
var ngtext_1 = _require( "tests/build/src/ng-template/ngtext.js" );
var ngfor_1 = _require( "tests/build/src/ng-template/ngfor.js" );
var ngswitch_1 = _require( "tests/build/src/ng-template/ngswitch.js" );
var ngswitchcase_1 = _require( "tests/build/src/ng-template/ngswitchcase.js" );
var ngswitchcasedefault_1 = _require( "tests/build/src/ng-template/ngswitchcasedefault.js" );
var ngclass_1 = _require( "tests/build/src/ng-template/ngclass.js" );
var ngprop_1 = _require( "tests/build/src/ng-template/ngprop.js" );
var ngattr_1 = _require( "tests/build/src/ng-template/ngattr.js" );
var ngdata_1 = _require( "tests/build/src/ng-template/ngdata.js" );
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var reporter_1 = _require( "tests/build/src/ng-template/reporter.js" );
var REPEATING_DIR_LIMIT = 9; // 0-9
var DIRECTIVES = [ngfor_1.NgFor, ngswitch_1.NgSwitch, ngswitchcase_1.NgSwitchCase, ngswitchcasedefault_1.NgSwitchCaseDefault, ngif_1.NgIf,
    ngclass_1.NgClass, ngdata_1.NgData, ngprop_1.NgProp, ngattr_1.NgAttr, ngel_1.NgEl, ngtext_1.NgText], counter = 0;
var NgTemplate = (function () {
    /**
     * Initialize template for a given Element
     * If template passed, load it into the Element
     */
    function NgTemplate(el, template, options) {
        if (options === void 0) { options = {}; }
        this.el = el;
        this.template = template;
        this.options = options;
        this.directives = [];
        this.isMounted = false;
        if (!this.el) {
            throw new exception_1.Exception("(NgTemplate) Invalid first parameter: must be an existing DOM node");
        }
        this.id = "id" + (++counter);
        this.reporter = new reporter_1.Reporter();
        this.template || this.init(DIRECTIVES);
    }
    NgTemplate.factory = function (el, template, options) {
        return new NgTemplate(el, template || null, options);
    };
    NgTemplate.prototype.swapDirectives = function (el, selector, inx) {
        var rSel = "data-" + selector + "-" + inx, oSel = "data-" + selector, exp = el.getAttribute(rSel);
        el.setAttribute(oSel, exp);
        el.removeAttribute(rSel);
    };
    NgTemplate.prototype.assignRepeatingDirectives = function (Directive) {
        var _this = this;
        var inx = -1;
        if (Directive.selector) {
            while (inx++ < REPEATING_DIR_LIMIT) {
                var rSel = "[data-" + Directive.selector + "-" + inx + "]", list = Array.from(this.el.querySelectorAll(rSel));
                if (this.el.matches(rSel)) {
                    list.push(this.el);
                }
                if (!list) {
                    return;
                }
                list.forEach(function (el) {
                    _this.swapDirectives(el, Directive.selector, inx);
                });
                this.directives.push(new Directive(this.el, this.reporter));
            }
        }
    };
    NgTemplate.prototype.init = function (directives) {
        var _this = this;
        directives.forEach(function (Directive) {
            _this.directives.push(new Directive(_this.el, _this.reporter));
            _this.assignRepeatingDirectives(Directive);
        });
    };
    NgTemplate.prototype.report = function () {
        return this.reporter.get();
    };
    NgTemplate.prototype.sync = function (data) {
        // Late initialization: renders from a given template on first sync
        if (this.template) {
            typeof this.options.willMount === "function" && this.options.willMount();
            this.el.innerHTML = this.template;
            this.init(DIRECTIVES);
            this.template = null;
        }
        this.directives.forEach(function (d) {
            d.sync(data, NgTemplate);
        });
        if (!this.isMounted) {
            typeof this.options.didMount === "function" && this.options.didMount();
            this.isMounted = true;
        }
        return this;
    };
    NgTemplate.prototype.pipe = function (cb, context) {
        if (context === void 0) { context = this; }
        cb.call(context, this.el, this.reporter);
        return this;
    };
    return NgTemplate;
}());
exports.NgTemplate = NgTemplate;
// element.matches polyfill
// @link https://developer.mozilla.org/en/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
    var eProto = Element.prototype;
    Element.prototype.matches =
        eProto.matchesSelector ||
            eProto.mozMatchesSelector ||
            eProto.msMatchesSelector ||
            eProto.oMatchesSelector ||
            eProto.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
}

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/expression/parser.js", function( _require, exports, module, global ){
"use strict";
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
var Parser = (function () {
    function Parser() {
    }
    Parser.split = function (expr) {
        var re = /(\+|\-|\<|\>|===|==|\!==|\!=|\&\&|\|\|)/;
        return expr
            .split(re)
            .map(function (i) { return i.trim(); })
            .filter(function (i) { return Boolean(i); });
    };
    Parser.parse = function (expr) {
        // if the whole expr is a string
        if (tokenizer_1.StringToken.valid(expr)) {
            var token = tokenizer_1.tokenizer(expr.trim());
            return [token];
        }
        var com = Parser.split(expr);
        // case 3: foo + bar
        // case 1: foo (no operators found)
        if (com.length !== 3 && com.length !== 1) {
            return [];
        }
        var tokens = com.map(function (i) { return tokenizer_1.tokenizer(i); });
        // any of tokens is invalid
        if (tokens.find(function (i) { return i instanceof tokenizer_1.InvalidToken; })) {
            return [];
        }
        return tokens;
    };
    return Parser;
}());
exports.Parser = Parser;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/test.util.js", function( _require, exports, module, global ){
"use strict";
exports.observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    return function (el, callback) {
        if (MutationObserver) {
            // define a new observer
            var observer = new MutationObserver(function (mutations) {
                var matches = mutations.filter(function (mutation) {
                    return mutation.addedNodes.length ||
                        mutation.removedNodes.length || mutation.type === "attributes";
                });
                if (matches.length) {
                    callback();
                }
            });
            // have the observer observe foo for changes in children
            observer.observe(el, { childList: true, subtree: true, attributes: true, characterData: true });
            return;
        }
        [
            "DOMNodeInserted",
            "DOMNodeRemoved",
            "DOMSubtreeModified",
            "DOMAttrModified",
            "DOMAttributeNameChanged",
            "DOMCharacterDataModified"
        ].forEach(function (ev) {
            el.addEventListener(ev, callback, false);
        });
    };
})();

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/expression/tokenizer.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exception_1 = _require( "tests/build/src/ng-template/expression/exception.js" );
var Token = (function () {
    function Token(value, negation) {
        if (negation === void 0) { negation = false; }
        this.value = value;
        this.negation = negation;
        this.name = "Token";
    }
    Token.prototype.resolveValue = function (data) {
    };
    Token.prototype.toJSON = function () {
        return {
            "type": this.name,
            "value": this.value,
            "negation": this.negation
        };
    };
    return Token;
}());
exports.Token = Token;
var InvalidToken = (function (_super) {
    __extends(InvalidToken, _super);
    function InvalidToken() {
        _super.apply(this, arguments);
        this.name = "InvalidToken";
    }
    return InvalidToken;
}(Token));
exports.InvalidToken = InvalidToken;
var OperatorToken = (function (_super) {
    __extends(OperatorToken, _super);
    function OperatorToken() {
        _super.apply(this, arguments);
        this.name = "OperatorToken";
    }
    OperatorToken.valid = function (value) {
        var re = /^(\+|\-|\<|\>|===|==|\!==|\!=|\&\&|\|\|)$/;
        return re.test(value);
    };
    return OperatorToken;
}(Token));
exports.OperatorToken = OperatorToken;
var StringToken = (function (_super) {
    __extends(StringToken, _super);
    function StringToken() {
        _super.apply(this, arguments);
        this.name = "StringToken";
    }
    StringToken.valid = function (value) {
        var single = /^\'[^\']+\'$/i, double = /^\"[^\"]+\"$/i;
        return single.test(value) || double.test(value);
    };
    StringToken.prototype.resolveValue = function (data) {
        var val = this.value;
        return val.substr(1, val.length - 2);
    };
    return StringToken;
}(Token));
exports.StringToken = StringToken;
var NumberToken = (function (_super) {
    __extends(NumberToken, _super);
    function NumberToken() {
        _super.apply(this, arguments);
        this.name = "NumberToken";
    }
    NumberToken.valid = function (value) {
        var re = /^\d+$/;
        return re.test(value);
    };
    NumberToken.prototype.resolveValue = function (data) {
        var val = Number(this.value);
        return this.negation ? !val : val;
    };
    return NumberToken;
}(Token));
exports.NumberToken = NumberToken;
var BooleanToken = (function (_super) {
    __extends(BooleanToken, _super);
    function BooleanToken() {
        _super.apply(this, arguments);
        this.name = "BooleanToken";
    }
    BooleanToken.valid = function (value) {
        var re = /^(true|false)$/i;
        return re.test(value);
    };
    BooleanToken.prototype.resolveValue = function (data) {
        var val = this.value.toUpperCase() === "TRUE";
        return this.negation ? !val : val;
    };
    return BooleanToken;
}(Token));
exports.BooleanToken = BooleanToken;
var ReferenceToken = (function (_super) {
    __extends(ReferenceToken, _super);
    function ReferenceToken() {
        _super.apply(this, arguments);
        this.name = "ReferenceToken";
    }
    ReferenceToken.valid = function (value) {
        var re = /^[a-zA-Z_\$][a-zA-Z0-9\._\$]+$/;
        return value.substr(0, 5) !== "this." && re.test(value);
    };
    ReferenceToken.findValue = function (path, data) {
        var value = data;
        path.split("\.").forEach(function (key) {
            if (typeof value !== "object") {
                throw new exception_1.ExpressionException("'" + path + "' is undefined");
            }
            if (!(key in value)) {
                throw new exception_1.ExpressionException("'" + path + "' is undefined");
            }
            value = value[key];
        });
        return value;
    };
    ReferenceToken.prototype.resolveValue = function (data) {
        var val = ReferenceToken.findValue(this.value, data);
        return this.negation ? !val : val;
    };
    return ReferenceToken;
}(Token));
exports.ReferenceToken = ReferenceToken;
/**
 * Removes leading negotiation
 */
function removeNegotiation(value) {
    var re = /^\!\s*/;
    return value.replace(re, "");
}
function tokenizer(rawValue) {
    var value = removeNegotiation(rawValue), negation = rawValue !== value;
    switch (true) {
        case OperatorToken.valid(rawValue):
            return new OperatorToken(rawValue, false);
        case StringToken.valid(value):
            return new StringToken(value, negation);
        case NumberToken.valid(value):
            return new NumberToken(value, negation);
        case BooleanToken.valid(value):
            return new BooleanToken(value, negation);
        case ReferenceToken.valid(value):
            return new ReferenceToken(value, negation);
        default:
            return new InvalidToken(value, negation);
    }
}
exports.tokenizer = tokenizer;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/abstract-directive.js", function( _require, exports, module, global ){
"use strict";
var expression_1 = _require( "tests/build/src/ng-template/expression.js" );
var cache_1 = _require( "tests/build/src/ng-template/cache.js" );
var AbstractDirective = (function () {
    function AbstractDirective(el, reporter) {
    }
    AbstractDirective.prototype.initNodes = function (el, identifier, cb) {
        var datakey = this.getDataKey(identifier), selector = this.getSelector(identifier), targets = (el.matches(selector)
            ? [el] : Array.from(el.querySelectorAll(selector)));
        return targets.map(function (el) {
            var expr = el.dataset[datakey];
            delete el.dataset[datakey];
            return cb(el, expr, expression_1.compile, new cache_1.Cache());
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

_require.def( "tests/build/src/ng-template/ngfor.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var constants_1 = _require( "tests/build/src/ng-template/constants.js" );
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
var exception_2 = _require( "tests/build/src/ng-template/expression/exception.js" );
var DATA_ID_KEY = "id";
var counter = 0;
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>
var NgFor = (function (_super) {
    __extends(NgFor, _super);
    function NgFor(el, reporter) {
        var _this = this;
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-for", function (node, expr, compile, cache) {
            var parsed = _this.parseExpr(expr), outerHTML, id = "id" + (++counter);
            node.dataset["ngForScope"] = id;
            outerHTML = node.outerHTML;
            // Do not process directives on the first level as all of them about elements generated by ngFor
            ["ngSwitch", "ngSwitchCase", "ngSwitchCaseDefault", "ngIf",
                "ngClass", "ngData", "ngProp", "ngAttr", "ngEl", "ngText"].forEach(function (key) {
                if (node.dataset[key]) {
                    delete node.dataset[key];
                }
            });
            return {
                el: node,
                parentNode: node.parentNode,
                outerHTML: outerHTML,
                id: id,
                indexable: false,
                variable: parsed.variable,
                items: [],
                cache: cache,
                exp: function (data, cb) {
                    var it = [];
                    try {
                        it = tokenizer_1.ReferenceToken.findValue(parsed.iterable, data);
                    }
                    catch (err) {
                        if (!(err instanceof exception_2.ExpressionException)) {
                            throw new exception_1.Exception("Invalid ng* expression " + expr);
                        }
                        reporter.addLog((constants_1.ERROR_CODES.NGT0003 + ": ") + err.message);
                    }
                    if (!Array.isArray(it)) {
                        it = [];
                    }
                    return it;
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
    NgFor.createParentEl = function (tag) {
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
        var child = tag.toUpperCase(), parent = child in map ? map[child] : "div";
        return document.createElement(parent);
    };
    NgFor.prototype.removeIndexable = function (node, it) {
        return node.items.filter(function (instance) {
            return it.find(function (val) {
                return instance.id === val[DATA_ID_KEY];
            });
        });
    };
    NgFor.prototype.sync = function (data, Ctor) {
        var _this = this;
        this.nodes.forEach(function (node) {
            var it = node.exp(data);
            if (node.cache.match(JSON.stringify(it))) {
                return false;
            }
            // reduce: collection changed, it's a special case
            // if we have indexes (id) then we go still gacefully, we remove  particular nodes from the list
            // if not, we updateth list
            if (node.items.length > it.length) {
                node.items = node.indexable ? _this.removeIndexable(node, it) : [];
            }
            // expand: update every item and add new ones
            if (node.items.length < it.length) {
                var num = it.length - node.items.length;
                while (num--) {
                    var el = NgFor.createEl(node.el.tagName, node.outerHTML);
                    node.items.push(new Ctor(el));
                }
            }
            // sync
            it.forEach(function (val, inx) {
                var item = node.items[inx];
                data[node.variable] = val;
                item.sync(data);
                if (val && typeof val === "object" && DATA_ID_KEY in val) {
                    item.id = val[DATA_ID_KEY];
                    node.indexable = true;
                }
            });
            _this.buildDOM(node);
        });
    };
    NgFor.createEl = function (tag, html) {
        var parent = NgFor.createParentEl(tag);
        parent.innerHTML = html;
        return parent.firstElementChild;
    };
    NgFor.prototype.buildDOM = function (node) {
        var items = Array.from(node.parentNode.querySelectorAll("[data-ng-for-scope=\"" + node.id + "\"]")), anchor = document.createElement("ng");
        node.parentNode.insertBefore(anchor, items[0]);
        anchor.dataset["ngForScope"] = node.id;
        items.forEach(function (child) {
            node.parentNode.removeChild(child);
        });
        node.items.forEach(function (item) {
            node.parentNode.insertBefore(item.el, anchor);
        });
        node.parentNode.removeChild(anchor);
    };
    return NgFor;
}(abstract_directive_1.AbstractDirective));
exports.NgFor = NgFor;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/reporter.js", function( _require, exports, module, global ){
"use strict";
var Reporter = (function () {
    function Reporter() {
        this.data = {
            errors: [],
            log: [],
            tokens: []
        };
    }
    Reporter.prototype.addError = function (msg) {
        this.data.errors.push(msg);
    };
    Reporter.prototype.addLog = function (msg) {
        this.data.log.push(msg);
    };
    Reporter.prototype.addTokens = function (tokens) {
        var merge = tokens.map(function (token) { return token.toJSON(); });
        this.data.tokens = this.data.tokens.concat(merge);
    };
    Reporter.prototype.get = function (key) {
        return key ? this.data[key] : this.data;
    };
    Reporter.prototype.isParsed = function () {
        return this.data.tokens.length > 0;
    };
    return Reporter;
}());
exports.Reporter = Reporter;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/expression.js", function( _require, exports, module, global ){
"use strict";
var constants_1 = _require( "tests/build/src/ng-template/constants.js" );
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var exception_2 = _require( "tests/build/src/ng-template/expression/exception.js" );
var parser_1 = _require( "tests/build/src/ng-template/expression/parser.js" );
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
/**
 * Calc value in a composite xpression such as `foo + bb`
 */
function reduceComposite(tokens, data) {
    if (tokens.length === 1) {
        var token = tokens[0];
        return token.resolveValue(data);
    }
    var left = tokens[0], leftVal = left.resolveValue(data), operator = tokens[1], right = tokens[2], rightVal = right.resolveValue(data);
    if (!(operator instanceof tokenizer_1.OperatorToken)) {
        throw new exception_1.Exception("Invalid operator " + operator.value + " in ng* expression");
    }
    switch (operator.value) {
        case "+":
            return leftVal + rightVal;
        case "-":
            return leftVal - rightVal;
        case "<":
            return leftVal < rightVal;
        case ">":
            return leftVal > rightVal;
        case "===":
            return leftVal === rightVal;
        case "==":
            return leftVal === rightVal;
        case "!==":
            return leftVal !== rightVal;
        case "!=":
            return leftVal !== rightVal;
        case "&&":
            return leftVal && rightVal;
        case "||":
            return leftVal || rightVal;
    }
}
/**
 * Wrap as requested by the consumer object
 */
function wrap(value, wrapper) {
    switch (wrapper) {
        case "String":
            return String(value);
        case "Boolean":
            return Boolean(value);
        default:
            return value;
    }
}
/**
 * Throw an error or silently report the exception
 */
function treatException(err, expr, reporter) {
    if (!(err instanceof exception_2.ExpressionException)) {
        throw new exception_1.Exception("Invalid ng* expression " + expr);
    }
    reporter.addLog((constants_1.ERROR_CODES.NGT0003 + ": ") + err.message);
}
/**
 * Create evaluation function for expressions like "prop, value"
 */
function tryGroupStrategy(expr, reporter) {
    var leftExpr, rightExpr;
    if (expr.indexOf(",") === -1) {
        throw new exception_1.Exception("Group expression must have syntax: 'foo, bar'");
    }
    _a = expr.split(","), leftExpr = _a[0], rightExpr = _a[1];
    var leftTokens = parser_1.Parser.parse(leftExpr), rightTokens = parser_1.Parser.parse(rightExpr);
    if (!leftTokens.length) {
        throw new exception_2.ExpressionException("Cannot parse expression " + leftExpr);
    }
    if (!rightTokens.length) {
        throw new exception_2.ExpressionException("Cannot parse expression " + rightExpr);
    }
    reporter.addTokens(leftTokens);
    reporter.addTokens(rightTokens);
    return function (data) {
        try {
            return [reduceComposite(leftTokens, data), reduceComposite(rightTokens, data)];
        }
        catch (err) {
            treatException(err, expr, reporter);
            return ["", ""];
        }
    };
    var _a;
}
exports.tryGroupStrategy = tryGroupStrategy;
/**
 * Create evaluation function for expressions like "value" or "value + value"
 */
function tryOptimalStrategy(expr, wrapper, reporter) {
    if (wrapper === void 0) { wrapper = ""; }
    var tokens = parser_1.Parser.parse(expr);
    if (!tokens.length) {
        throw new exception_2.ExpressionException("Cannot parse expression " + expr);
    }
    reporter.addTokens(tokens);
    return function (data) {
        // Here we do not need to keep the el context - whenver this. encountered it jumps to fallback strategy
        try {
            return wrap(reduceComposite(tokens, data), wrapper);
        }
        catch (err) {
            treatException(err, expr, reporter);
            return "";
        }
    };
}
exports.tryOptimalStrategy = tryOptimalStrategy;
/**
 * Create evaluation function for any expression by using eval
 */
function fallbackStrategy(expr, wrapper, reporter) {
    if (wrapper === void 0) { wrapper = ""; }
    // make available in the closure
    var __toArray = function () {
        return [].slice.call(arguments);
    }, 
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
            reporter.addError(constants_1.ERROR_CODES.NGT0002 + ": Could not evaluate " + code);
        }
    };
    return func;
}
exports.fallbackStrategy = fallbackStrategy;
function compile(expr, wrapper, reporter) {
    if (wrapper === void 0) { wrapper = ""; }
    try {
        if (wrapper === "__toArray") {
            return tryGroupStrategy(expr, reporter);
        }
        return tryOptimalStrategy(expr, wrapper, reporter);
    }
    catch (err) {
        if (!(err instanceof exception_2.ExpressionException)) {
            throw new exception_1.Exception(err.message);
        }
    }
    reporter.addError(constants_1.ERROR_CODES.NGT0001 + ": Could not parse the expression, going eval()");
    return fallbackStrategy.call(this, expr, wrapper, reporter);
}
exports.compile = compile;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngif.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgIfSpec() {
    describe("ng-if directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("removes the target from the DOM when expression is false", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                .sync({ invalid: false })
                .pipe(function (el) {
                // changed to: <ng style="display: none; "></ng>
                expect(el.innerHTML).not.toMatch("Error");
                expect(el.innerHTML).toMatch("display");
            });
        });
        it("restores the target after removal when expression changes", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                .sync({ invalid: false })
                .pipe(function (el) {
                expect(el.innerHTML.indexOf("Error") === -1).toBe(true);
            }, this)
                .sync({ invalid: true })
                .pipe(function (el) {
                expect(el.innerHTML.indexOf("Error") !== -1).toBe(true);
            });
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgIfSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngel.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgElSpec() {
    describe("ng-el directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates expression on element (string literal)", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>")
                .sync({})
                .pipe(function (el, reporter) {
                expect(el.innerHTML).not.toMatch("Pristine");
                expect(el.innerHTML).toMatch("New value");
            });
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgElSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngclass.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgClassSpec() {
    describe("ng-class directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-class=\"'is-hidden', isHidden\"></span>")
                .sync({ isHidden: true })
                .pipe(function (el) {
                expect(el.innerHTML).toBe("<span class=\"is-hidden\"></span>");
            });
        });
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-class=\"'foo', foo\" data-ng-class-0=\"'bar', bar\"></span>")
                .sync({ foo: true, bar: true })
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.classList.contains("foo")).toBeTruthy();
                expect(target.classList.contains("bar")).toBeTruthy();
            })
                .sync({ foo: false, bar: true })
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.classList.contains("foo")).not.toBeTruthy();
                expect(target.classList.contains("bar")).toBeTruthy();
            });
        });
        it("processes many repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-class=\"'foo', foo\"\n            data-ng-class-0=\"'bar', bar\"\n            data-ng-class-8=\"'baz', baz\"></span>")
                .sync({ foo: true, bar: true, baz: true })
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.classList.contains("foo")).toBeTruthy();
                expect(target.classList.contains("bar")).toBeTruthy();
                expect(target.classList.contains("baz")).toBeTruthy();
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgClassSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngprop.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgPropSpec() {
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
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-prop=\"'lang', 'en'\"\n            data-ng-prop-0=\"'title', 'title'\"\n            data-ng-prop-8=\"'dir', 'auto'\"></span>")
                .sync({})
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.lang).toBe("en");
                expect(target.title).toBe("title");
                expect(target.dir).toBe("auto");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgPropSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngattr.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgAttrSpec() {
    describe("ng-attr directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<input data-ng-attr=\"'required', required\">")
                .sync({ required: true })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.hasAttribute("required")).toBe(true);
            })
                .sync({ required: false })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.hasAttribute("required")).toBe(false);
            });
        });
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-attr=\"'lang', 'en'\"\n            data-ng-attr-0=\"'title', 'title'\"\n            data-ng-attr-8=\"'dir', 'auto'\"></span>")
                .sync({})
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.lang).toBe("en");
                expect(target.title).toBe("title");
                expect(target.dir).toBe("auto");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgAttrSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngdata.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgDataSpec() {
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
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-data=\"'lang', 'en'\"\n            data-ng-data-0=\"'title', 'title'\"\n            data-ng-data-8=\"'dir', 'auto'\"></span>")
                .sync({})
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.dataset["lang"]).toBe("en");
                expect(target.dataset["title"]).toBe("title");
                expect(target.dataset["dir"]).toBe("auto");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgDataSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngtext.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgElSpec() {
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgElSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngfor.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgForSpec() {
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
        it("generates nodes on structure", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of foo.bar.baz\" data-ng-text=\"row\"></i>")
                .sync({ foo: { bar: { baz: ["foo", "bar", "baz"]
                    } }
            });
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
        it("does not break on reducing", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                .sync({ rows: [
                    { name: "foo" },
                    { name: "bar" },
                    { name: "baz" }
                ] })
                .sync({ rows: [
                    { name: "foo1" },
                    { name: "bar1" }
                ] })
                .pipe(function (el) {
                var els = el.querySelectorAll("i");
                expect(els.length).toBe(2);
                expect(els.item(0).innerHTML).toBe("foo1");
                expect(els.item(1).innerHTML).toBe("bar1");
            });
        });
        it("does not break on expanding", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                .sync({ rows: [
                    { name: "foo" },
                    { name: "bar" }
                ] })
                .sync({ rows: [
                    { name: "foo1" },
                    { name: "bar1" },
                    { name: "baz1" }
                ] })
                .pipe(function (el) {
                var els = el.querySelectorAll("i");
                expect(els.length).toBe(3);
                expect(els.item(0).innerHTML).toBe("foo1");
                expect(els.item(1).innerHTML).toBe("bar1");
                expect(els.item(2).innerHTML).toBe("baz1");
            });
        });
        it("does not kill the state of generated items", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\"><input data-ng-data=\"'name', row.name\" /></i>")
                .sync({ rows: [
                    { name: "foo" }
                ] })
                .pipe(function (el) {
                el.querySelector("input").value = "foo";
            })
                .sync({ rows: [
                    { name: "bar" }
                ] })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.dataset["name"]).toBe("bar");
                expect(input.value).toBe("foo");
            });
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
        it("reduces an indexable list gracefully", function () {
            var firstPasssNodes, secondPasssNodes;
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\"></i>")
                .sync({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }] })
                .pipe(function (el) {
                firstPasssNodes = Array.from(el.children);
                expect(firstPasssNodes.length).toBe(3);
            })
                .sync({ rows: [{ id: 1 }, { id: 3 }] })
                .pipe(function (el) {
                secondPasssNodes = Array.from(el.children);
                expect(secondPasssNodes.length).toBe(2);
                expect(firstPasssNodes[0]).toBe(secondPasssNodes[0]);
                expect(firstPasssNodes[2]).toBe(secondPasssNodes[1]);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgForSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/ngswitch.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function NgSwitchSpec() {
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgSwitchSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/transform.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function TransformSpec() {
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TransformSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/smarteval.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function SmartEvalSpec() {
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SmartEvalSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/tests/spec/ng-template/report.js", function( _require, exports, module, global ){
"use strict";
var ngtemplate_1 = _require( "tests/build/src/ngtemplate.js" );
function ReportSpec() {
    describe("#report", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement (general)", function () {
            var report = ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-text=\"foo.bar.baz\"></span>")
                .sync({ foo: 10 })
                .report();
            expect(report.log.length).toBe(1);
        });
        it("evaluates the statement (ngFor)", function () {
            var report = ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-for=\"let item of foo.bar.baz\"></span>")
                .sync({})
                .report();
            expect(report.log.length).toBe(1);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportSpec;

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
    function NgEl(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-el", function (node, expr, compile) {
            return {
                el: node,
                exp: compile(expr, "", reporter)
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
    function NgIf(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-if", function (node, expr, compile, cache) {
            return {
                el: node,
                anchor: document.createElement("ng"),
                exp: compile(expr, "Boolean", reporter),
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
    function NgText(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-text", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "String", reporter),
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
    function NgSwitch(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-switch", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "", reporter),
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
    function NgSwitchCase(el, reporter) {
        _super.call(this, el, reporter);
        this.el = el;
        this.nodes = this.initNodes(el, "ng-switch-case", function (node, expr, compile) {
            return {
                el: node,
                outerHTML: node.outerHTML,
                exp: compile(expr, "", reporter)
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
    function NgSwitchCaseDefault(el, reporter) {
        _super.call(this, el, reporter);
        this.el = el;
        this.nodes = this.initNodes(el, "ng-switch-case-default", function (node, expr, compile) {
            return {
                el: node,
                outerHTML: node.outerHTML,
                exp: compile(expr, "", reporter)
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

_require.def( "tests/build/src/ng-template/ngclass.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <i data-ng-class="'is-hidden', isHidden"></i>
 */
var NgClass = (function (_super) {
    __extends(NgClass, _super);
    function NgClass(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, NgClass.selector, function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "__toArray", reporter),
                cache: cache
            };
        });
    }
    NgClass.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (args) {
                args[0] && node.el.classList.toggle(args[0], Boolean(args[1]));
            });
        });
    };
    NgClass.selector = "ng-class";
    return NgClass;
}(abstract_directive_1.AbstractDirective));
exports.NgClass = NgClass;

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
    function NgProp(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-prop", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "__toArray", reporter),
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
    NgProp.selector = "ng-prop";
    return NgProp;
}(abstract_directive_1.AbstractDirective));
exports.NgProp = NgProp;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/ngattr.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_directive_1 = _require( "tests/build/src/ng-template/abstract-directive.js" );
/**
 * <i data-ng-attr="'checked', true"></i>
 */
var NgAttr = (function (_super) {
    __extends(NgAttr, _super);
    function NgAttr(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-attr", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "__toArray", reporter),
                cache: cache
            };
        });
    }
    NgAttr.prototype.sync = function (data) {
        this.nodes.forEach(function (node) {
            node.cache.evaluate(node.exp.call(node.el, data), function (args) {
                var el = node.el;
                if (!args[1]) {
                    return el.removeAttribute(args[0]);
                }
                el.setAttribute(args[0], args[1]);
            });
        });
    };
    NgAttr.selector = "ng-attr";
    return NgAttr;
}(abstract_directive_1.AbstractDirective));
exports.NgAttr = NgAttr;

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
    function NgData(el, reporter) {
        _super.call(this, el, reporter);
        this.nodes = this.initNodes(el, "ng-data", function (node, expr, compile, cache) {
            return {
                el: node,
                exp: compile(expr, "__toArray", reporter),
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
    NgData.selector = "ng-data";
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

_require.def( "tests/build/src/ng-template/expression/exception.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var ExpressionException = (function (_super) {
    __extends(ExpressionException, _super);
    function ExpressionException(message) {
        _super.call(this, message);
        this.name = "NgTemplateExpressionException",
            this.message = message;
    }
    return ExpressionException;
}(exception_1.Exception));
exports.ExpressionException = ExpressionException;

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

_require.def( "tests/build/src/ng-template/constants.js", function( _require, exports, module, global ){
"use strict";
// Do not dare yet to go with Symbol - TS doesn't transpile them and support isn't good yet
exports.ERROR_CODES = {
    NGT0001: "NGT0001",
    NGT0002: "NGT0002",
    NGT0003: "NGT0003"
};

  module.exports = exports;


  return module;
});

(function(){
_require( "tests/build/tests/index.spec.js" );
}());
}());