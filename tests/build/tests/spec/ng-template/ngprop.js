"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgPropSpec() {
    describe("ng-prop directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<button data-ng-prop=\"'disabled', isDisabled\"></button>")
                .sync({ isDisabled: true })
                .pipe(function (el) {
                var btn = el.querySelector("button");
                expect(btn.disabled).toBe(true);
            })
                .sync({ isDisabled: false })
                .pipe(function (el) {
                var btn = el.querySelector("button");
                expect(btn.disabled).toBe(false);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgPropSpec;
