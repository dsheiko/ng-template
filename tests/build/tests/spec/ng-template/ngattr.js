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
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-attr=\"'lang', 'en'\"\n            data-ng-attr-0=\"'title', 'title'\"\n            data-ng-attr-8=\"'dir', 'auto'\"></span>")
                .sync({})
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.lang).toBe("en");
                expect(target.title).toBe("title");
                expect(target.dir).toBe("auto");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgAttrSpec;
