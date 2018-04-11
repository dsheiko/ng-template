"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgValueSpec() {
    describe("ng-value directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<input data-ng-value=\"foo\"/>")
                .sync({ foo: "New value" })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.value).toBe("New value");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgValueSpec;
