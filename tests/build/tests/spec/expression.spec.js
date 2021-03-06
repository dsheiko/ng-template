"use strict";
var expression_1 = require("../../src/ng-template/expression");
var reporter_1 = require("../../src/ng-template/reporter");
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
