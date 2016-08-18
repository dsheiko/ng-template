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
var expression_spec_1 = _require( "tests/build/tests/spec/expression.spec.js" );
//ParserSpec();
//TokenizerSpec();
expression_spec_1.default();
//CacheSpec();
//AbstractDirectiveSpec();
//NgForDirectiveSpec();
//NgTemplateSpec(); 


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
        describe("compile", function () {
            beforeEach(function () {
                this.reporter = new reporter_1.Reporter();
            });
            it("evaluates fn({ foo: true }) => true", function () {
                var fn = expression_1.compile("foo", "Boolean", this.reporter);
                expect(fn({ foo: true })).toBe(true);
                console.log(this.reporter.get("tokens"));
            });
            it("evaluates fn({ foo: false }) => false", function () {
                var fn = expression_1.compile("foo", "Boolean", this.reporter);
                expect(fn({ foo: false })).toBe(false);
            });
            it("evaluates fn({ foo: 'foo' }) => foo", function () {
                var fn = expression_1.compile("foo", "String", this.reporter);
                expect(fn({ foo: "foo" })).toBe("foo");
            });
            it("evaluates fn({ foo: 'foo' }) => 'foo'", function () {
                var fn = expression_1.compile("foo", "String", this.reporter);
                expect(fn({ foo: "'foo'" })).toBe("'foo'");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExpressionSpec;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/expression.js", function( _require, exports, module, global ){
"use strict";
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
var parser_1 = _require( "tests/build/src/ng-template/expression/parser.js" );
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
/**
 * Calc value in a composite xpression such as `foo + bb`
 */
function reduceComposite(tokens, data) {
    if (tokens.length === 1) {
        var token = tokens.shift();
        return token.resolveValue(data);
    }
    var left = tokens.shift(), leftVal = left.resolveValue(data), operator = tokens.shift(), right = tokens.shift(), rightVal = right.resolveValue(data);
    if (!(operator instanceof tokenizer_1.OperatorToken)) {
        throw new SyntaxError("Invalid operator " + operator.value + " in ng* expression");
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
            return leftVal == rightVal;
        case "!==":
            return leftVal !== rightVal;
        case "!=":
            return leftVal != rightVal;
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
    if (!(err instanceof exception_1.Exception)) {
        throw new SyntaxError("Invalid ng* expression " + expr);
    }
    reporter.addError(err.message);
}
/**
 * Create evaluation function for expressions like "prop, value"
 */
function tryGroupStrategy(expr, reporter) {
    var leftExpr, rightExpr;
    _a = expr.split(","), leftExpr = _a[0], rightExpr = _a[1];
    var leftTokens = parser_1.Parser.parse(leftExpr), rightTokens = parser_1.Parser.parse(rightExpr);
    if (!leftTokens.length) {
        throw new parser_1.ParserException("Cannot parse expression " + leftExpr);
    }
    if (!rightTokens.length) {
        throw new parser_1.ParserException("Cannot parse expression " + rightExpr);
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
        throw new parser_1.ParserException("Cannot parse expression " + expr);
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
            reporter.addError("Could not evaluate " + code);
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
        if (!(err instanceof parser_1.ParserException)) {
            throw SyntaxError(err.message);
        }
    }
    fallbackStrategy(expr, wrapper, reporter);
}
exports.compile = compile;

  module.exports = exports;


  return module;
});

_require.def( "tests/build/src/ng-template/reporter.js", function( _require, exports, module, global ){
"use strict";
var Reporter = (function () {
    function Reporter() {
        this.data = {
            errors: [],
            tokens: []
        };
    }
    Reporter.prototype.addError = function (msg) {
        this.data.errors.push(msg);
    };
    Reporter.prototype.addTokens = function (tokens) {
        var merge = tokens.map(function (token) { return token.toJSON(); });
        this.data.tokens = this.data.tokens.concat(merge);
    };
    Reporter.prototype.get = function (key) {
        return key ? this.data[key] : this.data;
    };
    return Reporter;
}());
exports.Reporter = Reporter;

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

_require.def( "tests/build/src/ng-template/expression/parser.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tokenizer_1 = _require( "tests/build/src/ng-template/expression/tokenizer.js" );
var ParserException = (function (_super) {
    __extends(ParserException, _super);
    function ParserException(message) {
        _super.call(this, message);
        this.name = "NgTemplateParserException",
            this.message = message;
    }
    return ParserException;
}(Error));
exports.ParserException = ParserException;
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

_require.def( "tests/build/src/ng-template/expression/tokenizer.js", function( _require, exports, module, global ){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exception_1 = _require( "tests/build/src/ng-template/exception.js" );
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
                throw new exception_1.Exception("'" + path + "' is undefined");
            }
            if (!(key in value)) {
                throw new exception_1.Exception("'" + path + "' is undefined");
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
        case OperatorToken.valid(value):
            return new OperatorToken(value, negation);
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

(function(){
_require( "tests/build/tests/index.spec.js" );
}());
}());