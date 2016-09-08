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
        it("processes repeating directives", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<span\n            data-ng-data=\"'lang', 'en'\"\n            data-ng-data-0=\"'title', 'title'\"\n            data-ng-data-8=\"'dir', 'auto'\"></span>")
                .sync({})
                .pipe(function (el) {
                var target = el.firstChild;
                expect(target.dataset["lang"]).toBe("en");
                expect(target.dataset["title"]).toBe("title");
                expect(target.dataset["dir"]).toBe("auto");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgDataSpec;
