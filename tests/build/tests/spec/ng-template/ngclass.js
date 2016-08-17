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
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgClassSpec;
