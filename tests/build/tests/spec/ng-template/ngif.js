"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
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
