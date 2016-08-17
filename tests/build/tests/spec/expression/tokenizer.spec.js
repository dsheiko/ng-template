"use strict";
var tokenizer_1 = require("../../../src/ng-template/expression/tokenizer");
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
