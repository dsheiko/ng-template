"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgElSpec() {
    describe("ng-el directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates expression on element (string literal)", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>")
                .sync({})
                .pipe(function (el, reporter) {
                expect(el.innerHTML).not.toMatch("Pristine");
                expect(el.innerHTML).toMatch("New value");
            });
        });
        it("evaluates expression on element (tpl variable)", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-el=\"this.innerHTML=text\">Pristine</span>")
                .sync({ text: "New value" })
                .pipe(function () {
                expect(this.el.innerHTML).not.toMatch("Pristine");
                expect(this.el.innerHTML).toMatch("New value");
            }, this)
                .sync({ text: "Changed value" });
            expect(this.el.innerHTML).toMatch("Changed value");
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgElSpec;
