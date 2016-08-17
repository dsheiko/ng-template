"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
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
