"use strict";
var parser_1 = require("../../../src/ng-template/expression/parser");
var tokenizer_1 = require("../../../src/ng-template/expression/tokenizer");
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
