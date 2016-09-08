"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
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
