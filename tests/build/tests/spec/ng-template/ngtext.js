"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgElSpec() {
    describe("ng-text directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                .sync({ foo: "New value" });
            expect(this.el.innerHTML).not.toMatch("Pristine");
            expect(this.el.innerHTML).toMatch("New value");
        });
        it("escapes output", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                .sync({ foo: "<button>" });
            expect(this.el.innerHTML).not.toMatch("<button>");
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgElSpec;
