"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tokenizer_1 = require("./tokenizer");
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
        var reQuote = /[\'\"]/i;
        // If it has a string, too risky to parse for composite
        if (reQuote.test(expr)) {
            var token = tokenizer_1.tokenizer(expr);
            return token instanceof tokenizer_1.InvalidToken ? [] : [token];
        }
        var com = Parser.split(expr);
        // case 3: foo + bar
        // case 1: foo (no operators found)
        if (com.length !== 3 && com.length !== 1) {
            return [];
        }
        return com.map(function (i) { return tokenizer_1.tokenizer(i); });
    };
    return Parser;
}());
exports.Parser = Parser;
