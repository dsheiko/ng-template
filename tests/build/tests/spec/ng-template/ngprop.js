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
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-prop=\"'lang', 'en'\"\n            data-ng-prop-0=\"'title', 'title'\"\n            data-ng-prop-8=\"'dir', 'auto'\"></span>")
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
exports.default = NgPropSpec;
