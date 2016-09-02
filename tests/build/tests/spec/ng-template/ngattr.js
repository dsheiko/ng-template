"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgAttrSpec() {
    describe("ng-attr directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<input data-ng-attr=\"'required', required\">")
                .sync({ required: true })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.hasAttribute("required")).toBe(true);
            })
                .sync({ required: false })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.hasAttribute("required")).toBe(false);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgAttrSpec;
