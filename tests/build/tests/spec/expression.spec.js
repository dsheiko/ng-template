"use strict";
var expression_1 = require("../../src/ng-template/expression");
var reporter_1 = require("../../src/ng-template/reporter");
var reporter = new reporter_1.Reporter();
function ExpressionSpec() {
    describe("NgTemplate.expression", function () {
        it("evaluates fn({ foo: true }) => true", function () {
            var fn = expression_1.evaluate("foo", "Boolean", reporter);
            expect(fn({ foo: true })).toBe(true);
        });
        it("evaluates fn({ foo: false }) => false", function () {
            var fn = expression_1.evaluate("foo", "Boolean", reporter);
            expect(fn({ foo: false })).toBe(false);
        });
        it("evaluates fn({ foo: 'foo' }) => foo", function () {
            var fn = expression_1.evaluate("foo", "String", reporter);
            expect(fn({ foo: "foo" })).toBe("foo");
        });
        it("evaluates fn({ foo: 'foo' }) => 'foo'", function () {
            var fn = expression_1.evaluate("foo", "String", reporter);
            expect(fn({ foo: "'foo'" })).toBe("'foo'");
        });
    });
    describe("NgTemplate.findValue", function () {
        it("finds value in nested object by a specified path e.g. foo.bar.baz.quiz", function () {
            var data = {
                foo: {
                    bar: {
                        baz: {
                            quiz: "quiz"
                        }
                    }
                }
            }, val = expression_1.findValue("foo.bar.baz.quiz", data);
            expect(val).toBe("quiz");
        });
    });
    describe("NgTemplate.isParsableExpr", function () {
        it("tests foo.bar.baz.quiz", function () {
            var val = expression_1.isParsableExpr("foo.bar.baz.quiz");
            expect(val).toBe(true);
        });
        it("tests $some100_", function () {
            var val = expression_1.isParsableExpr("$some100_");
            expect(val).toBe(true);
        });
        it("tests foo.bar + baz.quiz", function () {
            var val = expression_1.isParsableExpr("foo.bar + baz.quiz");
            expect(val).toBe(false);
        });
    });
    describe("NgTemplate.removeNegotiation", function () {
        it("tests !foo.bar.baz.quiz", function () {
            var val = expression_1.removeNegotiation("!foo.bar.baz.quiz");
            expect(val).toBe("foo.bar.baz.quiz");
        });
        it("tests !  foo.bar.baz.quiz", function () {
            var val = expression_1.removeNegotiation("!  foo.bar.baz.quiz");
            expect(val).toBe("foo.bar.baz.quiz");
        });
        it("tests foo.bar.baz.quiz", function () {
            var val = expression_1.removeNegotiation("foo.bar.baz.quiz");
            expect(val).toBe("foo.bar.baz.quiz");
        });
    });
    describe("NgTemplate.propValueReference", function () {
        it("tests 'prop',variable", function () {
            var fn = expression_1.propValueReference("'prop'", "variable"), ret = fn({ variable: "foo" });
            expect(ret.join(",")).toBe("prop,foo");
        });
        it("tests 'prop',variable", function () {
            var fn = expression_1.propValueReference("'prop'", "foo.bar.baz"), ret = fn({ foo: {
                    bar: {
                        baz: "baz"
                    }
                } });
            expect(ret.join(",")).toBe("prop,baz");
        });
    });
    describe("NgTemplate.getWrapperFunction", function () {
        it("tests Boolean", function () {
            var ret = expression_1.getWrapperFunction("Boolean");
            expect(ret).toBe(Boolean);
        });
    });
    describe("NgTemplate.isNumber", function () {
        it("tests 12345", function () {
            var ret = expression_1.isNumber("12345");
            expect(ret).toBe(true);
        });
        it("tests var12345", function () {
            var ret = expression_1.isNumber("var12345");
            expect(ret).toBe(false);
        });
        it("tests 122 + 12345", function () {
            var ret = expression_1.isNumber("122 + 12345");
            expect(ret).toBe(false);
        });
    });
    describe("NgTemplate.isBool", function () {
        it("tests true", function () {
            var ret = expression_1.isBool("true");
            expect(ret).toBe(true);
        });
        it("tests false", function () {
            var ret = expression_1.isBool("false");
            expect(ret).toBe(true);
        });
        it("tests 12345", function () {
            var ret = expression_1.isBool("12345");
            expect(ret).toBe(false);
        });
    });
    describe("NgTemplate.isString", function () {
        it("tests 'string'", function () {
            var ret = expression_1.isString("'string'");
            expect(ret).toBe(true);
        });
        it("tests \"string\"", function () {
            var ret = expression_1.isString("\"string\"");
            expect(ret).toBe(true);
        });
        it("tests 'string' + 'string'", function () {
            var ret = expression_1.isString("'string' + 'string'");
            expect(ret).toBe(false);
        });
        it("tests 123", function () {
            var ret = expression_1.isString("123");
            expect(ret).toBe(false);
        });
        it("tests var", function () {
            var ret = expression_1.isString("var");
            expect(ret).toBe(false);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExpressionSpec;
