"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgClassListToggleSpec() {
    describe("ng-class-list-toggle directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>")
                .sync({ isHidden: true });
            expect(this.el.innerHTML).toBe("<span class=\"is-hidden\"></span>");
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgClassListToggleSpec;
