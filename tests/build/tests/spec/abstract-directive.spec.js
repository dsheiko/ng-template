"use strict";
var abstract_directive_1 = require("../../src/ng-template/abstract-directive");
function AbstractDirectiveSpec() {
    describe("NgTemplate.abstract-directive", function () {
        describe("#getDataKey", function () {
            it("parses `foo-bar-baz`", function () {
                var res = abstract_directive_1.AbstractDirective.prototype.getDataKey("foo-bar-baz");
                expect(res).toBe("fooBarBaz");
            });
        });
        describe("#getSelector", function () {
            it("parses `foo-bar-baz`", function () {
                var res = abstract_directive_1.AbstractDirective.prototype.getSelector("foo-bar-baz");
                expect(res).toBe("[data-foo-bar-baz]");
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractDirectiveSpec;
