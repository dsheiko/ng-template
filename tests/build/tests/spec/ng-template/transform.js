"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function TransformSpec() {
    describe("transformers", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<div data-ng-text='transform(raw)'></div>")
                .sync({
                raw: 100,
                transform: function (num) {
                    return num + "500";
                }
            })
                .pipe(function (el) {
                expect(el.innerHTML).toBe("<div>100500</div>");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TransformSpec;
