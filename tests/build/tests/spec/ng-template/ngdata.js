"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgDataSpec() {
    describe("ng-data directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the expression", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<button data-ng-data=\"'someKey', value\"></button>")
                .sync({ value: "foo" })
                .pipe(function (el) {
                var btn = el.querySelector("button");
                expect(btn.dataset["someKey"]).toBe("foo");
            })
                .sync({ value: "bar" })
                .pipe(function (el) {
                var btn = el.querySelector("button");
                expect(btn.dataset["someKey"]).toBe("bar");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgDataSpec;
