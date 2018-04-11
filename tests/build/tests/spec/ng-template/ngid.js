"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgIdSpec() {
    describe("ng-id directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-id=\"foo\"/>")
                .sync({ foo: "bar" })
                .pipe(function (el) {
                var span = el.querySelector("#bar");
                expect(span).toBeTruthy();
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgIdSpec;
