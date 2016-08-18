"use strict";
var expression_1 = require("../../src/ng-template/expression");
var reporter_1 = require("../../src/ng-template/reporter");
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
